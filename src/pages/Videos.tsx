import './Videos.css'
import { useEffect, useState } from "react"
import { fetchVideosFromYoutube } from "../utils/YoutubeFetch"
import NavBar from "../components/NavBar"

function Videos() {
  const [youtubeVideos, setYoutubeVideos] = useState<{id: string, title: string, description: string}[]>([])

  useEffect(() => {
    fetchVideosFromYoutube().then(videos => {
      setYoutubeVideos(videos)
    })
  }, [])

  return (<>
    <NavBar/>  
    <div className='section-body videos-body'>
      <h1>Videos</h1>
      <p>I like to make videos, you can watch them here:</p>
      <div className='videos-list'>
        {youtubeVideos.map(video => {
          return(
          <div key={`youtube-${video.id}`}>
            <h3>{video.title}</h3>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.id}?rel=0`}
              allowFullScreen
              title={video.title}
            />
            <p>{video.description}</p>
          </div>)
        })}
        <div>
          <h3>Pocket Change</h3>
          <iframe
            src="https://www.newschoolers.com/videoembed/1080666"
            allowFullScreen
            title='Pocket Change'
          />
          <p>2022/23 Ski season @ UBCO</p>
        </div>
        <div>
          <h3>MACRODOSER</h3>
          <iframe
            src="https://www.newschoolers.com/videoembed/1055761"
            allowFullScreen
            title='MACRODOSER'
          />
          <p>Filmed over November reading break 2022</p>
        </div>
        <div>
          <h3>Okanagan Streets 21/22</h3>
          <iframe
            src="https://www.newschoolers.com/videoembed/1040174"
            allowFullScreen
            title='Okanagan Streets 21/22'
          />
          <p>Some clips I filmed over the 2021/22 school year</p>
        </div>
      </div>
    </div>
  </>)
}

export default Videos