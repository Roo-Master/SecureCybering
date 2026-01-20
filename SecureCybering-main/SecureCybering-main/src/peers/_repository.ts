import { PeerDAO } from "./_dao"
import { Repository } from "../repository"
import type { Peer } from "./peer"

class PeerRepository extends Repository<Peer, Peer, PeerDAO> {
    constructor() { super(PeerDAO) }

    async findById(peerId: string): Promise<Peer | null> {
        return await this.findById(peerId)
    }

}

export { PeerRepository }
