import './NavBar.css'
import { Link } from "react-router-dom"

function NavBar() {
  return (
    <div className='nav-bar'>
      <Link to='/'>Stu</Link>
      <a href='/#/videos'>Videos</a>
      <a href='/#/work'>Work</a>
      <a href='/#/music'>Music</a>
    </div>
  )
}

export default NavBar