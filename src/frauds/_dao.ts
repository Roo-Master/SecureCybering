import { DataTypes, Model } from "sequelize"
import sequelize from "../database"
import type { Fraud, FraudReason } from "./fraud"

type FraudAttributes = Fraud & {
    id: number
}

class FraudDAO extends Model<FraudAttributes, Fraud> {
    declare id: number
    declare peerId: string
    declare fraudId: string
    declare clientEmail: string
    declare reason: FraudReason
    declare amount: number
}

FraudDAO.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    claimId: {
        type: DataTypes.STRING,
        unique: true
    },
    peerId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    clientEmail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    reason: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    sequelize: sequelize,
    tableName: 'Frauds',
    modelName: 'Fraud',
    timestamps: false
})

export { FraudDAO }
