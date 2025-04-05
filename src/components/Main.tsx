import NextLink from "next/link";
import {
  Box,
  Button,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";

export default function Main() {
  return (
    <Box px={6} py={12} bg="gray.50">
      <Heading as="h2" size="xl" mb={8} textAlign="center">
        Get started.
      </Heading>

      {/* Use SimpleGrid to make two columns
      it will automatically change to one column on mobile) */}
      <SimpleGrid columns={[1, null, 2]} spacing={10} maxW="1200px" mx="auto">
        {/* Tutor Card */}
        <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
          <Stack spacing={4}>
            <Heading size="md">Tutor</Heading>
            <NextLink href="/login" passHref>
              <Button colorScheme="blue" width="fit-content">
                Let's go
              </Button>
            </NextLink>
            <Text fontSize="sm">
              for applicants who want to become casual tutors. Fill in your
              background, skills, and availability.
            </Text>
          </Stack>
        </Box>

        {/* Lecturer Card */}
        <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
          <Stack spacing={4}>
            <Heading size="md">Lecturer</Heading>
            <NextLink href="/login" passHref>
              <Button colorScheme="blue" width="fit-content">
                Let's go
              </Button>
            </NextLink>
            <Text fontSize="sm">
              for lecturers to review applicants, leave comments, and manage
              tutor selections.
            </Text>
          </Stack>
        </Box>
      </SimpleGrid>
    </Box>
  );
}
