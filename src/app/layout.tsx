"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { QueryClient, QueryClientProvider } from "react-query";
import GlobalStyles from "./styles/GlobalStyles";
import Header from "./components/molecules/header";
import Sidebar from "./components/molecules/sidebar";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <body className={inter.className}>
          <Header />
          <div className="container">{children}</div>
        </body>
      </QueryClientProvider>
    </html>
  );
}
