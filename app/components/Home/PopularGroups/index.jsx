"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
// import { useGlobalContext } from "@/app/context/GlobalContext";
import Link from "next/link";
import axios from "axios";

const ProductGroups = () => {
  // const { globalState } = useGlobalContext();
  // const { initialData, isLoading, error } = globalState;
  const [app, setApp] = useState();
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    // Initialize Swiper after the component mounts (using the global Swiper object)
    // if (window.Swiper) {
    //   const swiper = new window.Swiper(".swiper-main", {
    //     loop: true, // Enable looping
    //     navigation: {
    //       nextEl: ".swiper-button-next",
    //       prevEl: ".swiper-button-prev",
    //     },
    //     // scrollbar: {
    //     //   el: ".swiper-scrollbar",
    //     //   draggable: true, // Makes the scrollbar draggable
    //     // },
    //     slidesPerView: "auto", // Adjust the number of slides visible
    //   });

    //   // Cleanup swiper instance on unmount
    //   return () => {
    //     swiper.destroy();
    //   };
    // }
    const fetchFooter = async () => {
      try {
        const response = await axios.get("/services/buildMenu"); // Use your own API route
        const appData = response.data.data;
        setApp(appData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error.message);
        setIsLoading(false);
      }
    };

    fetchFooter();
  }, []);

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  // if (error) {
  //   return <p style={{ color: "red" }}>Error: {error}</p>;
  // }

  const popularProducts =
    app?.buildmenu?.groups?.find((group) => group.id === 197728)
      ?.children || [];

  return (
    <>
    <section className="productgroups-home" style={{ maxHeight: "500px" }}>
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
              {/* <div className="swiper-button-prev"></div>
              <div className="swiper-button-next"></div> */}

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
