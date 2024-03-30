// NavBar.js
import { Link } from 'react-router-dom';
import fonts from '../assets/fonts/fonts.css';

function NavBar({ role }) {
  const renderLinks = () => {
    switch (role) {
      case 'admin':
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
            <li>
              <Link to="/admin">Admin</Link>
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
      <div className='flex gap-2 m-2'>
        <ul className='flex row bg-[#2B2C2D] text-white items-center w-full rounded-lg'>
          <li className="relative bg-[#3159C4] p-2 font-black text-4xl rounded-lg">
            <div className="absolute top-0 left-3 h-full w-full bg-gradient-to-r from-[#3159C4] to-[#3159C4] -skew-x-12"></div>
            <Link
              to="/"
              className="relative z-10 text-4xl font-bold bg-clip-text text-[#FFCA28] pl-2"
              style={{ fontFamily: 'SFSportsNight' }}
            >
              YIMS 
            </Link>
          </li>
          <li className="relative bg-[#3159C4] py-2 font-black text-4xl">
            <div className="absolute top-0 left-3 h-full w-full bg-gradient-to-r from-[#254394] to-[#254394] -skew-x-12"></div>
            <Link
              to="/"
              className="relative z-10 text-4xl font-bold bg-clip-text text-transparent text-[#FFCA28]"
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
              <img src="/images/profile-icon-white.png" alt="Logo" className="w-7 h-7 mr-2"/>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
