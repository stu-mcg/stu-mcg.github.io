import './NavBar.css'
import { Link } from "react-router-dom"

function NavBar() {
  return (
    <div className='nav-bar'>
      <Link to='/'>Stu</Link>
      <Link to='/videos'>Videos</Link>
      <Link to='/work'>Work</Link>
    </div>
  )
}

export default NavBar