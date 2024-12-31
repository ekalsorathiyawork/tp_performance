"use client";
import React, { useEffect, useState, useRef, useMemo } from "react"; // Added useMemo for performance optimization
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

const ProductGroups = () => {
  const [app, setApp] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const swiperInstances = useRef({}); // Using useRef to avoid unnecessary re-renders

  // Memoize popular products to prevent unnecessary re-calculations on re-renders
  const popularProducts = useMemo(() => {
    return (
      app?.buildmenu?.groups?.find((group) => group.id === 197728)?.children || []
    );
  }, [app]);

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
        const response = await axios.get("/services/buildMenu");
        const appData = response.data.data;
        const script = document.createElement("script");
        script.src = "/js/swiper-bundle.min.js";
        script.onload = () => initSwipers();
        document.body.appendChild(script);
        
        setApp(appData);
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

  // Loading state
  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  return (
    <>
      <section className="productgroups-home">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h2 className="main_h2">Popular</h2>
              <div
                className="swiper_init swiper-main populargroups"
                style={{ width: "100%" }}
              >
                <div
                  className="swiper-wrapper_init"
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  {popularProducts?.slice(0, 10)?.map((product) => (
                    <div key={product.id} className="swiper-slide_init">
                      <div className="categories-panel">
                        <Link href={`/`} className="single_group">
                          <b className="single_group-title">{product.name}</b>
                          <div
                            style={{
                              width: "125px",
                              height: "125px",
                              margin: "0 auto",
                            }}
                          >
                            {product.mediaid && (
                              // Lazy load images, removing priority if not necessary
                              <Image
                                src={`https://www.trailerplus.eu/media/${product.mediaid}/125/${product.medianame}`}
                                alt={product.name}
                                title={product.name}
                                className="img-responsive"
                                width={125}
                                height={125}
                                
                              />
                            )}
                          </div>
                          <button
                            className="btn btn-xs btn-primary"
                            style={{ width: "100%", background: "#0282c5" }}
                          >
                            View all {product.name}
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Navigation buttons */}
                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>

                {/* Scrollbar */}
                <div
                  className="swiper-scrollbar"
                  style={{ display: "none" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductGroups;
