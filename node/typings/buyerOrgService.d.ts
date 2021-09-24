type BuyerOrgAddress = {
  id: string
  country: string
  zipCode: string
  state: string
  city: string
  neighborhood: string
  street: string
  streetNumber: string
  complement?: string
  roomFloorUnit?: string
  createdAt: Date
  updatedAt: Date
}

type BuyerOrgCompany = {
  id: string
  corporateDocument: string
  companyName: string
  tradeName: string
  stateRegistration?: string
}

export type BuyerOrgRaw = {
  id: string
  tenantName: string
  createdAt: Date
  updatedAt: Date
  organizationEmail: string
  address: BuyerOrgAddress
  company: BuyerOrgCompany
}
