import { DataTypes, Model } from "sequelize"
import sequelize from "../database"
import type { NewUser, User, UserRole } from "./user"

type UserAttributes = User & {
    password: string
}

class UserDAO extends Model<UserAttributes, NewUser> {
    declare id: number
    declare name: string
    declare email: string
    declare role: UserRole
    declare password: string
}

UserDAO.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('admin', 'user'),
        defaultValue: 'user',
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize: sequelize,
    tableName: 'Users',
    defaultScope: {
        attributes: {
            exclude: ['password']
        }
    },
    scopes: {
        password: {
            attributes: {
                include: ['password']
            }
        }
    }
})

export type { UserRole }
export { UserDAO }
