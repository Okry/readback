/**
 * @providesModule SongInformation
 * @flow
 */

import * as React from 'react'
import styled from 'styled-components'
import { rgba } from 'polished'

import AlbumArt from './AlbumArt'

import type { Song } from 'models'

const Container = styled.div`
  display: flex;
  align-items: center;
`

const InfoBox = styled.div`
  flex: 1;
  max-height: 90px;
  padding: 0 15px;
  border-left: 1px solid ${p => rgba(p.theme.white, 0.4)};
  display: flex;
  align-items: flex-start;
  line-height: 23px;
`

type Props = { song: Song, visible: boolean }
const SongInformation = ({ song, visible }: Props) => {
  const { artist, name, album, label, year } = song
  return (
    <Container>
      <InfoBox>
        <AlbumArt song={song} />
        <div>
          <div>
            <strong>“{name}”</strong>
          </div>
          <div>
            <strong>{artist && `${artist}`}</strong>
          </div>
          <div>
            <span>
              <cite>{album}</cite>
              {(label || year != null) &&
                ` (${label}${label && year ? ' ' : ''}${year || ''})`}
            </span>
          </div>
        </div>
      </InfoBox>
    </Container>
  )
}
export default SongInformation
