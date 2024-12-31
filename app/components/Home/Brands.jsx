"use client";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "dompurify";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const Brands = () => {
  const [app, setApp] = useState();
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const language = "eu";
    const swiperInstances = useRef({}); // Using useRef to avoid unnecessary re-renders
  

  const addSwiperClasses = (swiperElement) => {
    swiperElement.classList.add("swiper");
    swiperElement
      .querySelector(".swiper-wrapper_init")
      ?.classList.add("swiper-wrapper");
    swiperElement
      .querySelectorAll(".swiper-slide_init")
      ?.forEach((slide) => slide.classList.add("swiper-slide"));
  };

  const removeSwiperClasses = (swiperElement) => {
    swiperElement.classList.remove("swiper");
    swiperElement
      .querySelector(".swiper-wrapper_init")
      ?.classList.remove("swiper-wrapper");
    swiperElement
      .querySelectorAll(".swiper-slide_init")
      ?.forEach((slide) => slide.classList.remove("swiper-slide"));
  };

  const initSwipers = () => {
    const swipers = document.querySelectorAll(".swiper_init");
    const isVisible = window.innerWidth <= 768;
    const width = document.documentElement.clientWidth;

    swipers.forEach((el, index) => {
      // Check if the element is visible or should be initialized
      if (
        isVisible ||
        el.classList.contains("brandbar") ||
        el.classList.contains("populargroups") ||
        el.classList.contains("trailer_swiper")
      ) {
        if (!swiperInstances.current[index]) { // Check if swiper instance doesn't already exist
          addSwiperClasses(el);

          let swiperOptions = {
            slidesPerView: "auto",
            spaceBetween: 15,
            draggable: true,
          };

          // Customize swiperOptions based on class or conditions
          if (el.classList.contains("swiper-products")) {
            swiperOptions.slidesPerView = 2;
            swiperOptions.spaceBetween = 5;
          } else if (el.classList.contains("trailer_swiper") && width > 1200) {
            swiperOptions.slidesPerView = 2.5;
            swiperOptions.spaceBetween = 15;
          } else if (el.classList.contains("brandbar")) {
            swiperOptions.autoplay = { delay: 3000 };
            swiperOptions.loop = true;
            swiperOptions.breakpoints = {
              300: { slidesPerView: 5, spaceBetween: 60 },
              678: { slidesPerView: 10, spaceBetween: 60 },
            };
          } else if (el.classList.contains("populargroups")) {
            swiperOptions.navigation = {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            };
          }

          if (window.Swiper) {
            swiperInstances.current[index] = new window.Swiper(el, swiperOptions);
          } else {
            console.error("Swiper is not available on window.");
          }

          el.querySelector(".fa-spinner")?.remove();
          el.querySelector(".swiper-wrapper_init")?.classList.remove(
            "swiper_onload"
          );
        }
      } else {
        Object.keys(swiperInstances.current).forEach((key) => {
          if (swiperInstances.current[key]) {
            removeSwiperClasses(el);
            swiperInstances.current[key].destroy(true, true);
            swiperInstances.current[key] = undefined;
          }
        });
      }
    });
  };

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const response = await axios.get("/services/buildMenu"); // Use your own API route
        const appData = response.data.data;
        setApp(appData);
        const brandsData = Object.values(
          response?.data?.data?.buildmenu?.brands || []
        );
        const script = document.createElement("script");
        script.src = "/js/swiper-bundle.min.js";
        script.onload = () => initSwipers();
        document.body.appendChild(script);

        setBrands(brandsData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error.message);
        setIsLoading(false);
      }
    };

    fetchFooter();
    window.addEventListener("resize", initSwipers);
    return () => {
      window.removeEventListener("resize", initSwipers);
    };
  }, []);

  const content =
    app?.shopdata?.adiv?.[app?.shopdata?.siteid]?.[language]?.[112]?.content;

  const sanitizedContent = content
    ? typeof window !== "undefined"
      ? DOMPurify.sanitize(content)
      : content
    : "";
  // const brandContent =
  //   app?.shopdata?.adiv?.[app?.shopdata?.siteid]?.[language]?.[127]?.content;
  // const sanitizedBrandContent = brandContent
  //   ? typeof window !== "undefined"
  //     ? DOMPurify.sanitize(brandContent)
  //     : brandContent
  //   : "";

  const groupedBrands = brands.reduce((acc, brand, index, array) => {
    if (index % 2 === 0) {
      const pair = array.slice(index, index + 2);
      if (pair.length > 0) {
        acc.push(pair);
      }
    }
    return acc;
  }, []);

  // const brandContent =
  //   app?.shopdata?.adiv?.[app?.shopdata?.siteid]?.[language]?.[127]?.content;

  //   console.log("Brand Content",brandContent);

  // const sanitizedBrandContent = brandContent
  //   ? typeof window !== "undefined"
  //     ? DOMPurify.sanitize(brandContent)
  //     : brandContent
  //   : "";

  // const groupedBrands = brands.reduce((acc, brand, index, array) => {
  //     if (index % 2 === 0) {
  //       const pair = array.slice(index, index + 2);
  //       if (pair.length > 0) {
  //         acc.push(pair);
  //       }
  //     }
  //     return acc;
  //   }
  //   , []);
  // const brands = Object.values(initialData?.menu?.buildmenu?.brands || []);
  // const brandContent = response?.data?.data?.shopdata?.adiv?.[initialData?.menu?.shopdata?.siteid]?.[
  //     language
  //   ]?.[127]?.content;
  // const sanitizedBrandContent = brandContent
  //   ? typeof window !== "undefined"
  //     ? DOMPurify.sanitize(brandContent)
  //     : brandContent
  //   : "";
  // const groupedBrands = brands.reduce((acc, brand, index, array) => {
  //   if (index % 2 === 0) {
  //     const pair = array.slice(index, index + 2);
  //     if (pair.length > 0) {
  //       acc.push(pair);
  //     }
  //   }
  //   return acc;
  // }, []);

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  // if (error) {
  //   return <p style={{ color: "red" }}>Error: {error}</p>;
  // }
  return (
    <>
      <section className="brands">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <p className="h2">TrailerPlus Brands</p>
              <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row" style={{ overflow: "hidden" }}>
            <div className="brandbar swiper_init swiper-main">
              <div
                id="brands-slider"
                className="swiper-wrapper_init"
                style={{ display: "flex" }}
              >
                {groupedBrands.map((brandPair, groupIndex) => (
                  <div
                    key={`slide-${groupIndex}`}
                    className="swiper-slide_init"
                    style={{ width: "100px", height: "100px" }}
                  >
                    {brandPair.map(
                      (brand) =>
                        brand.mediaid && (
                          <Link key={brand.slug} href={`/`}>
                            <Image
                              className="grayscale brands-slide"
                              src={`https://www.trailerplus.eu/media/${brand.mediaid}/100/${brand.medianame}`}
                              alt={brand.brandname}
                              title={brand.brandname}
                              loading="lazy"
                              width={100}
                              height={40}
                            />
                          </Link>
                        )
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </>
  );
};

export default Brands;
