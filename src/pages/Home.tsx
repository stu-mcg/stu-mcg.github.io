import './main.css'
import './Home.css'
import { Link } from "react-router-dom"
import { useEffect, useRef, useState } from 'react'
import { fetchVideosFromYoutube } from '../utils/YoutubeFetch'
import stuImage from '../assets/img/stu/stu1.jpeg'
function Home() {
  const introRef = useRef<HTMLDivElement>(null)
  const videosRef = useRef<HTMLDivElement>(null)
  const workRef = useRef<HTMLDivElement>(null)
  const [navOpacity, setNavOpacity] = useState<number>(0)
  const [youtubeVideos, setYoutubeVideos] = useState<{id: string, title: string, description: string}[]>([])

  useEffect(() => {
        const onScroll = () => setNavOpacity((window.scrollY - (window.innerHeight * 0.8)) / (window.innerHeight * 0.05));
        onScroll()
        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

  useEffect(() => {
    fetchVideosFromYoutube().then((videos => setYoutubeVideos(videos)))
  }, [])

  return (
    <>
      <div className='nav-bar' style={{opacity: navOpacity}}>
        <a onClick={() => introRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>Stu</a>
        <a onClick={() => videosRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>Videos</a>
        <a onClick={() => workRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>Work</a>
      </div>
      <div className='intro-body' ref={introRef}>
        <div>
          <h1>Stu</h1>
          <a onClick={() => videosRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>Videos</a>
          <a onClick={() => workRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>Work</a>
          <Link to='https://github.com/stu-mcg'>Github</Link>
          <Link to='https://www.instagram.com/stuuuuuuuuuuuuuuuuuu/'>Instagram</Link>
          <Link to='https://www.strava.com/athletes/31157300'>Strava</Link>
          <Link to='https://www.goodreads.com/user/show/175048758-stu'>Goodreads</Link>
        </div>
        <div>
          <img className='intro-img' src={stuImage} alt="" />
        </div>
      </div>
      <div className='videos-body' ref={videosRef}>
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
                title='video'
              />
              <p>{video.description}</p>
            </div>)
          })}
        </div>
      </div>
      <div className='work-body' ref={workRef}>
        <h1>Work</h1>
        <p>
          I am a software developer interested in geospatial technology. I am experienced working in remote sensing and in creating map based user facing applications.
        </p>
        {/* <iframe width={800} height={400} src="https://emissions.ok.ubc.ca/hexDistances"></iframe> */}
      </div>
    </>
  )
}

export default Home
