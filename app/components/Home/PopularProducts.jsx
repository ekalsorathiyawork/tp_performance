"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductsGrid from "../Product/ProductView";

const PopularProducts = () => {
  const [app, setApp] = useState({});
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const response = await axios.get("/services/buildMenu"); // Use your API route
        const appData = response.data.data;

        if (appData && typeof appData === 'object') {
          // Prevent unnecessary updates if the data hasn't changed
          if (app?.homepage?.populairproducts !== appData?.homepage?.populairproducts) {
            setApp(appData);
          } else {
            console.log("No change in app data. Skipping state update.");
          }
        } else {
          console.error("Unexpected appData format:", appData);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error.message);
        setIsLoading(false);
      }
    };

    fetchFooter();
  }, []);

  const popularProductIds = app?.homepage?.populairproducts || [];

  useEffect(() => {
    if (!popularProductIds || popularProductIds.length === 0) return;

    const fetchProducts = async () => {
      try {
        const response = await fetch("/data/popularProducts.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const allProducts = Object.values(data.data);
        const filteredProducts = allProducts.filter(product =>
          popularProductIds.includes(product.productid)
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };

    fetchProducts();
  }, [popularProductIds]);

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  return (
    <section className="productsv2 light popularproducts">
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <h2 className="below-frame">Featured products TrailerPlus</h2>
          </div>
        </div>

        <div id="popularproducts" style={{ height: "94px" }}>
          <strong id="productcount">
            <b>{products.length}</b>
            <strong> Results</strong>
          </strong>
          <ProductsGrid products={products} app={app} />
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;
