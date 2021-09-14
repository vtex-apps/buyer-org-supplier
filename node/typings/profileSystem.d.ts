interface Address {
  id: string
  userId: string
  receiverName?: string
  complement?: string
  neighborhood?: string
  country?: string
  state?: string
  number?: string
  street?: string
  postalCode?: string
  city?: string
  reference?: string
  addressName?: string
  addressType?: string
  geoCoordinates?: string
}

export interface Profile {
  firstName?: string
  lastName?: string
  profilePicture?: string
  email: string
  document?: string
  userId?: string
  birthDate?: string
  gender?: string
  homePhone?: string
  businessPhone?: string
  isCorporate?: boolean
  corporateName?: string
  corporateDocument?: string
  stateRegistration?: string
  approved?: boolean
  addresses?: Address[]
  tradeName?: string
  payments?: PaymentProfile[]
  customFields?: ProfileCustomField[]
}
