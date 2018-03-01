/**
 * @providesModule Player
 * @flow
 */

import * as React from 'react'
import styled, { keyframes } from 'styled-components'

import GenreMenu from './GenreMenu'
import WeeklyView from './WeeklyView'

const Container = styled.div`
  width: 100%;
  display: flex;
  color: black;
  font-family: 'Lato';
`

class Schedule extends React.Component<{}> {
  constructor (props: {}) {
    super(props)
  }

  render () {
    return (
      <Container>
        <GenreMenu />
        <WeeklyView />
      </Container>
    )
  }
}
export default Schedule
