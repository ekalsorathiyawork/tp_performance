"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Show from "./icons/Show";
import StockLevel from "./StockLevel";

const ProductsGrid = ({ products, app }) => {
  const [randomNumber, setRandomNumber] = useState(0);
  const [vatRate, setVatRate] = useState(1); // Default VAT rate

  useEffect(() => {
    setRandomNumber(Math.floor(Math.random() * 10000) + 1);

    // VAT calculation logic based on provided conditions
    if (products?.myshopid === 250) {
      setVatRate(products.shopdata?.vathigh || 1);
    } else if (products?.myshopid === 4576 && products.userdata?.country) {
      const country = products.userdata.country.toUpperCase();
      setVatRate(products.shopdata?.oss?.[2]?.[country] || 1);
    } else {
      setVatRate(products.shopdata?.vathigh || 1);
    }
  }, [products]);

  if (!products || !products) return null;

  const pagelimit = 42;
  const showPager = products.length > pagelimit;

  return (
    <div
      className="row productview productview_main"
      id={`productview-${randomNumber}`}
    >
      {products.map((product, index) => {
        const page = Math.ceil((index + 1) / pagelimit);
        const column = 4;
        let productClass = "col-xs-6 col-sm-6 col-md-6 col-lg-3";

        if (column === 1) {
          productClass = "col-xs-12";
        } else if (column === 2) {
          productClass = "col-xs-12 col-sm-6";
        } else if (column === 3) {
          productClass = "col-xs-6 col-sm-6 col-md-6 col-lg-4";
        }

        const productLink = product.slug
          ? `/product/${product.slug}`
          : `/detail/${product.productid}/${product.productname
              .replace(/\s+/g, "-")
              .toLowerCase()}`;

        const productPrice = (
          product.pricenow *
          (products.userdata?.currencyrate || 1) *
          vatRate
        ).toFixed(2);

        return (
          <div
            key={product.productid}
            className={`product-${randomNumber} ${productClass} productcard ${
              showPager ? `pages page-${page}` : ""
            }`}
            id={`product-${product.productid}`}
            data-productcode={product.productcode}
            data-stars={parseFloat(product.stars).toFixed(2)}
            data-price={productPrice}
            style={showPager && page > 1 ? { display: "none" } : {}}
          >
            <div
              className="product"
              style={products.userdata?.level > 1 ? { height: "710px" } : {}}
            >
              <div className="row">
                <div className="col-xs-12">
                  {product.brand?.media?.id && (
                    <Link
                      href={`/`}
                      title={product.brand.media.name}
                      className="productbrand"
                    >
                      <Image
                        src={`https://www.trailerplus.eu/media/${product.brand.media.id}/100/${product.brand.media.name}`}
                        width="100"
                        height={
                          product.brand.media.imgsize
                            ? Math.round(
                                product.brand.media.imgsize.h /
                                  (product.brand.media.imgsize.w / 100)
                              )
                            : 0
                        }
                        alt={product.brand.media.alttag}
                        title={product.brand.media.titletag}
                        loading="lazy"
                        className="lazyload"
                      />
                    </Link>
                  )}

                  {product.productlabel ? (
                    <span
                      className="combideal"
                      style={
                        product.productlabelcolor
                          ? { background: product.productlabelcolor }
                          : {}
                      }
                    >
                      <i className="fa fa-gift" aria-hidden="true"></i>{" "}
                      {product.productlabel.split("&")[0]}
                    </span>
                  ) : product.bundle ? (
                    <Link href={`/`}>
                      <span
                        className="combideal"
                        style={{ cursor: "pointer", background: "#0282c5" }}
                      >
                        <i className="fa fa-gift" aria-hidden="true"></i>{" "}
                        Combodeal
                      </span>
                    </Link>
                  ) : null}

                  {product.properties && <Show product={product} />}

                  <Link href="/">
                    <div className="product-image">
                      {product.media ? (
                        <Image
                          src={`/images/small/${product.myshopid}/${
                            product.productid
                          }/${product.productname
                            .toLowerCase()
                            .replace(/\s+/g, "")
                            .replace(/[\+\|\/]+/g, "-")}.jpg`}
                          width="270"
                          height="270"
                          id={`img-${product.productid}`}
                          alt={product.productname}
                          loading="lazy"
                          className="lazyload"
                        />
                      ) : (
                        <Image
                          src="/assets/themes/trailerplus2/images/tp-placeholder.png"
                          width="280"
                          height="280"
                          id={`img-${product.productid}`}
                          alt={product.productname}
                          loading="lazy"
                          className="lazyload"
                        />
                      )}
                    </div>
                  </Link>
                </div>
              </div>

              <div className="row">
                <Link href="/">
                  <div className="col-xs-12">
                    <b className="h3p">{product.productname}</b>
                  </div>
                </Link>
              </div>

              <div className="row prb">
                <div className="col-xs-12">
                  <div className="rating">
                    {product.reviews
                      ? [...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`fa fa-star ${
                              i < Math.floor(product.reviews?.avgrate || 0)
                                ? "yellow"
                                : "grey"
                            }`}
                            aria-hidden="true"
                          ></i>
                        ))
                      : null}
                  </div>
                </div>
              </div>

              <div className="row pcb">
                <div className="col-xs-12">
                  <p className="article-number">
                    Product Code: {product.productcode}
                  </p>
                </div>
              </div>

              <div className="row ppb">
                <div className="col-xs-5">
                  <p className="old-price">
                    {products.userdata?.currencysign || "$"}
                    {product.price && parseFloat(product.price).toFixed(2)}
                  </p>
                </div>

                <div className="col-xs-7">
                  <p className="current-price">
                    {products.userdata?.currencysign || "$"}
                    {productPrice}
                  </p>
                </div>
              </div>

              <div className="row pab pad">
                <div className="col-xs-12">
                  <div className="order">
                    {product.variants ? null : product.productstock > 0 &&
                      product.productstock >= product.minqty ? (
                      <>
                        <input
                          title="quantity"
                          //  onChange="javascript:ChangeQuantity({{ product.productid }});"
                          onChange={() => {}}
                          className=""
                          type="number"
                          min="0"
                          max={product.productstock - app.shopdata.lowest_stock}
                          step={product.vpe}
                          data-minqty={product.minqty}
                          id={`{qty-${product.productid}}`}
                          value={
                            product.inorder == 0
                              ? product.minqty
                              : product.inorder
                          }
                        />
                        <button
                        // onClick="javascript:AddToCart({{ product.productid }}, $('#qty-{{ product.productid }}').val());"
                        >
                          Add to Cart
                        </button>
                      </>
                    ) : (
                      <div className="notonstock"></div>
                    )}
                  </div>
                </div>
              </div>

              <div className="row psb">
                <div className="col-xs-12">
                  <div className="supply">
                    <StockLevel product={product} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsGrid;
