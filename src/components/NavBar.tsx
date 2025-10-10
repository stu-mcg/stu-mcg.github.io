import './NavBar.css'
import { Link } from "react-router-dom"
function NavBar() {
  return (
    <div className='nav-bar'>
      <Link to='/'>
        home
      </Link>
      <Link to='https://github.com/stu-mcg'>
        github
      </Link>
      <Link to='https://www.youtube.com/@StuMcGorman'>
        youtube
      </Link>
    </div>
  )
}

export default NavBar
