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

import BuyerOrgListToggle from './BuyerOrgListToggle'

const [ThemeProvider] = createSystem({
  key: 'buyer-org-supplier',
})

const dummyBOs: Array<{
  id: string
  name: string
  approved: boolean
}> = [
  {
    id: 'CL-461dde1b-2dbd-4ddb-8eba-f33a4f2b000b',
    name: 'RoyalCup John',
    approved: true,
  },
  {
    id: 'CL-f5767052-b6b1-4652-87fc-7ccccfe53d71',
    name: 'RoyalCup Chris',
    approved: false,
  },
  {
    id: 'CL-aea191a3-e63f-48c6-87f3-cf63044d15c7',
    name: 'RoyalCup Steven',
    approved: false,
  },
]

function BuyerOrgList() {
  const view = useDataViewState()
  const search = useSearchState()

  const searchedItems = React.useMemo(() => {
    return dummyBOs.filter((item) =>
      item.name
        .toLowerCase()
        .includes(search.debouncedValue.toLocaleLowerCase())
    )
  }, [search])

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
