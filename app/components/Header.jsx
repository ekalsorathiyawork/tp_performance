"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import axios from "axios";

// import { useGlobalContext } from "@/app/context/GlobalContext";

const Header = () => {
  // const { globalState } = useGlobalContext();
  // const { initialData, isLoading, error, language } = globalState;
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [menuHeader, setMenuHeader] = useState("affix-top");
  const [app, setApp] = useState();
  const language = "en";

  useEffect(() => {
    const navElement = document.getElementById("nav");
    const headerHeight =
      document.querySelector("header.logo-header")?.offsetHeight;

    // Set up affix behavior
    if (navElement) {
      const handleAffix = () => {
        if (window.scrollY >= headerHeight - 100) {
          document.body.classList.add("affixed");
          setMenuHeader("affix");
          const fastSearchElement = document.querySelector(".fastsearch");
          if (fastSearchElement) {
            fastSearchElement.style.display = "none";
          }
        } else {
          document.body.classList.remove("affixed");
          setMenuHeader("affix-top");
        }
      };
      const fetchFooter = async () => {
        try {
          const response = await axios.get("/services/buildMenu"); // Use your own API route
          const appData = response.data.data;
          setApp(appData);
        } catch (error) {
          console.error("Error fetching products:", error.message);
        }
      };
  
      fetchFooter();

      window.addEventListener("scroll", handleAffix);

      return () => {
        window.removeEventListener("scroll", handleAffix);
      };
    }
  }, []);

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  // if (error) {
  //   return <p style={{ color: "red" }}>Error: {error}</p>;
  // }

  // const app = initialData?.menu;

  const handleMouseEnter = (id) => {
    setHoveredMenu(id);
  };

  const handleMouseLeave = () => {
    setHoveredMenu(null);
  };

  // Determine trusted shop
  const trustedShop =
    app?.shopdata?.apps?.[100025]?.function === "trustedshops"
      ? app?.shopdata?.apps?.[100025]?.cache?.channels?.find(
          (channel) =>
            /**
             * Commented due to domain not match
             * Provided API domain: www.trustedshops.at
             * channel.url === hostname &&
             */
            channel?.aggregaterating?.overall
        )
      : null;

  const content = app?.shopdata?.adiv?.[app?.shopdata?.siteid]?.[
    language
  ]?.[81]?.content?.replace(/^<p>(.*?)<\/p>$/, "$1");
  const sanitizedContent = content
    ? typeof window !== "undefined"
      ? DOMPurify.sanitize(content)
      : content
    : "";

  return (
    <>
      <div className="header-wrapper">
        <header className="service-header">
          <div className="container-fluid">
            <ul className="services-left">
              <li
                className="phone"
                dangerouslySetInnerHTML={{
                  __html: sanitizedContent,
                }}
              ></li>

              {trustedShop && (
                <li
                  className="trustedshops"
                  onClick={() => window.open(trustedShop?.link, "_blank")}
                ></li>
              )}

              <li className="trustedshops-data">
                {
                  <Link
                    key={`ratting`}
                    href={"/"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {Array.from({
                      length: trustedShop?.aggregaterating?.["365days"]?.rating,
                    }).map((_, i) => (
                      <i
                        key={i}
                        className="fa fa-star yellow"
                        style={{ color: "#FFDC0F" }}
                        aria-hidden="true"
                      />
                    ))}

                    <span>
                      <strong>
                        {trustedShop?.aggregaterating?.overall?.count}
                      </strong>{" "}
                      Verified Reviews
                    </span>
                  </Link>
                }
              </li>

              <li className="logo">
                <Link title="Home" href="/">
                  <Image
                    src={"/images/trailer-plus-logo.png"}
                    width={267}
                    height={52}
                    loading="eager"
                    alt="trailer-plus-logo.png"
                    priority 
                  />
                </Link>
              </li>
            </ul>

            <div className="center-right-wrapper">
              <ul className="services-center">
                <li>
                  <Link href="/"> About us </Link>
                </li>

                <li>
                  <Link title="contact" href="/">
                    &nbsp;Contact
                  </Link>
                </li>
              </ul>

              <ul className="services-right">
                <li className="block callus" style={{ display: "none" }}>
                  <Link href="tel:+31528854443">

                    <element className="fa-phone" aria-hidden="true"></element>
                  </Link>
                </li>

                <li
                  className="trustedshops"
                  // onClick="window.open('trustedshoplink', '_blank');"
                ></li>
                <li className="block newcustomer">
                  <Link title="newcustomer" href="/">
                    New Customer
                  </Link>
                </li>
                <li className="block login">
                  <Link title="login" href="/">
                    <span>Login</span>
                    <i className="fa fa-user" aria-hidden="true"></i>
                  </Link>
                </li>
                <li className="shoppingcart">
                  <Link title="shoppingcart" href="/">
                    <span className="cartname">shopping cart</span>
                    <span className="amount shopcart">0</span>
                  </Link>
                </li>
                <li className="search">
                  <div className="search-wrapper">
                    {/* Call the API */}
                    <form action="/zoeken" method="get" autoComplete="off">
                      <div className="form-group">
                        <div className="icon-addon addon-md">
                          <input
                            id="search-1"
                            // onKeyUp="javascript:tpsearch($(this).attr('id'));"
                            type="search"
                            name="q"
                            placeholder="What are you looking for"
                            className="searchinput"
                          />
                        </div>
                      </div>
                    </form>
                    <div
                      id="result-1"
                      className="fastsearch searchresult"
                    ></div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </header>

        <header className="logo-header">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xs-12 col-sm-4">
                <Link title="Home" href="/">
                  <Image
                    src={"/images/trailer-plus-logo.png"}
                    width={267}
                    height={52}
                    loading="eager"
                    alt="trailer-plus-logo.png"
                  />
                </Link>
              </div>
              <div className="hidden-xs col-sm-6 col-sm-offset-2 col-lg-4 col-lg-offset-0">
                <form
                  id="search-form-2"
                  action="/zoeken"
                  method="get"
                  autoComplete="off"
                >
                  <div className="form-group">
                    <div className="icon-addon addon-md">
                      <input
                        id="search-2"
                        // onkeyup="javascript:tpsearch($(this).attr('id'));"
                        name="q"
                        type="search"
                        placeholder="What are you looking for"
                        className="form-control searchinput"
                      />

                      <i
                        className="fa fa-2x fa-search-plus pointer"
                        aria-hidden="true"
                        title="search"
                        // onClick="document.getElementById('search-form-2').submit();"
                      ></i>
                    </div>
                  </div>
                  <div id="result-2" className="fastsearch"></div>
                </form>

                <input id="hr-search-input" style={{ display: "none" }}></input>
              </div>
            </div>
          </div>
        </header>

        <header className={`navigation-header ${menuHeader}`} id="nav">
          <Link title="Home" href="/">
            <Image
              src={"/images/trailer-plus-logo-sticky-bar.webp"}
              className="sticky-logo"
              title="TrailerPlus logo"
              alt="TrailerPlus logo"
              width={220}
              height={42}
            />
          </Link>

          <div className="container">
            <div className="navbar navbar-expand-sm navbar-dark bg-dark">
              <button
                className="navbar-toggler hidden-md hidden-lg"
                type="button"
                data-toggle="collapse"
                data-target="#menu"
                aria-controls="menu"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span>menu</span>
                <Image
                  src={"/images/hamburger.webp"}
                  alt="TrailerPlus menu"
                  width={48}
                  height={48}
                />
              </button>

              <div className="collapse navbar-collapse" id="menu">
                <ul className="navbar-nav mr-auto">
                  {app?.myshopid == 250 && (
                    <li class="nav-item active">
                      <Link title="Home" class="nav-link" href="/">
                        Home
                      </Link>
                    </li>
                  )}
                  {app?.buildmenu?.groups &&
                    app?.buildmenu?.groups?.length > 0 && (
                      <>
                        {app?.buildmenu?.groups?.map((group) => (
                          <li
                            key={group?.id}
                            className={`nav-item dropdown n1-${
                              group?.slug
                            } extraspace ${
                              hoveredMenu === group?.id ? "open" : ""
                            }`}
                            onMouseEnter={() => handleMouseEnter(group?.id)}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => {
                              if (group?.children) {
                                // Handling if the group has children
                                setHoveredMenu(group?.id);
                              }
                            }}
                          >
                            <Link
                              href={`/`}
                              className="nav-link dropdown-toggle"
                              id={`group-${group?.id}`}
                              role="button"
                              data-toggle={group?.children ? "dropdown" : ""}
                              aria-haspopup="true"
                              aria-expanded={
                                hoveredMenu === group?.id ? "true" : "false"
                              }
                            >
                              {group?.name}{" "}
                              {group?.children &&
                                group?.children?.length > 0 && (
                                  <i
                                    className="fa fa-chevron-down"
                                    aria-hidden="true"
                                  ></i>
                                )}
                            </Link>

                            {group?.children && group?.children?.length > 0 && (
                              <div
                                className={`dropdown-menu ${
                                  hoveredMenu === group?.id ? "show" : ""
                                }`}
                                aria-labelledby={`group-${group?.id}`}
                              >
                                {group?.children?.map((child) => (
                                  <Link
                                    key={child?.id}
                                    className="dropdown-item"
                                    href={`/`}
                                  >
                                    {child?.name}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </li>
                        ))}
                      </>
                    )}

                  {app?.buildmenu?.brands &&
                    app?.buildmenu?.brands?.length > 0 && (
                      <li className="nav-item dropdown">
                        <Link
                          href="/"
                          className="nav-link dropdown-toggle"
                          id="navbarDropdown"
                          role="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          {brands}{" "}
                          <i
                            className="fa fa-chevron-down"
                            aria-hidden="true"
                          ></i>
                        </Link>
                        <div
                          className="dropdown-menu col4"
                          aria-labelledby="navbarDropdown"
                        >
                          {app?.buildmenu?.brands?.map((brand) => (
                            <Link
                              key={brand?.slug}
                              className="dropdown-item"
                              href={`/`}
                            >
                              {brand?.brandname}
                            </Link>
                          ))}
                        </div>
                      </li>
                    )}
                </ul>

                <form
                  action="/zoeken"
                  method="get"
                  className="form-inline my-2 my-lg-0 hidden-sm hidden-md hidden-lg"
                >
                  <input
                    className="form-control mr-sm-2"
                    type="search"
                    name="q"
                    aria-label="Search"
                    placeholder="What are you looking for"
                  />
                  <button
                    className="btn btn-default my-2 my-sm-0"
                    type="submit"
                  >
                    Search
                  </button>
                </form>
              </div>

              <div className="hidden-md hidden-lg main-items">
                <Link
                  href={`/`}
                  className="trailer"
                >
                  {app?.buildmenu?.groupsflat?.[197728]?.["name"]}{" "}
                  <i className="fa fa-chevron-right" aria-hidden="true"></i>
                </Link>
                <Link
                  href={`/`}
                  className="boat-trailer"
                >
                  {app?.buildmenu?.groupsflat?.[197732]?.["name"]}{" "}
                  <i className="fa fa-chevron-right" aria-hidden="true"></i>
                </Link>

                <div
                  className="search_placeholder smartphone-search-header"
                  style={app?.debug ? { display: "block" } : {}}
                >
                  <form action="/zoeken" method="get">
                    <input
                      id="search-3"
                      // onkeyup="javascript:tpsearch($(this).attr('id'));"
                      type="search"
                      name="q"
                      placeholder="What are you looking for"
                      autoComplete="off"
                      className="form-control searchinput"
                    />
                    <button
                    // onClick="this.form.submit();"
                    >
                      <i className="fa fa-search"></i>
                    </button>
                  </form>
                  <div id="result-3" className="fastsearch searchresult"></div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
      <div className="clearfix"></div>

      <div id="hr-search-results" style={{ display: "none" }}></div>
    </>
  );
};

export default Header;
