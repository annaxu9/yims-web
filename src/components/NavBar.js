// NavBar.js
import { Link } from 'react-router-dom';
import fonts from '../assets/fonts/fonts.css';
import star from '../assets/icons/star.png';
import calendar from '../assets/icons/calendar.png';
import users from '../assets/icons/users.png';
import bracket from '../assets/icons/bracket.png';
import refFlag from '../assets/icons/ref-flag.png';
import user from '../assets/icons/user.png';


function NavBar({ role }) {
  const renderLinks = () => {
    switch (role) {
      case 'admin':
        return (
          <>
            <li>
              <Link to="/scores" className='flex items-center'>
                Scores
                <img src={star} alt="" className="w-5 h-5 ml-2"/>
              </Link>
            </li>
            <li>
              <Link to="/schedules" className='flex items-center'>
                Schedules
                <img src={calendar} alt="Lgo" className="w-5 h-5 ml-2"/>
              </Link>
            </li>
            <li>
                <Link to="/ref" className='flex items-center'>
                  Referee
                  <img src={refFlag} alt="" className="w-6 h-5 ml-2"/>
                </Link>
            </li>
            <li>
              <Link to="/admin" className='flex items-center'>
                Create Brackets
                <img src={bracket} alt="" className="w-5 h-5 ml-2"/>
              </Link>
              
            </li>
            <li>
              <Link to="/users" className='flex items-center'>
                Users
                <img src={users} alt="" className="w-6 h-5 ml-2"/>
              </Link>
            </li>
          </>
        );
      case 'player':
        return (
          <>
            <li>
              <Link to="/scores">Scores</Link>
            </li>
            <li>
              <Link to="/schedules">Schedules</Link>
            </li>
          </>
        );
      case 'ref':
        return (
          <>
            <li>
              <Link to="/scores">Scores</Link>
            </li>
            <li>
              <Link to="/schedules">Schedules</Link>
            </li>
            <li>
                <Link to="/ref">Referee</Link>
            </li>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <nav>
      <div className='flex gap-2 m-5'>
        <ul className='flex row bg-[#4267E6] text-white items-center w-full rounded-lg font-medium'>
          <li className="relative bg-[#4267E6] p-2 font-black text-4xl rounded-lg">
            <div className="absolute top-0 left-3 h-full w-full bg-gradient-to-r from-[#4267E6] to-[#4267E6] -skew-x-12"></div>
            <Link
              to="/"
              className="relative z-10 text-4xl font-bold bg-clip-text text-[#FFD65F] pl-2"
              style={{ fontFamily: 'SFSportsNight' }}
            >
              YIMS 
            </Link>
          </li>
          <li className="relative bg-[#4267E6] py-2 font-black text-4xl">
            <div className="absolute top-0 left-3 h-full w-full bg-gradient-to-r from-white to-white -skew-x-12"></div>
            <Link
              to="/"
              className="relative z-10 text-4xl font-bold bg-clip-text text-transparent text-[#F7CC4F]"
              style={{ fontFamily: 'SFSportsNight' }}
            >
              &nbsp;
            </Link>
          </li>
          <div className='flex row gap-3 ml-10 flex-grow'>
            {renderLinks()}
          </div>
          <li className='p-2'>
            <Link to="/profile"> 
            <img src={user} alt="" className="w-7 h-7 mr-2"/>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
