"use client";

import localFont from "next/font/local";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";

if (process.env.NODE_ENV === "development") {
  import("../../server/user").then(({ default: setupMocks }) => {
    setupMocks();
  });
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
