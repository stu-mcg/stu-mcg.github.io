import './Music.css'
import { useEffect, useRef, useState } from "react"
import { convertXML } from "simple-xml-to-json"
import NavBar from "../components/NavBar"

// import md5 from "md5"

interface Song {
  id: string
  title: string
}

interface Album {
  id: string
  title: string
  artist: string
  coverArtId: string
  songs: Song[]
}

const decodeHtml = (str: string) =>
  new DOMParser()
    .parseFromString(str, "text/html")
    .documentElement.textContent ?? ""

const fetchNavidrome = (endpoint: string, params?: object) => {
    return fetch(buildNavidromUrl(endpoint, params))
      .then(resp => resp.text())
      .then(text => convertXML(text)['subsonic-response'])
  }

  const buildNavidromUrl = (endpoint: string, params?: object): string => {
    return `https://music.stuu.ca/rest/${endpoint}?${new URLSearchParams({
      u: 'guest',
      p: 'stu',
      v: '1.1.0',
      c: 'stuu.ca',
      ...params ?? {}
    })}`
  }

function Music() {
  const [getNewAlbumsFlag, setGetNewAlbumsFlag] = useState<boolean>(false)
  const [randomAlbumIds, setRandomAlbumIds] = useState<string[]>([])
  const [currentAlbum, setCurrentAlbum] = useState<Album | null>(null)
  const [currentSongIndex, setCurrentSongIndex] = useState<number | null>(null)
  const [streamUrl, setStreamUrl] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    setGetNewAlbumsFlag(true)
  }, [])

  useEffect(() => {
    const getRandomAlbumIds = async () => {
      const albumIds = (
        await fetchNavidrome('getAlbumList', {type: 'random', size: '50'})
      ).children[0].albumList.children.map((child: {album: {id: string}}) => child.album.id)
      console.log(albumIds)
      setRandomAlbumIds(albumIds)
    }
    if(!getNewAlbumsFlag) return
    setGetNewAlbumsFlag(false)
    getRandomAlbumIds()
  }, [getNewAlbumsFlag])

  useEffect(() => {
    const getAlbum = async (id: string) => {
      const albumResp = (await fetchNavidrome('getAlbum', {id}))
      const album = albumResp.children[0].album
      setCurrentAlbum({
        id: album.id,
        title: decodeHtml(album.name),
        artist: decodeHtml(album.artist),
        coverArtId: album.coverArt,
        songs: album.children.filter((child: object) => {
          return Object.keys(child).includes('song')
        }).map((child: {song: {id: string, title: string}}) => {
          const song = child.song
          return {id: song.id, title: decodeHtml(song.title)}}
        )
      })
    }
    if(!currentAlbum){
      const newAlbumId = randomAlbumIds.pop()
      if(newAlbumId == null) {
        setCurrentAlbum(null)
        setGetNewAlbumsFlag(true)
        return
      }
      getAlbum(newAlbumId)
    }
  }, [currentAlbum, randomAlbumIds])

  useEffect(() => {
    if(!currentAlbum) return
    setCurrentSongIndex(0)
  }, [currentAlbum])

  useEffect(() => {
    if(currentSongIndex == null) return
    if(!currentAlbum) return
    console.log(currentAlbum.songs[currentSongIndex])
    setStreamUrl(buildNavidromUrl('stream', {id: currentAlbum.songs[currentSongIndex]?.id}))
  }, [currentAlbum, currentSongIndex, setStreamUrl])

  useEffect(() => {
    audioRef.current?.play()
  }, [streamUrl])

  const newAlbum = () => {
    setCurrentAlbum(null)
  }

  const nextSong = () => {
    if(!currentAlbum) return
    if(!currentSongIndex) return
    if(currentSongIndex + 1 >= currentAlbum?.songs.length){
      setCurrentAlbum(null)
      return
    }
    setCurrentSongIndex(currentSongIndex + 1)
  }

  return <>
    <NavBar />
    <div>
      <div className='section-body music-body'>
        <div className='music-columns'>
          <div className="music-left">
            <img src={buildNavidromUrl('getCoverArt', {id: currentAlbum?.coverArtId, size: 300})}/>
            <h1>{currentAlbum?.title}</h1>
            <h3>{currentAlbum?.artist}</h3>
            <audio controls ref={audioRef} src={streamUrl ?? ''} onEnded={nextSong}/>
          </div>
          <div className="music-right">
            {currentAlbum?.songs.map((song, index) => {
              const currentSong = song.id == currentAlbum.songs[currentSongIndex ?? -1]?.id
              if(currentSong) return  <p key={song.id}>▶︎{song.title}</p>
              return <p key={song.id}><a onClick={() => setCurrentSongIndex(index)}>{song.title}</a></p>
            })}
          </div>
        </div>
        <div className='music-bottom'>
          <p>This page streams random albums from my <a href='https://www.navidrome.org'>navidrom</a> server. If you'd like access to the my full library just ask me. At some point I might try streaming a live radio show here and/or set up curated playlists</p>
          <a onClick={newAlbum}><h1>get a new album</h1></a>
        </div>
      </div>
    </div>
  </>
}

export default Music