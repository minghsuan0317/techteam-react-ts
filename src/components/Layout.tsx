import { Box } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      {/* The top of the page */}
      <Header />

      {/* main content */}
      <Box flex="1">{children}</Box>

      {/* The bottom of the page */}
      <Footer />
    </Box>
  );
}
