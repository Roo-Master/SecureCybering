import { DataTypes, Model } from "sequelize"
import sequelize from "../database"

type RawSetting = {
    id: string,
    name: string | null,
    value: string
}

class SettingDAO extends Model<RawSetting, RawSetting> {
    declare id: string
    declare name: string | null
    declare value: string
}

SettingDAO.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: sequelize,
    tableName: "settings",
    modelName: 'Setting',
    timestamps: false
})

SettingDAO.sync()

export type { RawSetting }
export { SettingDAO }
