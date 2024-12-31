import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";

export const metadata = {
  title: "Trailer Plus",
  description: "Created with Next.js",
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          as="style"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <SpeedInsights/>
      </body>
      
    </html>
  );
}
