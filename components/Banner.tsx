import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'

function Banner(): JSX.Element {
  return (
    <div>
      <div className='relative block md:hidden'>
        <Carousel
          autoPlay
          infiniteLoop
          showStatus={false}
          showIndicators={false}
          showThumbs={false}
          interval={5000}
        >
          <div className='w-full h-[60vh] bg-[url("https://i.imgur.com/oJ0nwZ6.jpg")] bg-cover '></div>
          <div className='w-full h-[60vh] bg-[url("https://i.imgur.com/Py43N2L.png")] bg-cover '></div>
          <div className='w-full h-[60vh] bg-[url("https://i.imgur.com/Tf2sJUF.png")] bg-cover '></div>
          <div className='w-full h-[60vh] bg-[url("https://i.imgur.com/iDd0Kns.jpg")] bg-cover '></div>
          <div className='w-full h-[60vh] bg-[url("https://i.imgur.com/6txqFrF.jpg")] bg-cover '></div>
        </Carousel>

        <div className='absolute h-8 md:h-16 lg:h-24 xl:h-32 w-full bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20' />
      </div>
      <div className='relative hidden md:block'>
        <Carousel
          autoPlay
          infiniteLoop
          showStatus={false}
          showIndicators={false}
          showThumbs={false}
          interval={5000}
        >
          <div className='w-full h-[60vh] bg-[url("https://i.imgur.com/xaAGkLC.jpg")] bg-cover '></div>
          <div className='w-full h-[60vh] bg-[url("https://i.imgur.com/1r0eSy6.jpg")] bg-cover '></div>
          <div className='w-full h-[60vh] bg-[url("https://i.imgur.com/6iYPXaA.jpg")] bg-cover '></div>
          <div className='w-full h-[60vh] bg-[url("https://i.imgur.com/5xMlA7n.jpg")] bg-cover '></div>
          <div className='w-full h-[60vh] bg-[url("https://i.imgur.com/MNdu7DZ.jpg")] bg-cover '></div>
          <div className='w-full h-[60vh] bg-[url("https://i.imgur.com/YWT4q0V.jpg")] bg-cover '></div>
          <div className='w-full h-[60vh] bg-[url("https://i.imgur.com/WLYlWZO.jpg")] bg-cover '></div>
          <div className='w-full h-[60vh] bg-[url("https://i.imgur.com/oX8wB1x.jpg")] bg-cover '></div>
        </Carousel>

        <div className='absolute h-8 md:h-16 lg:h-24 xl:h-32 w-full bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20' />
      </div>
    </div>
  )
}

export default Banner
