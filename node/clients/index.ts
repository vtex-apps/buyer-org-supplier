import { IOClients } from '@vtex/api'

import { BuyerOrgClient } from './buyerOrgClient'
import { ProfileSystemClient } from './profileSystem'

export class Clients extends IOClients {
  public get buyerOrg() {
    return this.getOrSet('buyerOrg', BuyerOrgClient)
  }
  public get profileSystem() {
    return this.getOrSet('profileSystem', ProfileSystemClient)
  }
}
