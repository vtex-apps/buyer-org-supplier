import { IOClients } from '@vtex/api'

import { ProfileSystemClient } from './profileSystem'

export class Clients extends IOClients {
  public get profileSystem() {
    return this.getOrSet('profileSystem', ProfileSystemClient)
  }
}
