import parse from 'co-body'

import type { BuyerOrgRaw } from '../typings/buyerOrgService'
import type { Profile } from '../typings/profileSystem'
import { CLSchema } from "../clients/clClient";
import { ProfileCreationResponse } from "../clients/profileSystem";

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

    var profileData = await clients.profileSystem.createProfile(profile)
    var clData = await clients.clClient.getCLData((profileData as ProfileCreationResponse).profileId)

    await clients.profileSystem.updateAddress(profile, addresses)

    ctx.status = 200
    ctx.body = {
      message: 'Buyer Organization created',
      id: (clData as CLSchema).id
    }

    return next()
  } catch (error) {
    console.log('an error occurred when creating the BO in the profile', req)
    ctx.status = 500
    ctx.body = {
      message: error,
    }

    await next()
  }
}
