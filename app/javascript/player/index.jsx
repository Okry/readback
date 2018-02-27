/**
 * @providesModule Player
 * @flow
 */

import * as React from 'react'
import styled, { keyframes } from 'styled-components'

import PlayPauseButton from './PlayPauseButton'
import SongInformation from './SongInformation'

import type { Song } from 'models'

const WCBN_HD_STREAM_URL = 'http://floyd.wcbn.org:8000/wcbn-hd.mp3'

const moving_underline = keyframes`
  from {
    content: "";
    width: 0px;
    opacity: 0;
  }

  to {
    width: 100%;
    opacity: 1;
  }
`

const StatusBar = styled.span`
  position: absolute;
  height: 1px;
  bottom: 0px;
  left: 0;
  background-color: #d34eb4;
  animation: ${p =>
    p.playing ? moving_underline + ' 2s ease-out infinite' : ''};
`

const Container = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  align-items: stretch;

  flex: auto;
  color: black;
  font-family: 'Lato';
`

function drupalLinks (): NodeList<HTMLAnchorElement> {
  return document.querySelectorAll(
    // Typecating this string to the literal 'a' so that our NodeList knows it’s
    // full of HTMLAnchorElements
    (('#wcbn-org-nav a[href^="http"], #wcbn-org-nav a[href^="//"]': any): 'a')
  )
}

function addTargetBlankToDrupalLinks () {
  drupalLinks().forEach(link => {
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
  })
}

function removeTargetBlankFromDrupalLinks () {
  drupalLinks().forEach(link => {
    link.target = ''
    link.rel = ''
  })
}

type Props = { song: Song }
class Player extends React.Component<Props, { playing: boolean }> {
  audioElement: HTMLAudioElement
  state = { playing: false }

  constructor (props: Props) {
    super(props)

    this.audioElement = document.createElement('audio')
  }

  componentDidMount () {
    const url = new URL(window.location)
    if (url.searchParams.has('autoplay')) {
      this._play()
    }
  }

  render () {
    const { song } = this.props
    const { playing } = this.state

    return (
      <Container playing={playing}>
        <PlayPauseButton playing={playing} onClick={this.handlePlayPause} />
        <SongInformation visible={playing} song={song} />
        <StatusBar playing={playing} />
      </Container>
    )
  }

  handlePlayPause = () => (this.state.playing ? this._pause() : this._play())

  _play = () =>
    this.setState({ playing: true }, () => {
      this.audioElement.src = WCBN_HD_STREAM_URL
      this.audioElement.play()
      addTargetBlankToDrupalLinks()
    })
  _pause = () =>
    this.setState({ playing: false }, () => {
      this.audioElement.pause()
      this.audioElement.src = ''
      removeTargetBlankFromDrupalLinks()
    })
}
export default Player
