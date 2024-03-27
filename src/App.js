import './App.css';
import { Route, Routes, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { BookList } from './pages/BookList';
import { Book } from './pages/Book';
import Leaderboard from './components/Leaderboard';
import logo from './assets/images/logo.png';
import profile from './assets/images/profile-icon-white.png';
import './assets/fonts/fonts.css';

function App() {
  return(
    <div className="w-full">
      <nav>
        <div className='flex gap-2 m-2'>
          {/* <img src={logo} alt="Logo" className="w-14 h-14"/>  */}
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
            <li>
              <Link to="/pastgames">Past Games</Link>
            </li>
            <li>
              <Link to="/upcominggames">Upcoming Games</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            </div>
            <li className='p-2'>
              <img src={profile} alt="Logo" className="w-7 h-7 mr-2"/>
            </li>
          </ul>
        </div>

      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<BookList />}/>
        <Route path="/books/:id" element={<Book />}/>
      </Routes>
      <Leaderboard />
    </div>
  );
}

export default App;

