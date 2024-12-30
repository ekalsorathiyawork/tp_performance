"use client";
import React from "react";
import DOMPurify from "dompurify";
// import { useGlobalContext } from "@/app/context/GlobalContext";
import PaymentLogos from "../snippets/home/PaymentLogos";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ImageMaps = () => {
  // const { globalState } = useGlobalContext();
  // const { initialData, isLoading, error, language } = globalState;
  const [app, setApp] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const language = "eu";
  const [swiperInstances, setSwiperInstances] = useState({});

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
      if (
        isVisible ||
        el.classList.contains("brandbar") ||
        el.classList.contains("populargroups") ||
        el.classList.contains("trailer_swiper")
      ) {
        if (!swiperInstances[index]) {
          addSwiperClasses(el);

          let swiperOptions = {
            slidesPerView: "auto",
            spaceBetween: 15,
            draggable: true,
            // scrollbar: {
            //   el: ".swiper-scrollbar",
            //   draggable: true,
            // },
          };

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
            swiperInstances[index] = new window.Swiper(el, swiperOptions);
          } else {
            console.error("Swiper is not available on window.");
          }

          el.querySelector(".fa-spinner")?.remove();
          el.querySelector(".swiper-wrapper_init")?.classList.remove(
            "swiper_onload"
          );

          setSwiperInstances({ ...swiperInstances });
        }
      } else {
        Object.keys(swiperInstances).forEach((key) => {
          if (swiperInstances[key] !== undefined) {
            removeSwiperClasses(el);
            swiperInstances[key].destroy(true, true);
            swiperInstances[key] = undefined;
            setSwiperInstances({ ...swiperInstances });
          }
        });
      }
    });
  };

  useEffect(() => {
    const loadSwiper = () => {
      const script = document.createElement("script");
      script.src = "/js/swiper-bundle.min.js";
      script.onload = () => initSwipers();
      document.body.appendChild(script);
    };

    loadSwiper();
    window.addEventListener("resize", initSwipers);
    return () => {
      window.removeEventListener("resize", initSwipers);
    };
  }, [swiperInstances]);

  useEffect(() => {
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

  // const app = initialData?.menu;

  const content =
    app?.shopdata?.adiv?.[app?.shopdata?.siteid]?.[language]?.[91]?.content;

  const sanitizedContent = content
    ? typeof window !== "undefined"
      ? DOMPurify.sanitize(content)
      : content
    : "";

  const headerContent =
    app?.shopdata?.adiv?.[app?.shopdata?.siteid]?.[language]?.[87]?.label;

  const sanitizedHeaderContent = headerContent
    ? typeof window !== "undefined"
      ? DOMPurify.sanitize(headerContent)
      : headerContent
    : "";
  // const objects = [197848, 197774, 197776, 197766, 197774, 197809, 197729];
  // const show = objects.every((object) => app?.buildmenu?.groupsflat?.[object]);

  return (
    <>
      <div className="home">
        <section className="image-maps">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 hidden-xs header-row">
                <div
                  dangerouslySetInnerHTML={{ __html: sanitizedHeaderContent }}
                />
              </div>
              <div className="col-lg-3 col-lg-push-9 hidden-xs">
                <div className="row">
                  <div className="col-sm-6 col-md-8 col-lg-12 uspwrap_column">
                    <div className="uspwrap">
                      <div
                        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                      />
                      <div
                        className="hdl hdl-bar"
                        style={{
                          display: "flex",
                          paddingBottom: "30px",
                          paddingLeft: "15px",
                          marginTop: "15px",
                        }}
                      >
                        <PaymentLogos />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-4 col-lg-12"></div>
                </div>
              </div>
              <div className="col-xs-12 col-lg-9 col-lg-pull-3">
                <div
                  className="trailers"
                  style={{
                    height: "293px",
                    maxWidth: "1028px",
                    overflowY: "hidden",
                  }}
                >
                  <div className="swiper_init swiper-main trailer_swiper">
                    <div
                      className="swiper-wrapper_init"
                      style={{
                        display: "flex",
                        maxHeight: "273px",
                      }}
                    >
                      <div className="swiper-slide_init">
                        <div
                          className="trailer"
                          style={{
                            height: "273px",
                            overflow: "hidden",
                            maxHeight: "273px",
                            width: "403px",
                            backgroundImage: `linear-gradient(175deg, rgba(216, 239, 197, 1) 0%, rgba(184, 224, 152, 1) 100%)`,
                            // backgroundImage: `url(/images/trailer.webp), linear-gradient(175deg, rgba(216, 239, 197, 1) 0%, rgba(184, 224, 152, 1) 100%)`,
                          }}
                        >
                          <Image
                            src="/images/trailer.webp"
                            height={273}
                            width={403}
                            alt="Trailer Image"
                            style={{ objectFit: "cover" }}
                            priority
                          />

                          <Link
                            data-toggle="tooltip"
                            data-placement="bottom"
                            data-original-title={
                              app?.buildmenu?.groupsflat?.[197848]?.name
                            }
                            href={`/`}
                            className="plus-green sonar"
                            style={{ top: "30%", left: "65%" }}
                          >
                            <i className="fa fa-plus" aria-hidden="true"></i>
                          </Link>
                          <Link
                            data-toggle="tooltip"
                            data-placement="bottom"
                            data-original-title={
                              app?.buildmenu?.groupsflat?.[197774]?.name
                            }
                            href={`/`}
                            className="plus-green sonar"
                            style={{ top: "50%", left: "30%" }}
                          >
                            <i className="fa fa-plus" aria-hidden="true"></i>
                          </Link>
                          <Link
                            data-toggle="tooltip"
                            data-placement="bottom"
                            data-original-title={
                              app?.buildmenu?.groupsflat?.[197776]?.name
                            }
                            href={`/`}
                            className="plus-green sonar"
                            style={{ top: "65%", left: "18%" }}
                          >
                            <i className="fa fa-plus" aria-hidden="true"></i>
                          </Link>
                          <Link
                            data-toggle="tooltip"
                            data-placement="bottom"
                            data-original-title={
                              app?.buildmenu?.groupsflat?.[197766]?.name
                            }
                            href={`/`}
                            className="plus-green sonar"
                            style={{ top: "68%", left: "82%" }}
                          >
                            <i className="fa fa-plus" aria-hidden="true"></i>
                          </Link>
                          <Link
                            data-toggle="tooltip"
                            data-placement="bottom"
                            data-original-title={
                              app?.buildmenu?.groupsflat?.[197774]?.name
                            }
                            href={`/`}
                            className="plus-green sonar"
                            style={{ top: "44%", left: "3%" }}
                          >
                            <i className="fa fa-plus" aria-hidden="true"></i>
                          </Link>
                          <Link
                            data-toggle="tooltip"
                            data-placement="bottom"
                            data-original-title={
                              app?.buildmenu?.groupsflat?.[197809]?.name
                            }
                            href={`/`}
                            className="plus-green sonar"
                            style={{ top: "58%", left: "91%" }}
                          >
                            <i className="fa fa-plus" aria-hidden="true"></i>
                          </Link>
                          <Link
                            data-toggle="tooltip"
                            data-placement="bottom"
                            data-original-title={
                              app?.buildmenu?.groupsflat?.[197729]?.name
                            }
                            href={`/`}
                            className="plus-green sonar"
                            style={{ top: "76%", left: "47%" }}
                          >
                            <i className="fa fa-plus" aria-hidden="true"></i>
                          </Link>
                          {/* {show && (
                            <>
                              {objects.map((object, index) => {
                                const group =
                                  app?.buildmenu?.groupsflat?.[object];

                                if (!group) return null;

                                const positions = [
                                  { top: "30%", left: "65%" },
                                  { top: "50%", left: "30%" },
                                  { top: "65%", left: "18%" },
                                  { top: "68%", left: "82%" },
                                  { top: "44%", left: "3%" },
                                  { top: "58%", left: "91%" },
                                  { top: "76%", left: "47%" },
                                ];

                                return (
                                  <Link
                                    key={`${object}-${index}`}
                                    data-toggle="tooltip"
                                    data-placement="bottom"
                                    data-original-title={group?.name}
                                    href={`/`}
                                    className="plus-green sonar"
                                    style={positions?.[index]}
                                  >
                                    <i
                                      className="fa fa-plus"
                                      aria-hidden="true"
                                    ></i>
                                  </Link>
                                );
                              })}
                            </>
                          )} */}
                        </div>
                      </div>
                      <div className="swiper-slide_init">
                        <div
                          className="boat-trailer"
                          style={{
                            height: "273px",
                            overflow: "hidden",
                            maxHeight: "273px",
                            width: "403px",
                            // background: `url(/images/boottrailer.webp),`,
                          }}
                        >
                          <Image
                            src="/images/boottrailer.webp"
                            height={273}
                            width={403}
                            alt="boottrailer Image"
                            style={{ objectFit: "cover" }}
                            priority
                          />
                          <Link
                            data-toggle="tooltip"
                            data-placement="bottom"
                            data-original-title={
                              app?.buildmenu?.groupsflat?.[197753]?.name
                            }
                            href={`/`}
                            className="plus-blue sonar"
                            style={{ top: "66%", left: "56%" }}
                          >
                            <i className="fa fa-plus" aria-hidden="true"></i>
                          </Link>
                          <Link
                            data-toggle="tooltip"
                            data-placement="bottom"
                            data-original-title={
                              app?.buildmenu?.groupsflat?.[197773]?.name
                            }
                            href={`/`}
                            className="plus-blue sonar"
                            style={{ top: "57%", left: "83%" }}
                          >
                            <i className="fa fa-plus" aria-hidden="true"></i>
                          </Link>
                          <Link
                            data-toggle="tooltip"
                            data-placement="bottom"
                            data-original-title={
                              app?.buildmenu?.groupsflat?.[197733]?.name
                            }
                            href={`/`}
                            className="plus-blue sonar"
                            style={{ top: "59%", left: "73%" }}
                          >
                            <i className="fa fa-plus" aria-hidden="true"></i>
                          </Link>
                          <Link
                            data-toggle="tooltip"
                            data-placement="bottom"
                            data-original-title={
                              app?.buildmenu?.groupsflat?.[197778]?.name
                            }
                            href={`/`}
                            className="plus-blue sonar"
                            style={{ top: "57%", left: "7%" }}
                          >
                            <i className="fa fa-plus" aria-hidden="true"></i>
                          </Link>
                          <Link
                            data-toggle="tooltip"
                            data-placement="bottom"
                            data-original-title={
                              app?.buildmenu?.groupsflat?.[197912]?.name
                            }
                            href={`/`}
                            className="plus-blue sonar"
                            style={{ top: "50%", left: "54%" }}
                          >
                            <i className="fa fa-plus" aria-hidden="true"></i>
                          </Link>
                          <Link
                            data-toggle="tooltip"
                            data-placement="bottom"
                            data-original-title={
                              app?.buildmenu?.groupsflat?.[197805]?.name
                            }
                            href={`/`}
                            className="plus-blue sonar"
                            style={{ top: "35%", left: "85%" }}
                          >
                            <i className="fa fa-plus" aria-hidden="true"></i>
                          </Link>
                        </div>
                      </div>
                      <div className="swiper-slide_init">
                        <div
                          className="caravan"
                          style={{
                            height: "273px",
                            overflow: "hidden",
                            maxHeight: "273px",
                            width: "403px",
                            backgroundImage: `linear-gradient(175deg, #fed8c3 0%, #ff7d37 100%)`,
                            // backgroundImage:
                            //   "url(/images/caravan.webp), linear-gradient(175deg, #fed8c3 0%, #ff7d37 100%)",
                          }}
                        >
                          <Image
                            src="/images/caravan.webp"
                            height={273}
                            width={403}
                            alt="Caravan Image"
                            style={{ objectFit: "cover" }}
                            priority
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className="swiper-scrollbar"
                      style={{ display: "none" }}
                    ></div>
                    <div className="clearfix"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
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
};

export default ImageMaps;
