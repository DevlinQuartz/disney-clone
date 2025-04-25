import React, { useState } from 'react'
import logo from '../assets/Images/logo.png'
import pfp from '../assets/Images/pfp.jpg'
import { HiDotsVertical, HiHome } from "react-icons/hi";
import { HiMagnifyingGlass, HiPlayCircle, HiPlus, HiStar, HiTv } from "react-icons/hi2";
import Headeritem from './Headeritem';

function Header() {
  const [toggle, setToggle] = useState(false);
  const menu =[
    {
      name: 'HOME',
      icon: HiHome
    },
    {
      name: 'SEARCH',
      icon: HiMagnifyingGlass
    },
    {
      name: 'WATCH LIST',
      icon: HiPlus
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
        <img src={logo} className='w-[80px] md:w-[115px] object-cover' />
        <div className='hidden md:flex gap-8'>
          {menu.map((item) => (
            <Headeritem name={item.name} Icon={item.icon}/>
          ))}
        </div>
        <div className='flex md:hidden gap-5'>
          {menu.map((item,index) => index<3&&(
            <Headeritem name={''} Icon={item.icon} />
          ))}
          <div className='md:hidden' onClick={() => setToggle(!toggle)}>
            <Headeritem name={''} Icon={HiDotsVertical} />
            {toggle?<div className='absolute mt-3 bg-[#121212] border-[1px] p-3 border-gray-700 px-5 py-4'>
              {menu.map((item, index) => index >= 3 && (
                <Headeritem name={item.name} Icon={item.icon} />
              ))}
            </div>:null}
          </div>
        </div>
      </div>
      <img src={pfp} className='w-[55px] rounded-full' />
    </div>
  )
}

export default Header