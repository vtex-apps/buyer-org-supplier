import React, { useEffect } from 'react'
// import { Label, Toggle, useCheckboxState, Text } from '@vtex/admin-ui'
import { Toggle, useCheckboxState, Text, Box } from '@vtex/admin-ui'

function BuyerOrgListToggle(props: { id: string; checked: boolean }) {
  const checkboxState = useCheckboxState({ state: props.checked })

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(`updated ${props.id} to ${checkboxState.state}`)
  }, [checkboxState, props.id])

  return (
    <Box
      csx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Toggle state={checkboxState} />
      <Text variant="detail" csx={{ paddingLeft: '1' }}>
        {checkboxState.state ? 'Approved' : 'Unapproved'}
      </Text>
    </Box>
  )
}

export default BuyerOrgListToggle
