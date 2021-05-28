import { ChakraProvider } from "@chakra-ui/react";

import theme from "../theme";
import { AppProps } from "next/app";
import Navbar from "../components/Layout/Navbar";
import { Container } from "../components/Layout/Container";
import Footer from "../components/Layout/Footer";
import { adminRoutes, navRoutes } from "../utils/routes";
import Head from "next/head";
import { useRouter } from "next/dist/client/router";

function MyApp({ Component, pageProps }: AppProps) {
  const { asPath } = useRouter();

  const isAdminRoute = asPath.includes("admin");

  console.log(asPath);

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
