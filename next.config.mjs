/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https", // Use "https" if your external host uses it
          hostname: "www.trailerplus.eu",
          port: "", // Leave empty if no specific port is needed
          pathname: "/**", // Define the path to allow all or specify a specific path
        },
      ],
    },
    productionBrowserSourceMaps: false,
  };
  
  export default nextConfig;
  