import type { InstanceOptions, IOContext, RequestConfig } from '@vtex/api'
import { JanusClient } from '@vtex/api'
import type { AxiosError } from 'axios'

import { statusToError } from '../utils/statusCodeUtils'

const FIVE_SECONDS_MS = 5 * 1000

export type CLSchema = {
  id: string
}

export class CLClient extends JanusClient {
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

  public getCLData = (userId: string, customFields?: string) =>
    this.get<CLSchema>(
      this.baseUrl(userId),
      {
        metric: 'profile-system-getProfileInfo',
        params: {
          extraFields: customFields,
        },
      }
    )

  protected get = <T>(url: string, config?: RequestConfig) =>
    this.http.get<T>(url, config).catch<AxiosError>(statusToError)

  private baseUrl = (userId: string) => `/api/dataentities/CL/search?_fields=_all&_where=userId=${userId}`
}
