import { ChakraProvider } from "@chakra-ui/react";

import theme from "../theme";
import { AppProps } from "next/app";
import Navbar from "../components/Layout/Navbar";
import { Container } from "../components/Layout/Container";
import Footer from "../components/Layout/Footer";
import { navRoutes } from "../utils/routes";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Container minHeight="100vh">
        <Head>
          <title>Quality Feed & Garden Company</title>
        </Head>
        <Navbar />
        <Component {...pageProps} />
        <Footer links={navRoutes} />
      </Container>
    </ChakraProvider>
  );
}

export default MyApp;
