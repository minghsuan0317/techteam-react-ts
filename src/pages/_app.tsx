import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}
