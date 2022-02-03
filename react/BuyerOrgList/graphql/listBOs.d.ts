declare module '*/listBOs.gql' {
  import type { DocumentNode } from ''
  import type { BuyerOrganization as boRaw } from 'vtex.buyer-org-supplier'

  export type BuyerOrganization = Pick<boRaw, 'id' | 'name' | 'approved'>

  export interface Result {
    buyerOrganizationsOnSupplier: BuyerOrganization[]
  }

  const value: DocumentNode
  export default value
}
