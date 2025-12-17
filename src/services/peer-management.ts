import { ResourceNotFoundError } from "../errors";
import { Peer } from "../peers/_dao";
import { PeerRepository } from "../peers/_repository";

class PeerManagementService {

    private peerRepo: PeerRepository

    constructor () {
        this.peerRepo = new PeerRepository()
    }

    async getAllPeers(offset: number = 0, limit?: number): Promise<Peer[]> {
        return this.peerRepo.getAll(offset, limit)
    }

    async getActivePeers(
        offset: number = 0, 
        limit?: number, 
        since: Date = new Date(Date.now() - 60 * 60 * 24 * 1000)
    ): Promise<Peer[]> {
        return (await this.peerRepo.getAll())
            .filter(peer => peer.lastSeen > since.getTime())
            .slice(offset, limit)
    }

    async getTrustedPeers(offset: number = 0, limit?: number): Promise<Peer[]> {
        return this.peerRepo.getAll(offset, limit, { isTrusted: true })
    }

    async getPeerById(peerId: string): Promise<Peer | null> {
        return this.peerRepo.get({ peerId: peerId })
    }

    async registerPeer(peer: Peer): Promise<Peer> {
        return this.peerRepo.create(peer)
    }

    async updatePeer(peerId: string, update: Partial<Peer>): Promise<Peer> {
        let peer = await this.getPeerById(peerId)
        if (!peer) throw new ResourceNotFoundError(`Peer not found`, { peerId })

        const updates = await this.peerRepo.update({ peerId: peer.peerId }, update)
        if (updates <= 0) throw new Error(
            `Failed to update peer with id ${peer.peerId}, data: ${JSON.stringify(update)}`
        )
        peer = await this.getPeerById(peerId)
        if (!peer) throw new ResourceNotFoundError(`Peer not found`, { peerId })
        
        return peer
    }

    async tooglePeerTrust(peerId: string, trusted: boolean): Promise<Peer> {
        return await this.updatePeer(peerId, { isTrusted: trusted })
    }

    async deletePeer(peerId: string): Promise<void> {
        const peer = await this.getPeerById(peerId)
        if (!peer) throw new ResourceNotFoundError(`Peer not found`, { peerId })

        const result = await this.peerRepo.delete({ peerId: peer.peerId })
        if (result <= 0) throw new Error(`Failed to delete peer with id ${peerId}`)
    }

    async pruneInactivePeers(
        lastSeenBefore: Date = new Date(Date.now() - 60 * 60 * 24 * 30 * 1000)
    ): Promise<void> {
        const peers = (await this.getAllPeers())
            .filter(peer => peer.lastSeen < lastSeenBefore.getTime() && !peer.isTrusted)

        for (const peer of peers) {
            await this.deletePeer(peer.peerId)
        }
    }

}
