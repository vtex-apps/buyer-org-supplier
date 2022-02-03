import type { BuyerOrganization } from 'vtex.buyer-org-supplier'

function buyerOrganizationsOnSupplier(
  _: unknown,
  __: null,
  ___: Context
): BuyerOrganization[] {
  return [
    {
      id: 'CL-461dde1b-2dbd-4ddb-8eba-f33a4f2b000b',
      name: 'RoyalCup John',
      approved: true,
    },
    {
      id: 'CL-aea191a3-e63f-48c6-87f3-cf63044d15c7',
      name: 'RoyalCup Steven',
      approved: false,
    },
    {
      id: 'CL-f5767052-b6b1-4652-87fc-7ccccfe53d71',
      name: 'RoyalCup Chris',
      approved: false,
    },
  ]
}

function updateBuyerOrganizationContract(
  _: unknown,
  { input }: { input: { id: string; approved: boolean } },
  __: Context
) {
  return input
}

export const resolvers = {
  Query: {
    buyerOrganizationsOnSupplier,
  },
  Mutation: {
    updateBuyerOrganizationContract,
  },
}
