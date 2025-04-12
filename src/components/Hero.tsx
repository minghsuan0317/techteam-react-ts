import { Box, Heading, Text, Stack } from "@chakra-ui/react";

// The big topic area at the top of the homepage
export default function Hero() {
  return (
    <Box bg="brand.500" color="white" py={20} textAlign="center">
      <Stack spacing={4}>

        {/* main title */}
        <Heading size="2xl">Welcome to TeachTeam</Heading>

        {/* sub title */}
        <Text fontSize="lg">
          Bring real-world insight into classrooms and shape future learners.
        </Text>
      </Stack>
    </Box>
  );
};
