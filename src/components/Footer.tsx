import { Box, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box bg="gray.100" py={6} textAlign="center">
      <Text fontSize="sm" fontWeight="medium">
        © 2025 TeachTeam – RMIT University
      </Text>
      <Text fontSize="xs" color="gray.600" mt={1}>
        For academic use only.
      </Text>
    </Box>
  );
};
