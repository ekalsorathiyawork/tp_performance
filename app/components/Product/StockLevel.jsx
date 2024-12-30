// import { useGlobalContext } from "@/app/context/GlobalContext";
import Link from "next/link";
import React from "react";

const StockLevel = ({ product }) => {
  // const { globalState } = useGlobalContext();
  // const { language } = globalState;
  const language = "en";
  const days = {
    1: "monday",
    2: "tuesday",
    3: "wednesday",
    4: "thursday",
    5: "friday",
    6: "saturday",
    7: "sunday",
  };

  let stockLevel = 6;
  if (
    product.localstock > product.threshold &&
    product.localstock > 0 &&
    product.suppliershipdays === 1 &&
    product.productstock >= product.minqty
  ) {
    stockLevel = 1;
  } else if (
    product.localstock > product.threshold &&
    product.localstock > 0 &&
    product.suppliershipdays > 1 &&
    product.productstock >= product.minqty
  ) {
    stockLevel = 3;
  } else if (
    product.localstock === 0 &&
    product.externalstock > 0 &&
    product.suppliershipdays === 1 &&
    product.productstock >= product.minqty
  ) {
    stockLevel = 2;
  } else if (
    product.localstock === 0 &&
    product.externalstock > 0 &&
    product.productstock >= product.minqty
  ) {
    stockLevel = 3;
  } else if (
    product.localstock <= 0 &&
    product.productstock >= product.minqty
  ) {
    stockLevel = 3;
  } else if (product.productstock === 0) {
    stockLevel = 4;
  } else if (product.productstock < 0 && product.productstock > -3) {
    stockLevel = 5;
  }

  const currentDay = new Date();
  let nextDayText = "";

  if (currentDay.getDay() < 5 && currentDay.getHours() < 15) {
    const nextDay = (currentDay.getDay() + 1) % 7;
    nextDayText = `${"before"} 15:00 ${"ordered"}, ${"tomorrow"} (${
      days[nextDay]
    }) ${"athome"}!`;
  } else if (currentDay.getDay() < 4 && currentDay.getHours() > 14) {
    const nextDay = (currentDay.getDay() + 2) % 7;
    nextDayText = `${"orderednow"}, ${"dayaftertomorrow"} (${
      days[nextDay]
    }) ${"athome"}!`;
  } else if (currentDay.getDay() === 4 && currentDay.getHours() > 14) {
    nextDayText = `${"orderednow"}, ${days[1]} ${"athome"}!`;
  } else if (currentDay.getDay() <= 5 && currentDay.getHours() < 15) {
    nextDayText = `${"before"} 15:00 ${"ordered"}, ${days[1]} ${"athome"}!`;
  } else {
    nextDayText = `${"orderednow"}, ${days[2]} ${"athome"}!`;
  }

  if (product.suppliers) {
    const supplier = product.suppliers[0];
    if (supplier && supplier.nextshipping) {
      if (supplier.nextshipping.nextday === 1) {
        nextDayText = `${"orderednow"}, ${
          days[supplier.nextshipping.shipping]
        } ${"athome"}!`;
      } else {
        const cutoff = supplier.nextshipping.cutoff || "12:00";
        if (cutoff === "12:00") {
          nextDayText = `Levering binnen 1~2 werkdagen`;
        } else if (language === "nl") {
          nextDayText = `${"before"} ${cutoff} ${"ordered"}, vandaag verstuurd`;
        } else {
          nextDayText = `${"before"} ${cutoff} ${"ordered"}, ${
            days[supplier.nextshipping.shipping]
          } ${"athome"}!`;
        }
      }
    }
  }

  const renderStockLevel = () => {
    switch (stockLevel) {
      case 1:
      case 2:
        return (
          <div>
            <p className="supplytime in-stock">
              <i
                className="fa fa-check-circle-o"
                style={{ color: "#70B038" }}
                aria-hidden="true"
              ></i>
              {"stock"}
            </p>
            <p className="delivery-method">{nextDayText}</p>
          </div>
        );
      case 3:
        return (
          <div>
            <p className="supplytime in-stock">
              <i
                className="fa fa-check-circle-o"
                style={{ color: "#70B038" }}
                aria-hidden="true"
              ></i>
              {"stock"}
            </p>
            <p className="delivery-method">
              {"deliverytime"} 1 - {product.suppliershipdays} {"businessdays"}
            </p>
          </div>
        );
      case 4:
        return (
          <div>
            <p className="supplytime in-stock">
              <i
                className="fa fa-exclamation-circle"
                style={{ color: "#ffa500" }}
                aria-hidden="true"
              ></i>
              {"nonstock"}
            </p>
            <p className="delivery-method delivery-not-in-stock">
              <Link
                onClick={() => {}}
                style={{ cursor: "pointer", textDecoration: "underline" }}
              >
                inquireavailability
              </Link>
              {product.stockdate > new Date() && <br />}
              {`${"expecteddeliverydate"} ${new Date(
                product.stockdate
              ).toLocaleDateString()}`}
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return <div className="stock-level">{renderStockLevel()}</div>;
};

export default StockLevel;
