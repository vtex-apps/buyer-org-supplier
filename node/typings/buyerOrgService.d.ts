type Maybe<T> = T | null | undefined

type BuyerOrgAddress = {
  id: string
  country: string
  zipCode: string
  state: string
  city: string
  neighborhood: string
  street: string
  streetNumber: string
  complement: Maybe<string>
  roomFloorUnit: Maybe<string>
  createdAt: Date
  updatedAt: Date
}

type BuyerOrgCompany = {
  id: string
  corporateDocument: string
  companyName: string
  tradeName: string
  stateRegistration: Maybe<string>
  createdAt: Date
  updatedAt: Date
}

type BuyerOrgUser = {}

export type BuyerOrgRaw = {
  id: string
  tenantName: string
  createdAt: Date
  updatedAt: Date
  firstUser: BuyerOrgUser
  firstUserId: string
  address: Addrees
  company: BuyerOrgCompany
}
