import type { IOContext, RequestTracingConfig } from '@vtex/api'

type Args = {
  context: IOContext
  authMethod: AuthMethod
  metric: string
  tracingConfig?: RequestTracingConfig
}

export type AuthMethod = 'AUTH_TOKEN' | 'STORE_TOKEN' | 'ADMIN_TOKEN'

export const createTracing = (
  metric: string,
  tracingConfig?: RequestTracingConfig
) => ({
  requestSpanNameSuffix: metric,
  ...tracingConfig?.tracing,
})

export const getAuthToken = (ctx: IOContext, method: AuthMethod) => {
  switch (method) {
    case 'STORE_TOKEN':
      return ctx.storeUserAuthToken

    case 'ADMIN_TOKEN':
      return ctx.adminUserAuthToken

    case 'AUTH_TOKEN':
      return ctx.authToken

    default:
      return null
  }
}

export const getRequestConfig = ({
  context,
  authMethod,
  metric,
  tracingConfig,
}: Args) => {
  const token = getAuthToken(context, authMethod)
  const headers: Headers = token
    ? {
        VtexIdclientAutCookie: token,
      }
    : {}

  return {
    headers,
    metric,
    tracing: createTracing(metric, tracingConfig),
  }
}

export interface Headers {
  [key: string]: string
}
