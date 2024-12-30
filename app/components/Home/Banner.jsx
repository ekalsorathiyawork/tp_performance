"use client";
import DOMPurify from "dompurify";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Banner = () => {
  const [app, setApp] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const language = "en";
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

  const content =
    app?.shopdata?.adiv?.[app?.shopdata?.siteid]?.[language]?.[112]?.content;
  
  const sanitizedContent = content
    ? typeof window !== "undefined"
      ? DOMPurify.sanitize(content)
      : content
    : "";

  return (
    <>
      <div className="hidden-xs" 
      style={{background: "url(/images/banner.webp)",
        backgroundSize: "cover",
        height: "300px",
        width: "100%",
        aspectRatio: "16 / 9"}}>
        <section className="banner">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-8 col-md-offset-2">
                <h2 style={{ textAlign: "center", color: "#fff" }}>
                  {
                    app?.shopdata?.adiv?.[app?.shopdata?.siteid]?.[
                      language
                    ]?.[112]?.label
                  }
                </h2>
                <div
                  dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                ></div>
              </div>
              <div className="col-xs-12 col-md-8 col-md-offset-2">
                <div className="row">
                  <div className="col-xs-12 col-sm-12 text-center">
                    <Link className="orange" href="/">
                      signup
                    </Link>
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

export default Banner;
