import type { InstanceOptions, IOContext, RequestConfig } from '@vtex/api'
import { JanusClient } from '@vtex/api'
import type { AxiosError } from 'axios'

import { statusToError } from '../utils/statusCodeUtils'
import type { Profile } from '../typings/profileSystem'

const FIVE_SECONDS_MS = 5 * 1000

export class ProfileSystemClient extends JanusClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, {
      ...options,
      headers: {
        ...(options && options.headers),
        VtexIdClientAutCookie: context.authToken,
      },
      timeout: FIVE_SECONDS_MS,
    })
  }

  public createProfile = (profile: Profile) =>
    this.post(this.baseUrl, { personalData: profile })

  protected post = <T>(url: string, data?: unknown, config?: RequestConfig) =>
    this.http.post<T>(url, data, config).catch<AxiosError>(statusToError)

  private baseUrl = '/api/profile-system/pvt/profiles'
}
