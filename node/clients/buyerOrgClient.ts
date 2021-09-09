import type {
  InstanceOptions,
  IOContext,
  RequestTracingConfig,
} from '@vtex/api'
import { ExternalClient } from '@vtex/api'

import { getRequestConfig } from '../utils/getRequestConfig'
import wrapTryCatch from '../utils/wrapTryCatch'
import type { BuyerOrgRaw } from '../typings/buyerOrgService'

const routes = {
  getBuyerOrgById: (id: string) => `/buyer-orgs/organization/${id}`,
}

export class BuyerOrgClient extends ExternalClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super('https://buyer-organizations.vtex.systems', ctx, options)
  }

  public async getBuyerOrgById(
    id: string,
    tracingConfig?: RequestTracingConfig,
  ) {
    const metric = 'buyerOrg-getBuyerOrgByCorporateDocument'

    return wrapTryCatch<BuyerOrgRaw>(
      this.http.get(
        routes.getBuyerOrgById(id),
        getRequestConfig({
          context: this.context,
          authMethod: 'STORE_TOKEN',
          metric,
          tracingConfig,
        }),
      ),
    )
  }
}
