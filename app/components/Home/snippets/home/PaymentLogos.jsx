import Image from "next/image";
import Link from "next/link";

const PaymentLogos = () => {
  return (
    <>
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
    </>
  );
};

export default PaymentLogos;
