import { FraudRepository } from "../frauds/_repository";

class FraudsService {
    private fraudRepo: FraudRepository

    constructor () {
        this.fraudRepo = new FraudRepository()
    }

    
}