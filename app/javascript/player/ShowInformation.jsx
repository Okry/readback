/**
 * @providesModule ShowInformation
 * @flow
 */

import * as React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  text-align: right;
`

const ShowInformation = () => {
  return (
    <Container>
      Live streaming right now!
      <br />
      Check it out!
    </Container>
  )
}
export default ShowInformation
