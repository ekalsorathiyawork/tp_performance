import Image from "next/image";
import Link from "next/link";
import React from "react";

const PropertyIcons = ({ product }) => {
  const allowedValues = [
    "4 x 100",
    "4 x 115",
    "5 x 112",
    "4 x 130",
    "5 x 140",
    "6 x 205",
    "161/205/6",
    "160/205/6",
    "LED",
    "Saris",
    "Henra",
    "Saris,Henra",
    "Henra,Saris",
  ];
  const propertyIds = [812, 4023, 927, 812, 1071, 4081, 7177, 8361];
  let property = null;

  // Determine the property that matches the conditions
  for (const propertyId of propertyIds) {
    const currentProperty = product.properties?.[propertyId];
    if (currentProperty && allowedValues.includes(currentProperty.value)) {
      property = currentProperty;
      break;
    }
  }

  if (!property || !allowedValues.includes(property.value)) {
    return null;
  }

  const imgSize = 75;
  const propertyValues = property.value.split(",");

  return (
    <div className="overlay firstpage_only">
      {property.propertyslug && property.valueslug && (
        <Link href={`/`}>
          {propertyValues.map((value, index) => {
            let imgSrc = "";
            let title = "";
            let alt = "";

            // Define image source, title, and alt based on property value
            switch (value.trim()) {
              case "4 x 100":
                imgSrc = "/images/4-x-100.png";
                title = "4 x 100";
                alt = "4 x 100";
                break;
              case "4 x 115":
                imgSrc = "/images/4-x-115.png";
                title = "4 x 115";
                alt = "4 x 115";
                break;
              case "5 x 112":
                imgSrc = "/images/5-x-112.png";
                title = "5 x 112";
                alt = "5 x 112";
                break;
              case "4 x 130":
                imgSrc = "/images/4-x-130.png";
                title = "4 x 130";
                alt = "4 x 130";
                break;
              case "5 x 140":
                imgSrc = "/images/5-x-140.png";
                title = "5 x 140";
                alt = "5 x 140";
                break;
              case "6 x 205":
              case "161/205/6":
              case "160/205/6":
                imgSrc = "/images/6x205x160.png";
                title = "6 x 205";
                alt = "6 x 205";
                break;
              case "LED":
                imgSrc = "/images/led.png";
                title = "LED";
                alt = "LED";
                break;
              case "Saris":
                imgSrc = "/images/saris.png";
                title = "Saris";
                alt = "Saris";
                break;
              case "Henra":
                imgSrc = "/images/henra.png";
                title = "Henra";
                alt = "Henra";
                break;
              default:
                return null;
            }

            return (
              <Image
                key={index}
                src={imgSrc}
                title={title}
                alt={alt}
                width={imgSize}
                height={imgSize}
              />
            );
          })}
        </Link>
      )}
    </div>
  );
};

export default PropertyIcons;
