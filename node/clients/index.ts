import { IOClients } from '@vtex/api'

import { BuyerOrgClient } from './buyerOrgClient'

export class Clients extends IOClients {
  public get buyerOrg() {
    return this.getOrSet('buyerOrg', BuyerOrgClient)
  }
}
