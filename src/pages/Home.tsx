import './Home.css'
import { Link } from "react-router-dom"
import stuImage from '../assets/img/stu/stu1.jpeg'
function Home() {
  return (
    <div className='home'>
      <div className='intro-body'>
        <div>
          <h1>Stu</h1>
          <Link to='/videos'>Videos</Link>
          <Link to='/work'>Work</Link>
          <Link to='https://github.com/stu-mcg' rel="me">Github</Link>
          <Link to='https://www.instagram.com/stuuuuuuuuuuuuuuuuuu/'>Instagram</Link>
          <Link to='https://www.strava.com/athletes/31157300'>Strava</Link>
          <Link to='https://www.goodreads.com/user/show/175048758-stu'>Goodreads</Link>
          <Link to='mailto:stumcgorman@proton.me'>stumcgorman@gmail.com</Link>
        </div>
        <div>
          <img className='intro-img' src={stuImage} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Home
