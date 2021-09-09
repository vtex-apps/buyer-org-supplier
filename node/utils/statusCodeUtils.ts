import type { AxiosError } from 'axios'
import { AuthenticationError, ForbiddenError, UserInputError } from '@vtex/api'

export function isNotSuccessCode(statusCode: number) {
  return statusCode < 200 || statusCode > 299
}

export const statusToError = (e: AxiosError) => {
  console.log(e.response?.data)
  if (!e.response) throw e

  const { response } = e as AxiosError

  if (!response?.status) throw e

  const { status } = response

  if (status === 401) throw new AuthenticationError(e)

  if (status === 403) throw new ForbiddenError(e)

  if (status === 400) throw new UserInputError(e)

  throw e
}
