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
    id: '1',
    name: 'RoyalCup Arizona',
    approved: true,
  },
  {
    id: '2',
    name: 'RoyalCup 2',
    approved: false,
  },
  {
    id: '3',
    name: 'RoyalCup Rio',
    approved: true,
  },
]

function BuyerOrgList() {
  const view = useDataViewState()
  const search = useSearchState()

  const searchedItems = React.useMemo(() => {
    return dummyBOs.filter((item) =>
      item.name
        .toLowerCase()
        .startsWith(search.debouncedValue.toLocaleLowerCase())
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
