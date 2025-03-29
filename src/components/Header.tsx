import { Box } from "@chakra-ui/react";
import Navbar from "./Navigation";

export default function Header() {
  return (
    <Box bg="white" px={6} py={3} boxShadow="sm">
      <Navbar />
    </Box>
  );
};
