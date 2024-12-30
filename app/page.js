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
      {/* <PopularProducts/> */}
      <Banner />
      <Brands />
      
    </>
  );
}
