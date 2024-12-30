"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
// import { useGlobalContext } from "@/app/context/GlobalContext";
import Image from "next/image";
import axios from "axios";

const Footer = () => {
  // const { globalState } = useGlobalContext();
  // const { initialData, isLoading, error, language } = globalState;
  const [app, setApp] = useState();
  const [pages, setPages] = useState();
  const [isOpen, setIsOpen] = useState(false); // Dropdown state
  const [isLoading, setIsLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState({
    customerService: false,
    information: false,
    tipsAndTricks: false,
  });
  const language = "en";

  // const app = initialData?.menu;
  // const pages = initialData?.menu?.buildmenu?.pages || [];

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const response = await axios.get("/services/buildMenu"); // Use your own API route
        const appData = response.data.data;
        setApp(appData);
        const pageData = appData.buildmenu.pages;
        setPages(pageData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error.message);
        setIsLoading(false);
      }
    };

    fetchFooter();
  }, []);

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

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const renderPages = (target) => {
    return pages
      ?.filter((page) => page.target === target)
      ?.map((page, index) => (
        <li key={index}>
          {page.link && page.link.length > 5 ? (
            page.linktarget === 1 ? (
              <Link href={"/"}>{page.page}</Link>
            ) : (
              <Link href={"/"} target="_blank" rel="noopener noreferrer">
                {page.page}
              </Link>
            )
          ) : (
            <Link href={"/"}>{page.page}</Link>
          )}
        </li>
      ));
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <>
      <section className="service-footer">
        <div className="container" style={{ minHeight: "150px" }}>
          <div className="row">
            {/* Customer Service Section */}
            <div className="col-xs-12 col-sm-6 col-md-5 col-md-offset-1 col-lg-3 col-lg-offset-0 collapsable">
              <b
                className={
                  expandedSections.customerService ? "is-expanded" : ""
                }
                onClick={() => toggleSection("customerService")}
              >
                Customer Service
              </b>
              <ul
                className={`pages ${
                  expandedSections.customerService ? "active" : ""
                }`}
              >
                {renderPages(1)}
              </ul>
            </div>

            {/* Information Section */}
            <div className="col-xs-12 col-sm-6 col-md-5 col-md-offset-1 col-lg-3 col-lg-offset-0 collapsable">
              <b
                className={expandedSections.information ? "is-expanded" : ""}
                onClick={() => toggleSection("information")}
              >
                Information
              </b>
              <ul
                className={`pages ${
                  expandedSections.information ? "active" : ""
                }`}
              >
                {renderPages(2)}
              </ul>
            </div>

            {/* Tips and Tricks Section */}
            <div className="col-xs-12 col-sm-6 col-md-5 col-md-offset-1 col-lg-3 col-lg-offset-0 collapsable">
              <b
                className={expandedSections.tipsAndTricks ? "is-expanded" : ""}
                onClick={() => toggleSection("tipsAndTricks")}
              >
                Tips and Tricks
              </b>
              <ul
                className={`pages ${
                  expandedSections.tipsAndTricks ? "active" : ""
                }`}
              >
                {renderPages(3)}
              </ul>
            </div>

            {/* Spacer */}
            {/* <div className="col-xs-12 hidden-lg spacer"></div> */}

            {/* Optional Shop Data Section */}
            {app?.shopdata?.adiv?.[1]?.[language]?.[82]?.content && (
              <div className="col-xs-12 col-sm-6 col-md-5 col-md-offset-1 col-lg-3 col-lg-offset-0 address">
                <div
                  dangerouslySetInnerHTML={{
                    __html: app?.shopdata?.adiv?.[1]?.[language]?.[82]?.content,
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="service-footer">
        <div className="container" style={{ minHeight: "50px" }}>
          <div className="row">
            <div className="col-xs-12">
              <ul className="list-unstyled tpglobal">
                {/* Init item */}
                <li className="init" onClick={toggleDropdown}>
                  TrailerPlus Global
                </li>

                {/* Dropdown items */}
                {[
                  {
                    country: "nl",
                    label: "TrailerPlus.nl",
                    url: "https://www.trailerplus.nl",
                  },
                  {
                    country: "fr",
                    label: "TrailerPlus.fr",
                    url: "https://www.trailerplus.fr",
                  },
                  {
                    country: "be",
                    label: "TrailerPlus.be",
                    url: "https://www.trailerplus.be",
                  },
                  {
                    country: "de",
                    label: "TrailerPlus.de",
                    url: "https://www.trailerplus.de",
                  },
                  {
                    country: "at",
                    label: "TrailerPlus.at",
                    url: "https://www.trailerplus.at",
                  },
                  {
                    country: "lu",
                    label: "TrailerPlus.lu",
                    url: "https://www.trailerplus.lu",
                  },
                  {
                    country: "gb",
                    label: "TrailerPlus.eu",
                    url: "https://www.trailerplus.eu",
                  },
                  {
                    country: "es",
                    label: "TrailerPlus.es",
                    url: "https://www.trailerplus.es",
                  },
                  {
                    country: "it",
                    label: "TrailerPlus.it",
                    url: "https://www.trailerplus.it",
                  },
                  {
                    country: "dk",
                    label: "TrailerPlus.dk",
                    url: "https://www.trailerplus.dk",
                  },
                  {
                    country: "cz",
                    label: "TrailerPlus.cz",
                    url: "https://www.trailerplus.cz",
                  },
                  {
                    country: "pl",
                    label: "TrailerPlus.pl",
                    url: "https://www.trailerplus.pl",
                  },
                  {
                    country: "se",
                    label: "TrailerPlus.se",
                    url: "https://www.trailerplus.se",
                  },
                  {
                    country: "si",
                    label: "TrailerPlus.si",
                    url: "https://www.trailerplus.si",
                  },
                  {
                    country: "fi",
                    label: "TrailerPlus.fi",
                    url: "https://www.trailerplus.fi",
                  },
                  {
                    country: "pt",
                    label: "TrailerPlus.pt",
                    url: "https://www.trailerplus.pt",
                  },
                  {
                    country: "sk",
                    label: "TrailerPlus.sk",
                    url: "https://www.trailerplus.sk",
                  },
                  {
                    country: "lt",
                    label: "TrailerPlus.lt",
                    url: "https://www.trailerplus.lt",
                  },
                  {
                    country: "ro",
                    label: "TrailerPlus.ro",
                    url: "https://www.trailerplus.ro",
                  },
                  {
                    country: "gr",
                    label: "TrailerPlus.gr",
                    url: "https://www.trailerplus.gr",
                  },
                  {
                    country: "lv",
                    label: "TrailerPlus.lv",
                    url: "https://www.trailerplus.lv",
                  },
                  {
                    country: "hu",
                    label: "TrailerPlus.hu",
                    url: "https://www.trailerplus.hu",
                  },
                  {
                    country: "bg",
                    label: "TrailerPlus.bg",
                    url: "https://www.trailerplus.bg",
                  },
                  {
                    country: "ee",
                    label: "TrailerPlus.ee",
                    url: "https://www.trailerplus.ee",
                  },
                  {
                    country: "hr",
                    label: "TrailerPlus.hr",
                    url: "https://www.trailerplus.hr",
                  },
                  {
                    country: "ch",
                    label: "TrailerPlus.ch",
                    url: "https://www.trailerplus.ch",
                  },
                  {
                    country: "in",
                    label: "TrailerPlus.in",
                    url: "https://www.trailerplus.in",
                  },
                ].map((item) => (
                  <li
                    key={item?.country}
                    className={isOpen ? "selected" : ""}
                    style={{ display: isOpen ? "block" : "none" }}
                  >
                    <span
                      className={`flag-icon flag-icon-${item?.country}`}
                    ></span>
                    <Link
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12 col-lg-push-8 col-lg-4">
              <ul className="terms_conditions">
                <li>
                  <Link href="/">terms and conditions</Link>
                </li>
                <li>
                  <span> | </span>
                </li>
                <li>
                  <Link href="/">privacy policy</Link>
                </li>
              </ul>
            </div>
            <div className="brand-column col-xs-12 col-lg-pull-4 col-lg-8">
              <div className="branding">
                <Link
                  rel="preload"
                  href="/"
                  as="image"
                  type="image/webp"
                  crossOrigin="anonymous"
                >
                  <Image
                    alt="trailer-plus-logo-footer.webp"
                    src="/images/trailer-plus-logo-footer.webp"
                    width={158}
                    height={30}
                    loading="lazy"
                  />
                </Link>

                <div
                  className="socials"
                  style={{ display: "inlineFlex", justifyContent: "center" }}
                >
                  <Link
                    href="https://www.linkedin.com/company/trailerplus-international/"
                    target="_blank"
                  >
                    <i className="fab fa-linkedin" aria-hidden="true"></i>
                  </Link>
                </div>

                <p>
                  &copy; 2004 - {new Date()?.getFullYear()} Trailerplus |
                  {
                    <Link
                      key={`ratting`}
                      href={"/"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {Array.from({
                        length:
                          trustedShop?.aggregaterating?.["365days"]?.rating,
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
                        Verified Reviews{" "}
                        {trustedShop?.aggregaterating?.["365days"]?.rating} / 5 
                        {" "}
                      </span>
                    </Link>
                  }
                  <span style={{ fontSize: "7px" }}>
                    <Link href="https://onetoshop.com/" target="_blank">
                      Onetoshop.com
                    </Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
