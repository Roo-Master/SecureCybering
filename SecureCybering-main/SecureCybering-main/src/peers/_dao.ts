import { DataTypes, Model } from "sequelize"
import sequelize from "../database"
import type { Peer } from "./peer"

type PeerAttributes = Peer & {
    id: number
}

class PeerDAO extends Model<PeerAttributes, Peer> {
    declare id: number
    declare peerId: string
    declare addrs: string[]
    declare firstSeen: number
    declare lastSeen: number
    declare isTrusted: boolean
    declare reputationScore: number
}

PeerDAO.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    peerId: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    addrs: {
        type: DataTypes.JSON,
        allowNull: false
    },
    firstSeen: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    lastSeen: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    isTrusted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    reputationScore: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    sequelize: sequelize,
    tableName: 'Peers'
})

export { PeerDAO }
