import { Settings } from "../settings"
import { PeerRepository } from "./_repository"
import { PeerSettings } from "./_settings"
import type { Peer } from "./peer"

class PeerService extends PeerRepository {

    async getAtivePeers(seenBefore?: Date, offset: number = 0, limit?: number): Promise<Peer[]> {
        seenBefore = seenBefore 
            || new Date(Date.now() - await Settings.get(PeerSettings.inactiveWindow))
        return await this.findAll({
            lastSeen: { gt: seenBefore }
        }, offset, limit)
    }

    async getTruestedPeers(offset: number = 0, limit?: number): Promise<Peer[]> {
        return await this.findAll({ isTrusted: true }, offset, limit)
    }

    async addPeer(peer: Peer): Promise<Peer> {
        return await this.create(peer)
    }

}

const service = new PeerService()

export { service as PeerService }