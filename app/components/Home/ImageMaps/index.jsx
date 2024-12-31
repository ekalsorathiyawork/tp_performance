"use client";
import React from "react";
import DOMPurify from "dompurify";
// import { useGlobalContext } from "@/app/context/GlobalContext";
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
                        <Link href="/">
                          <Image
                            className="tp-paymentlogos"
                            src={"/images/tp-pay-logo/bancontact.svg"}
                            width={40}
                            height={40}
                            alt="Bancontact"
                          />

                          <Image
                            className="tp-paymentlogos"
                            src={"/images/tp-pay-logo/klarna.webp"}
                            width={40}
                            height={40}
                            alt="Klarna"
                          />

                          <Image
                            className="tp-paymentlogos"
                            src={"/images/tp-pay-logo/mastercard.webp"}
                            width={40}
                            height={40}
                            alt="Mastercard"
                          />

                          <Image
                            className="tp-paymentlogos"
                            src={"/images/tp-pay-logo/visa.webp"}
                            width={40}
                            height={40}
                            alt="Visa"
                          />

                          <Image
                            className="tp-paymentlogos"
                            src={"/images/tp-pay-logo/maestro-card.webp"}
                            width={40}
                            height={40}
                            alt="Maestro"
                          />
                          <Image
                            className="tp-paymentlogos"
                            src={"/images/tp-pay-logo/iDEAL_in3.png"}
                            width={40}
                            height={40}
                            alt="iDeal"
                          />

                          <Image
                            className="tp-paymentlogos"
                            src={"/images/tp-pay-logo/paypal.webp"}
                            width={40}
                            height={40}
                            alt="PayPal"
                          />
                        </Link>
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
    </>
  );
};

export default ImageMaps;
