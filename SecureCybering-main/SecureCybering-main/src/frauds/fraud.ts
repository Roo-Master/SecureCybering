type FraudReason = 'failed-payments' | 'fake-payments' | 'laundering'

type Fraud = {
    claimId: string
    peerId: string
    clientEmail: string
    reason: FraudReason
    amount: number
}

export type { FraudReason, Fraud }