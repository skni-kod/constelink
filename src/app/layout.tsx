import type { ReactNode } from "react";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";

import { environment } from "@/environment.mjs";

import { cx } from "@/utilities/classname";

import { Providers } from "./providers";

import "./style.css";

export type RootLayoutProps = {
  children?: ReactNode;
};

export const metadata: Metadata = {
  robots: {
    follow: false,
    googleBot: {
      follow: false,
      index: false,
      indexifembedded: false,
      "max-image-preview": "none",
      noarchive: true,
      nocache: true,
      noimageindex: true,
      nositelinkssearchbox: true,
      nosnippet: true,
      notranslate: true,
    },
    index: false,
    indexifembedded: false,
    "max-image-preview": "none",
    noarchive: true,
    nocache: true,
    noimageindex: true,
    nositelinkssearchbox: true,
    nosnippet: true,
    notranslate: true,
  },
  title: environment.NEXT_PUBLIC_APPLICATION_NAME,
};

const calSansSemibold = localFont({
  src: "./cal-sans-semibold.woff2",
  variable: "--font-cal-sans-semibold",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const RootLayout = ({ children }: RootLayoutProps) => (
  <html
    className={cx("scroll-smooth", calSansSemibold.variable, inter.variable)}
    lang="en"
    suppressHydrationWarning
  >
    <body className="flex min-h-screen flex-col selection:bg-sky-600">
      <Providers>{children}</Providers>
    </body>
  </html>
);

export default RootLayout;
