"use client";

import { useEffect, useState } from "react";
import Brands from "./components/Home/Brands";
import "@/public/css/swiper-bundle.min.css";
import "@/public/css/responsive-brand-logo-carousel.min.css";
import Banner from "./components/Home/Banner";
import PopularProducts from "./components/Home/PopularProducts";
import ProductGroups from "./components/Home/PopularGroups";
import ImageMaps from "./components/Home/ImageMaps";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to scroll to the top
  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <div
        id="pointer-up"
        onClick={scrollUp} // Trigger the scrollUp function on click
        style={{
          display: isVisible ? "block" : "none", // Only show if the button should be visible
        }}
        className="pointer-up pointer hidden-xs" // Using your CSS class names
      >
        <i style={{ color: "#0182C5" }} className="fa fa-arrow-up fa-2x"></i>
      </div>
      <ImageMaps />
      <ProductGroups />
      <PopularProducts/>
      <Banner />
      <Brands />
      <style jsx global>
        {`
          .swiper-main.populargroups .swiper-slide {
            max-width: 320px;
          }

          .populargroups .swiper-button-next {
            color: #000;
            top: calc((100% - 44px) / 2) !important;
            background-color: white;
            width: 40px;
            height: 40px;
            border-radius: 100%;
            box-shadow: 0px 0px 5px 1px #bbb;
            transition: 0.2s;
            opacity: 0.5;
            display: flex;
            justify-content: center;
          }

          .populargroups .swiper-button-prev {
            color: #000;
            top: calc((100% - 44px) / 2) !important;
            background-color: white;
            width: 40px;
            height: 40px;
            border-radius: 100%;
            box-shadow: 0px 0px 5px 1px #bbb;
            transition: 0.2s ease;
            opacity: 0.5;
            display: flex;
            justify-content: center;
          }

          .populargroups .swiper-button-next:hover,
          .populargroups .swiper-button-prev:hover {
            opacity: 1;
          }

          .populargroups .swiper-button-prev:after,
          .populargroups .swiper-button-next:after {
            font-size: 20px;
            font-weight: 600;
          }

          .populargroups .swiper-button-prev:after {
            padding-right: 3px;
          }

          .populargroups .swiper-button-next:after {
            padding-left: 3px;
          }

          .swiper-button-disabled {
            opacity: 0.25 !important;
          }

          @media (max-width: 767px) {
            .fa-spinner {
              display: block !important;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              font-size: 50px;
              z-index: 1;
              color: #0282c5;
            }

            .swiper-main.populargroups .swiper-slide {
              max-width: 192px;
            }

            .swiper_onload {
              opacity: 0;
              max-height: 472px;
              overflow: hidden;
            }

            section.image-maps div.boat-trailer,
            section.image-maps div.trailer {
              width: 100%;
            }

            section.image-maps div.trailers {
              border: none !important;
            }

            .brands img.grayscale {
              -webkit-filter: grayscale(0%);
            }

            #popularproducts .productbrand {
              background-color: none;
            }

            #popularproducts {
              min-height: 600px;
            }

            section.image-maps div.trailers {
              border: 1px solid #a9b3b8;
            }

            .swiper {
              padding-bottom: 20px;
            }

            .swiper-main {
              margin-left: -15px;
              margin-right: -15px;
              padding-bottom: 9px;
            }

            .swiper-main .swiper-scrollbar {
              left: 0px;
              right: 0px;
              bottom: 0px;
              height: 6px;
              width: 100%;
            }

            .swiper-wrapper {
              padding-left: 15px;
              padding-right: 15px;
            }

            .swiper .usp-scrollbar {
              bottom: var(--swiper-scrollbar-bottom, 0px) !important;
            }

            #brands-slider .swiper-slide img {
              display: block;
              width: 70px;
              height: 70px;
              object-fit: contain;
              opacity: 1;
            }

            .swiper-slide {
              width: 80%;
            }

            .pdl {
              padding-left: 0px !important;
            }

            section.popularproducts h2 {
              padding-bottom: 0px !important;
            }

            section.popularproducts .articlenumber {
              display: none;
            }

            section.image-maps div.trailers {
              border: none;
            }

            .productslider100,
            .productslider100 img {
              min-width: 100% !important;
              width: 100% !important;
            }

            section.popularproducts .order button img {
              display: none !important;
            }
          }
        `}
      </style>
    </>
  );
}
