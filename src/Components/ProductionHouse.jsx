import React from 'react'

import saber from './../assets/Images/saber.jpg'
import castoria from './../assets/Images/castoria.jpg'
import arcueid from './../assets/Images/arcueid.jpg'
import aoko from './../assets/Images/aoko.jpg'
import alice from './../assets/Images/alice.jpg'

import saberv from './../assets/Videos/saber.mp4'
import castoriav from './../assets/Videos/castoria.mp4'
import arcueidv from './../assets/Videos/arcueid.mp4'
import aokov from './../assets/Videos/aoko.mp4'
import alicev from './../assets/Videos/alice.mp4'

function ProductionHouse() {
    const productionHouseList=[
        {
            id:1,
            image:saber,
            video:saberv,
        },
        {
            id:2,
            image:castoria,
            video:castoriav,
        },
        {
            id:3,
            image:arcueid,
            video:arcueidv,
        },
        {
            id:4,
            image:aoko,
            video:aokov,
        },
        {
            id:5,
            image:alice,
            video:alicev,
        }
    ]
    return (
        <div className='flex gap-2 md:gap-5 p-2 px-3 md:px-13'>
            {productionHouseList.map((item) =>
                <div className='relative border-[2px] border-gray-600 rounded-lg hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer hover:border-white hover:border-[5px] overflow-hidden'>
                    <img src={item.image} className='w-full' />
                    <video
                        src={item.video}
                        autoPlay
                        loop
                        playsInline
                        className='absolute top-0 left-0 right-0 w-full h-full object-cover opacity-0 hover:opacity-100 transition-opacity duration-300'
                    ></video>
                </div>
            )}
        </div>
    )
}

export default ProductionHouse