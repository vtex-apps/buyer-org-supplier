import parse from 'co-body'

import type { BuyerOrgRaw } from '../typings/buyerOrgService'

export async function createBuyerOrg(ctx: Context, next: () => Promise<void>) {
  ctx.status = 200

  const { clients, req } = ctx

  const body: BuyerOrgRaw = await parse.json(req)

  const { zipCode, streetNumber } = body.address
  const { companyName, tradeName, corporateDocument } = body.company

  const address = {
    ...body.address,
    postalCode: zipCode,
    number: streetNumber,
  }

  const profile = {
    userId: body.organizationEmail,
    email: body.organizationEmail,
    firstName: tradeName,
    approved: false,
    isCorporate: true,
    corporateName: companyName,
    tradeName,
    corporateDocument,
  }

  const addresses = { Default: address }

  await clients.profileSystem.createProfile(profile)

  await clients.profileSystem.updateAddress(profile, addresses)

  ctx.status = 200
  ctx.body = ''

  await next()
}
