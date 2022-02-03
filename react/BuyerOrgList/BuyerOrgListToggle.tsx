import React, { useEffect, useState } from 'react'
import { Toggle, useCheckboxState, Text, Box, Spinner } from '@vtex/admin-ui'

function BuyerOrgListToggle(props: { id: string; checked: boolean }) {
  const checkboxState = useCheckboxState({ state: props.checked })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(`updating ${props.id} to ${checkboxState.state}`)
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      // eslint-disable-next-line no-console
      console.log(`updated ${props.id} to ${checkboxState.state}`)
    }, 1000)
  }, [checkboxState.state, props.id])

  return (
    <Box
      csx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Toggle state={checkboxState} disabled={loading} />

      {loading ? (
        <Spinner size={25} csx={{ paddingLeft: '1' }} />
      ) : (
        <Text variant="detail" csx={{ paddingLeft: '1' }}>
          {checkboxState.state ? 'Approved' : 'Unapproved'}
        </Text>
      )}
    </Box>
  )
}

export default BuyerOrgListToggle
