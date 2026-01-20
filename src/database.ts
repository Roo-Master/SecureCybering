import { Sequelize } from "sequelize"

const DB = {
    host: process.env.DB_HOST!,
    database: process.env.DB_NAME!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
}

const sequelize = new Sequelize(DB.database, DB.user, DB.password, {
    host: DB.host,
    dialect: 'mysql',
    logging: false
})

export default sequelize
