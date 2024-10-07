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
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
