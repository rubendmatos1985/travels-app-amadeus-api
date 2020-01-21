import * as React from 'react'
import { Typography } from '@material-ui/core'

interface TestProps {}

function Test(props: TestProps) {
  console.log('TEST RENDEEEEER!!!')

  return (
    <React.Fragment>
      <Typography>Test page</Typography>
    </React.Fragment>
  )
}

export default Test
