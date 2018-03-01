import * as React from 'react'
import styled from 'styled-components'

const Container = styled.ul`
  list-decoration: none;
`

type State = { selected: string }
class GenreMenu extends React.component<{}> {
  render () {
    return <Container />
  }
}

export default GenreMenu
