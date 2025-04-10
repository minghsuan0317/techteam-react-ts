import NextLink from "next/link";
import {
  Box,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

export default function Main() {
  return (
    <Box px={6} py={12} >
      {/* Use SimpleGrid to make two columns
      it will automatically change to one column on mobile) */}
      <SimpleGrid columns={[1, null, 2]} spacing={10} maxW="1200px" mx="auto">
        {/* Tutor Card */}
        <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
          <Stack spacing={4}>
            <Heading size="md">Tutor</Heading>
            <Text>Apply to become a tutor by submitting your profile:</Text>
            <UnorderedList spacing={2}>
              <ListItem>Availability & skills</ListItem>
              <ListItem>Academic background</ListItem>
              <ListItem>Past teaching experience</ListItem>
              <ListItem>Easy online form submission</ListItem>
            </UnorderedList>
          </Stack>
        </Box>

        {/* Lecturer Card */}
        <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
          <Stack spacing={4}>
            <Heading size="md">Lecturer</Heading>
            <Text>
              Manage tutor applications and make decisions:
            </Text>
            <UnorderedList spacing={2}>
              <ListItem>Review applicant details</ListItem>
              <ListItem>Filter by course, availability & skills</ListItem>
              <ListItem>Assign ranking & write feedback</ListItem>
              <ListItem>Confirm your tutor selections</ListItem>
            </UnorderedList>
          </Stack>
        </Box>
      </SimpleGrid>
    </Box>
  );
}
