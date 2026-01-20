import { Repository } from "../repository"
import { FraudDAO } from "./_dao"
import type { Fraud } from "./fraud"

class FraudRepository extends Repository<Fraud, Fraud, FraudDAO> {
    constructor() { super(FraudDAO) }
}

export { FraudRepository }
