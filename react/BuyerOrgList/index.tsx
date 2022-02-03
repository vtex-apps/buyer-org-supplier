import React from 'react'
import {
  createSystem,
  DataViewControls,
  PageContent,
  PageHeader,
  PageTitle,
  Search,
  useDataGridState,
  useDataViewState,
  useSearchState,
  DataGrid,
  DataView,
} from '@vtex/admin-ui'
import { useQuery } from 'react-apollo'

import BuyerOrgListToggle from './BuyerOrgListToggle'
import type { Result } from './graphql/listBOs.gql'
import QUERY from './graphql/listBOs.gql'

const [ThemeProvider] = createSystem({
  key: 'buyer-org-supplier',
})

function BuyerOrgList() {
  const view = useDataViewState()
  const search = useSearchState()
  const queryResult = useQuery<Result>(QUERY)

  const searchedItems = React.useMemo(() => {
    if (queryResult.loading || queryResult.data === undefined) return []

    const BOs = (queryResult.data as Result).buyerOrganizationsOnSupplier

    return BOs.filter((item) =>
      item.name
        .toLowerCase()
        .includes(search.debouncedValue.toLocaleLowerCase())
    )
  }, [queryResult.loading, queryResult.data, search.debouncedValue])

  const grid = useDataGridState({
    view,
    columns: [
      {
        id: 'name',
        header: () =>
          `${searchedItems.length} Organization${
            searchedItems.length === 1 ? '' : 's'
          }`,
        sortable: true,
      },
      {
        id: 'approved',
        header: 'Status',
        accessor: function DataGridToggle(item) {
          return <BuyerOrgListToggle id={item.id} checked={item.approved} />
        },
        width: '150px',
      },
    ],
    items: searchedItems,
    length: 10,
  })

  return (
    <ThemeProvider>
      <PageHeader>
        <PageTitle>Organizations</PageTitle>
      </PageHeader>
      <PageContent>
        <DataView state={view}>
          <DataViewControls>
            <Search id="search" placeholder="Search" state={search} />
          </DataViewControls>
          <DataGrid state={grid} />
        </DataView>
      </PageContent>
    </ThemeProvider>
  )
}

export default BuyerOrgList
