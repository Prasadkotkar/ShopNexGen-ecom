import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DealCard from "./DealCard";
import { useAppSelector } from "../../../../Redux Toolkit/Store";

export default function DealSlider() {
  const { homePage } = useAppSelector((store) => store);

  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    speed: 10000,
    autoplaySpeed: 1000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024, // Large screen
        settings: {
          slidesToShow: 5,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 768, // Tablet
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480, // Mobile
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
      <div className="py-4">
      {/*</div><div className="py-4 lg:px-20">*/}
      <div className="slide-container">
        <Slider {...settings}>
          {homePage.homePageData?.deals?.map((item) => (
            <div key={item.id} className="border flex flex-col items-center justify-center">
              <DealCard deal={item} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
