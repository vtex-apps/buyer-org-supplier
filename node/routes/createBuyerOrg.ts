import parse from 'co-body'

import type { BuyerOrgRaw } from '../typings/buyerOrgService'
import type { Profile } from '../typings/profileSystem'

export async function createBuyerOrg(ctx: Context, next: () => Promise<void>) {
  const { clients, req } = ctx

  try {
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

    const currentProfile = await clients.profileSystem.getProfileInfo({
      email: body.organizationEmail,
      userId: body.organizationEmail,
    })

    if ((currentProfile as Profile).createdIn) {
      ctx.status = 401
      ctx.body = {
        message: 'Buyer Organization already exists',
      }

      return next()
    }

    const addresses = { Default: address }

    await clients.profileSystem.createProfile(profile)

    await clients.profileSystem.updateAddress(profile, addresses)

    ctx.status = 200
    ctx.body = {
      message: 'Buyer Organization created',
    }

    await next()
  } catch (error) {
    ctx.status = 500
    ctx.body = {
      message: error,
    }

    await next()
  }
}
