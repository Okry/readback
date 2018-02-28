/**
 * @providesModule Player
 * @flow
 */

import * as React from 'react'
import styled, { keyframes } from 'styled-components'
import ReactCardFlip from 'react-card-flip'

import PlayPauseButton from './PlayPauseButton'
import SongInformation from './SongInformation'
import ShowInformation from './ShowInformation'

import type { Song } from 'models'

const WCBN_HD_STREAM_URL = 'http://floyd.wcbn.org:8000/wcbn-hd.mp3'

const moving_underline = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

const SineWave = styled.span`
  position: absolute;
  height: 1px;
  bottom: 0px;
  left: 0;
  width: 100%;
  opacity: 0;
  background-color: #d34eb4;
  animation: ${p => (p.playing ? moving_underline + ' 1s ease infinite' : '')};
`

const Container = styled.div`
  width: 100%;
  position: absolute;
  display: flex;
  color: black;
  font-family: 'Lato';
`

function drupalLinks (): NodeList<HTMLAnchorElement> {
  return document.querySelectorAll(
    // Typecating this string to the literal 'a' so that our NodeList knows it’s
    // full of HTMLAnchorElements
    (('#primary-nav-links a[href^="http"], #primary-nav-links a[href^="//"]': any): 'a')
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
        <ReactCardFlip isFlipped={playing}>
          <ShowInformation key="front" />
          <SongInformation visible={playing} song={song} key="back" />
        </ReactCardFlip>
        <SineWave playing={playing} />
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
