import { Attributes, Model, ModelStatic } from "sequelize"
import { Op as SQLOp } from "sequelize"

type Op = 'eq' | 'ne' | 'gt' | 'lt' | 'gte' | 'lte' | 'in' | 'notIn';

type Filter<T> = {
    [K in keyof T]?: T[K] | { [O in Op]?: T[K] | T[K][] }
}

type Query<T> = {
    [K in keyof T]?: T[K] | { [O in Op]?: T[K] | T[K][] }
}

const operatorMap: Record<Op, symbol> = {
    eq: SQLOp.eq,
    ne: SQLOp.ne,
    gt: SQLOp.gt,
    gte: SQLOp.gte,
    lt: SQLOp.lt,
    lte: SQLOp.lte,
    in: SQLOp.in,
    notIn: SQLOp.notIn,
}

function sequelize<T>(filter?: Query<T>): any {
    if (!filter) return {}

    const result: any = {}

    for (const key in filter) {
        const value = filter[key as keyof T]

        if (
            value &&
            typeof value === 'object' &&
            !Array.isArray(value) &&
            !(value instanceof Date)
        ) {
            const opKeys = Object.keys(value) as Op[]
            const isOpObject = opKeys.some((k) => k in operatorMap)

            if (isOpObject) {
                result[key] = {}
                for (const op of opKeys) {
                    if (op in operatorMap) {
                        result[key][operatorMap[op]] = (value as any)[op]
                    }
                }
                continue
            }
        }

        result[key] = { [SQLOp.eq]: value }
    }

    return result
}


class Repository<T extends object, N extends object, DAO extends Model<T, N>> {

    protected dao: ModelStatic<DAO>

    constructor(dao: ModelStatic<DAO>) {
        this.dao = dao
    }

    async findAll(query: Query<T>, offset?: number, limit?: number): Promise<T[]>
    async findAll(offset?: number, limit?: number): Promise<T[]>
    async findAll(
        queryOrOffset?: Query<T> | number,
        offsetOrLimit?: number,
        limit?: number
    ): Promise<T[]> {
        if (typeof queryOrOffset === 'number' || queryOrOffset === undefined) {
            const offset = queryOrOffset ?? 0
            const actualLimit = offsetOrLimit
            return (await this.dao.findAll({ offset, limit: actualLimit }))
                .map(dao => dao.get({ plain: true }))
        }

        return (
            await this.dao
                .findAll({ where: sequelize(queryOrOffset), offset: offsetOrLimit ?? 0, limit })
        ).map(dao => dao.get({ plain: true }))
    }

    async find(query: Query<T>): Promise<T | null> {
        return (await this.dao.findOne({ where: sequelize(query) }))
            ?.get({ plain: true }) || null
    }

    async create(data: N): Promise<T> {
        return (await this.dao.create(data as any))
            .get({ plain: true })
    }

    async update(query: Query<T>, data: Partial<T>): Promise<number> {
        const [updated] = await this.dao.update(data, { where: sequelize(query) })
        return updated
    }

    async delete(query: Query<T>): Promise<number> {
        return await this.dao.destroy({ where: sequelize(query) })
    }

    async getHiddenProperty<K extends keyof Attributes<DAO>>(
        keys: K[],
        query?: Query<T>
    ): Promise<Pick<Attributes<DAO>, K>> {
        return (
            await this.dao
                .scope(keys as string[])
                .findOne({ where: sequelize(query), include: keys as string[] })
        )?.get({ plain: true }) as Pick<Attributes<DAO>, K>
    }

    async count(query?: Query<T>): Promise<number> {
        return await this.dao.count({ where: sequelize(query) })
    }

}

export type { Query }
export { Repository }
