import './main.css'
import './Home.css'
import { Link } from "react-router-dom"
import { useEffect, useRef, useState } from 'react'
import { fetchVideosFromYoutube } from '../utils/YoutubeFetch'
import stuImage from '../assets/img/stu/stu1.jpeg'
import geoportalImage from '../assets/img/work/geoportal.png'
import omgImage from '../assets/img/work/omg.png'
import edaImage from '../assets/img/work/eda.png'
function Home() {
  const introRef = useRef<HTMLDivElement>(null)
  const videosRef = useRef<HTMLDivElement>(null)
  const workRef = useRef<HTMLDivElement>(null)
  // const funRef = useRef<HTMLDivElement>(null)
  // const photosRef = useRef<HTMLDivElement>(null)
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
    fetchVideosFromYoutube().then(videos => {
      setYoutubeVideos(videos)
    })
  }, [])

  return (
    <>
      <div className='nav-bar' style={{opacity: navOpacity}}>
        <a onClick={() => introRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>Stu</a>
        <a onClick={() => videosRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>Videos</a>
        <a onClick={() => workRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>Work</a>
        {/* <a onClick={() => funRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>Fun</a>
        <a onClick={() => photosRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>Photos</a> */}
      </div>
      <div className='intro-body' ref={introRef}>
        <div>
          <h1>Stu</h1>
          <a onClick={() => videosRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>Videos</a>
          <a onClick={() => workRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>Work</a>
          {/* <a onClick={() => workRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>Fun</a>
          <a onClick={() => workRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>Photos</a> */}
          <Link to='https://github.com/stu-mcg'>Github</Link>
          <Link to='https://www.instagram.com/stuuuuuuuuuuuuuuuuuu/'>Instagram</Link>
          <Link to='https://www.strava.com/athletes/31157300'>Strava</Link>
          <Link to='https://www.goodreads.com/user/show/175048758-stu'>Goodreads</Link>
        </div>
        <div>
          <img className='intro-img' src={stuImage} alt="" />
        </div>
      </div>
      <div className='section-body videos-body' ref={videosRef}>
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
        </div>
      </div>
      <div className='section-body' ref={workRef}>
        <h1>Work</h1>
        <p>
          I am a software developer interested in geospatial technology. Recently I have been working primarly as a full stack web developer focusing on
          projects related to interactive mapping and geovisualization. I also have experience working in remote sensing
        </p>
        <div className='work-list'>
          <div>
            <h3>CliMR Geoportal</h3>
            <img src={geoportalImage}/>
            <p>
              I have developed a set of climate and transportation related geospatial visualizations for the CliMR Geoportal in collaboration with several
              research teams at UBC. A live demo of some of the visualizations is available 
              <a href="https://emissions.ok.ubc.ca/"> here </a>
              and a set of slides about the project which
              I presented at the International Cartographic Conference are available 
              <a href="https://docs.google.com/file/d/1tgKowGaL6xD99v-HvKrptNypxYmNrcgZ/"> here </a>
              .
            </p>
          </div>
          <div>
            <h3>OMG REACT</h3>
            <img src={omgImage}/>
            <p>
              I developed an application called REACT (Recording Experiences of Aquatic Concern with Technology) for the Otipemiswwak Metis Govenment 
              (Metis Nation of Alberta). The app allows users to report and view aquatic concerns such as poaching, invasive species, and Algae blooms.
              The app is currently live but only available for the use of members of the nation.
            </p>
          </div>
          <div>
            <h3>EarthDaily Analyitics</h3>
            <img src={edaImage}/>
            <p>
              I completed an 8 month co-op term at EarthDaily Analytics where I worked on various projects including developing an algorithm to detect
              radio frequency interference in RADAR satellite imagery, and contributing towards the calibration and validation system of EDA's own
              thermal band satellite sensors.
            </p>
          </div>
        </div>
      </div>
      {/* <div className='section-body' ref={funRef}>
        <h1>Fun</h1>
        <p>
          Some projects I've worked on
        </p>
      </div>
      <div className='section-body' ref={photosRef}>
        <h1>Work</h1>
        <p>
          Some photos I've taken
        </p>
      </div> */}
    </>
  )
}

export default Home
