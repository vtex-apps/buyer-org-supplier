import jwt from 'jsonwebtoken'
import { UserInputError, NotFoundError } from '@vtex/api'

const SECRET = process.env.SECRET ?? 'SECRET'

export async function company(ctx: Context, next: () => Promise<void>) {
  const { clients, vtex } = ctx;
  const { token } = vtex.route.params

  if (!token) {
    throw new UserInputError('token required')
  }

  const payload = jwt.verify(token as string, SECRET) as { id: string}

  const { response } =   await clients.buyerOrg.getBuyerOrgById(payload.id)

  if (!response) {
    throw new NotFoundError('buyer org not found')
  }

  ctx.status = 200
  ctx.body = response
  await next()
}

