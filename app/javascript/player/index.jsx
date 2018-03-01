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
import SineWave from './SineWave'

import type { Song } from 'models'

const WCBN_HD_STREAM_URL = 'http://floyd.wcbn.org:8000/wcbn-hd.mp3'

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
      <Container>
        <PlayPauseButton playing={playing} onClick={this.handlePlayPause} />
        <ReactCardFlip isFlipped={playing}>
          <ShowInformation key="front" />
          <SongInformation key="back" song={song} />
        </ReactCardFlip>
        <SineWave playing={playing} />
      </Container>
    )
  }

  handlePlayPause = () => (this.state.playing ? this._pause() : this._play())

  _play = () =>
    this.setState({ playing: true }, () => {
      this.audioElement.src = WCBN_HD_STREAM_URL
      this.audioElement.id = 'stream'
      if (document.body != null) {
        document.body.appendChild(this.audioElement)
      }
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
