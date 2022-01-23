import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

function Banner() {
  return (
    <div className="relative">
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        <div>
          <img loading="lazy" src="https://links.papareact.com/gi1" />
        </div>

        <div>
          <img loading="lazy" src="https://links.papareact.com/6ff" />
        </div>

        <div>
          <img loading="lazy" src="https://links.papareact.com/7ma" />
        </div>

        <div>
          <img loading="lazy" src="./a_1.jpg" />
        </div>

        <div>
          <img loading="lazy" src="./a_2.jpg" />
        </div>

        <div>
          <img loading="lazy" src="./a_3.jpg" />
        </div>

        <div>
          <img loading="lazy" src="./a_4.jpg" />
        </div>

        <div>
          <img loading="lazy" src="./a_5.jpg" />
        </div>

        <div>
          <img loading="lazy" src="./a_6.jpg" />
        </div>
      </Carousel>

      <div className="absolute h-8 md:h-16 lg:h-24 xl:h-32 w-full bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
    </div>
  );
}

export default Banner;
