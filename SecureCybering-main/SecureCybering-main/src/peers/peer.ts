type Peer = {
    peerId: string
    addrs: string[]
    firstSeen: Date
    lastSeen: Date
    isTrusted: boolean
    reputationScore: number 
}

export type { Peer }