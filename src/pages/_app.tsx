import "../styles/index.css";
import NProgress from "nprogress";

import { ChakraProvider } from "@chakra-ui/react";

import theme from "../theme";
import { AppProps } from "next/app";
import Navbar from "../components/Layout/Navbar";
import { Container } from "../components/Layout/Container";
import Footer from "../components/Layout/Footer";
import { adminRoutes, navRoutes } from "../utils/routes";
import Head from "next/head";
import { Router, useRouter } from "next/router";

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});
Router.events.on("routeChangeError", () => {
  NProgress.done();
});

function MyApp({ Component, pageProps }: AppProps) {
  const { asPath } = useRouter();

  const isAdminRoute = asPath.includes("admin");

  return (
    <ChakraProvider resetCSS theme={theme}>
      <Container minHeight="100vh">
        <Head>
          <title>Quality Feed & Garden Company</title>
        </Head>
        <Navbar routes={isAdminRoute ? adminRoutes : navRoutes} />
        <Component {...pageProps} />
      </Container>
      <Footer links={navRoutes} />
    </ChakraProvider>
  );
}

export default MyApp;
