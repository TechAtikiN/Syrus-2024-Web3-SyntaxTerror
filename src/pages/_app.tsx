import { ThemeProvider } from "@/components/theme-provider";
import Layout from "@/layout/Layout";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <ThirdwebProvider clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID} 
      activeChain={"mumbai"}
      authConfig={{
        domain: process.env.DOMAIN || "",
        authUrl: "/api/auth"
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </ThirdwebProvider>
    </ThemeProvider>
  );
}
