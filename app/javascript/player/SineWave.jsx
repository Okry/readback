/**
 * @providesModule SineWave
 * @flow
 */

import * as React from 'react'
import styled from 'styled-components'

const Wave = styled.canvas`
  position: absolute;
  height: 20px;
  bottom: 0px;
  left: 0;
  width: 100%;
  opacity: 1;
  background-color: #d34eb4;
`

const audioCtx = new (window.AudioContext || window.webkitAudioContext)()

function viz () {
  // console.log('visualizing')
  // // set up forked web audio context, for multiple browsers
  // // window. is needed otherwise Safari explodes
  //
  // let source
  // let stream
  //
  // // set up the different audio nodes we will use for the app
  // const analyser = audioCtx.createAnalyser()
  // analyser.minDecibels = -90
  // analyser.maxDecibels = -10
  // analyser.smoothingTimeConstant = 0.85
  //
  // // set up canvas context for visualizer
  //
  // const canvas = document.getElementById('visualizer')
  //
  // if (canvas === null) {
  //   console.log('0')
  // }
  //
  // const canvasCtx = canvas.getContext('2d')
  //
  // const intendedWidth = '100%'
  //
  // canvas.setAttribute('width', intendedWidth)
  //
  // const visualSelect = document.getElementById('visual')
  //
  // let drawVisual
  //
  // // main block for doing the audio recording
  // stream = document.getElementById('stream')
  //
  // source = audioCtx.createMediaElementSource(stream)
  // source.connect(analyser)
  //
  // const WIDTH = canvas.width
  // const HEIGHT = canvas.height
  //
  // analyser.fftSize = 2048
  // const bufferLength = analyser.fftSize
  // console.log(bufferLength)
  // const dataArray = new Uint8Array(bufferLength)
  //
  // canvasCtx.clearRect(0, 0, WIDTH, HEIGHT)
  //
  // const draw = () => {
  //   drawVisual = requestAnimationFrame(draw)
  //
  //   analyser.getByteTimeDomainData(dataArray)
  //
  //   canvasCtx.fillStyle = 'rgb(200, 200, 200)'
  //   canvasCtx.fillRect(0, 0, WIDTH, HEIGHT)
  //
  //   canvasCtx.lineWidth = 2
  //   canvasCtx.strokeStyle = 'rgb(0, 0, 0)'
  //
  //   canvasCtx.beginPath()
  //
  //   const sliceWidth = WIDTH * 1.0 / bufferLength
  //   let x = 0
  //
  //   for (let i = 0; i < bufferLength; i++) {
  //     const v = dataArray[i] / 128.0
  //     const y = v * HEIGHT / 2
  //
  //     if (i === 0) {
  //       canvasCtx.moveTo(x, y)
  //     } else {
  //       canvasCtx.lineTo(x, y)
  //     }
  //
  //     x += sliceWidth
  //   }
  //
  //   canvasCtx.lineTo(canvas.width, canvas.height / 2)
  //   canvasCtx.stroke()
  // }
  //
  // draw()
  console.log('done?')
}

type Props = { playing: boolean }
const SineWave = ({ playing }: Props) => (
  <Wave id="visualizer" playing={playing} />
)
viz()

export default SineWave
