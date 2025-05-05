import React, { useState, useEffect, useRef } from 'react'
import logo from '../assets/Images/logo.png'
import pfp from '../assets/Images/pfp.jpg'
import { HiDotsVertical, HiHome } from "react-icons/hi";
import { HiPlayCircle, HiStar, HiTv, HiMagnifyingGlass } from "react-icons/hi2";
import { GiNinjaHeroicStance } from "react-icons/gi";
import Headeritem from './Headeritem';
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';

function Header() {
  const [toggle, setToggle] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const searchRef = useRef(null);
  const profileRef = useRef(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleSearch = (e) => {
    if (e.key === 'Enter' && e.target.value) {
      navigate(`/search?q=${encodeURIComponent(e.target.value)}`);
      setIsSearchExpanded(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchExpanded(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const menu = [
    {
      name: 'HOME',
      icon: HiHome
    },
    {
      name: 'SEARCH',
      icon: HiMagnifyingGlass,
      onClick: () => setIsSearchExpanded(!isSearchExpanded)
    },
    {
      name: 'ANIME',
      icon: GiNinjaHeroicStance
    },
    {
      name: 'ORIGINALS',
      icon: HiStar
    },
    {
      name: 'MOVIES',
      icon: HiPlayCircle
    },
    {
      name: 'SERIES',
      icon: HiTv
    }
  ]

  return (
    <div className='fixed top-0 z-[10000] w-full bg-[#131520] flex items-center justify-between p-5'>
      <div className='flex gap-8 items-center'>
        <Link to="/">
          <img src={logo} className='w-[80px] md:w-[115px] object-cover cursor-pointer' />
        </Link>
        <div className='hidden md:flex items-center gap-8'>
          <Link to="/">
            <Headeritem name="HOME" Icon={HiHome}/>
          </Link>
          
          {menu.map((item) => item.name !== 'HOME' && (
            item.name === 'SEARCH' ? (
              <div key={item.name} className='relative flex items-center' ref={searchRef}>
                {isSearchExpanded ? (
                  <div className='flex items-center gap-2 animate-wiggle mb-2'>
                    <HiMagnifyingGlass className="text-white" />
                    <input 
                      type="text" 
                      placeholder="Search here..." 
                      className="bg-transparent border-b-2 border-white text-white w-[150px] sm:w-[200px] md:w-[300px] outline-none placeholder:text-gray-400 transition-all duration-300 ease-in-out py-0"
                      autoFocus
                      onKeyPress={handleSearch}
                    />
                  </div>
                ) : (
                  <div onClick={item.onClick}>
                    <Headeritem name={item.name} Icon={item.icon}/>
                  </div>
                )}
              </div>
            ) : (
              <div key={item.name} className={`transform transition-all duration-500 ease-in-out ${isSearchExpanded ? 'translate-x-4' : 'translate-x-0'}`}>
                {item.name === 'ANIME' ? (
                  <Link to="/anime">
                    <Headeritem name={item.name} Icon={item.icon}/>
                  </Link>
                ) : (
                  <Headeritem name={item.name} Icon={item.icon}/>
                )}
              </div>
            )
          ))}
        </div>
        
        {/* Mobile menu */}
        <div className='flex md:hidden gap-5 items-center'>
          <Link to="/">
            <Headeritem name="" Icon={HiHome} />
          </Link>
          <div className='relative' ref={searchRef}>
            {isSearchExpanded ? (
              <div className='flex items-center gap-2 animate-wiggle absolute left-0'>
                <HiMagnifyingGlass className="text-white" />
                <input 
                  type="text" 
                  placeholder="Search here..." 
                  className="bg-transparent border-b-2 border-white text-white w-[150px] outline-none placeholder:text-gray-400 transition-all duration-300 ease-in-out py-0"
                  autoFocus
                  onKeyPress={handleSearch}
                />
              </div>
            ) : (
              <div onClick={() => setIsSearchExpanded(!isSearchExpanded)}>
                <Headeritem name="" Icon={HiMagnifyingGlass} />
              </div>
            )}
          </div>
          <div className={`flex gap-5 transition-all duration-300 ${isSearchExpanded ? 'translate-x-[160px]' : ''}`}>
            <Link to="/anime">
              <Headeritem name="" Icon={GiNinjaHeroicStance} />
            </Link>
            <div onClick={() => setToggle(!toggle)}>
              <Headeritem name="" Icon={HiDotsVertical} />
              {toggle && (
                <div className='absolute mt-3 bg-[#121212] border-[1px] p-3 border-gray-700 px-5 py-4'>
                  {menu.map((item, index) => index >= 3 && (
                    <Headeritem key={item.name} name={item.name} Icon={item.icon} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Auth buttons or profile picture */}
      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-white">{user.username}</span>
            <div className="relative" ref={profileRef}>
              <img 
                src={pfp} 
                className='w-[55px] rounded-full cursor-pointer'
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} 
              />
              {isProfileMenuOpen && (
                <button
                  onClick={handleLogout}
                  className="absolute right-0 mt-6 w-48 px-6 py-3 bg-white text-black font-bold 
                            rounded-md cursor-pointer border-0"
                  style={{ backgroundColor: 'white', color: 'black' }}
                >
                  LOGOUT
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className={`flex ${isSearchExpanded ? 'flex-col' : 'flex-row'} gap-4`}>
            <Link
              to="/login"
              className="px-4 py-2 bg-white text-black font-medium rounded-md w-full
                        hover:bg-black hover:text-white hover:scale-110 hover:border-2 hover:border-white
                        transition-all duration-300 no-underline !text-black text-center
                        hover:!text-white whitespace-nowrap"
            >
              LOGIN
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-white text-black font-medium rounded-md w-full
                        hover:bg-black hover:text-white hover:scale-110 hover:border-2 hover:border-white
                        transition-all duration-300 no-underline !text-black text-center
                        hover:!text-white whitespace-nowrap"
            >
              REGISTER
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header