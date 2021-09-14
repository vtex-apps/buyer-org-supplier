import parse from 'co-body'

import type { BuyerOrgRaw } from '../typings/buyerOrgService'

export async function createBuyerOrg(ctx: Context, next: () => Promise<void>) {
  const { clients, req } = ctx

  const body: BuyerOrgRaw = await parse.json(req)

  const { address, company, sponsor } = body

  const profile = {
    email: sponsor.email,
    firstName: company.companyName,
    approved: false,
    isCorporate: true,
    address,
  }

  await clients.profileSystem.createProfile(profile)

  ctx.status = 200

  await next()
}
