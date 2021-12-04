import { IOClients } from '@vtex/api'

import { ProfileSystemClient } from './profileSystem'
import { CLClient } from "./clClient";

export class Clients extends IOClients {
  public get profileSystem() {
    return this.getOrSet('profileSystem', ProfileSystemClient)
  }

  public get clClient() {
    return this.getOrSet('clClient', CLClient)
  }
}
