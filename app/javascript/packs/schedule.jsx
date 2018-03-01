/**
 * @flow
 */

import * as React from 'react'
import { render } from 'react-dom'

import { ThemeProvider } from 'styled-components'
import theme from 'styled/theme'

import Schedule from 'schedule'

const container = document.getElementById('schedule-app')
if (container) {
  render(
    <ThemeProvider theme={theme}>
      <Schedule />
    </ThemeProvider>,
    container
  )
}
