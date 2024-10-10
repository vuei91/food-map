import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Food Map",
  description: "korea food map",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <head>
        <script
          type="text/javascript"
          src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`}
        ></script>
      </head>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
