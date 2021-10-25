import type { InstanceOptions, IOContext, RequestConfig } from '@vtex/api'
import { JanusClient } from '@vtex/api'
import type { AxiosError } from 'axios'

import { statusToError } from '../utils/statusCodeUtils'
import type { CurrentProfile, Profile } from '../typings/profileSystem'

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

  private getUserIdentification = (user: CurrentProfile) =>
    user.userId ?? encodeURIComponent(user.email)

  public getProfileInfo = (user: CurrentProfile, customFields?: string) =>
    this.get<Profile>(
      `${this.baseUrl}/${this.getUserIdentification(user)}/personalData`,
      {
        metric: 'profile-system-getProfileInfo',
        params: {
          extraFields: customFields,
        },
      }
    )

  public createProfile = (profile: any) =>
    this.post(
      this.baseUrl,
      { personalData: profile },
      {
        metric: 'profile-system-createProfile',
      }
    )

  public updateAddress = (user: Profile, addressesData: any) =>
    this.post(
      `${this.baseUrl}/${this.getUserIdentification(user)}/addresses`,
      addressesData,
      {
        metric: 'profile-system-updateAddress',
      }
    )

  protected post = <T>(url: string, data?: unknown, config?: RequestConfig) =>
    this.http.post<T>(url, data, config).catch<AxiosError>(statusToError)

  protected get = <T>(url: string, config?: RequestConfig) =>
    this.http.get<T>(url, config).catch<AxiosError>(statusToError)

  private baseUrl = '/api/profile-system/pvt/profiles'
}
