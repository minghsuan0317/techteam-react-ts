import { HStack, Link, Text, Button, Spacer, Flex } from "@chakra-ui/react";
import NextLink from "next/link";

export default function Navbar() {
  return (
    // Flex layout: left and right side content
    <Flex align="center">

      {/* Left side: Website Name */}
      <Link as={NextLink} href="/" _hover={{ textDecoration: "none" }}>
        <Text fontWeight="bold" fontSize="lg">
          TeachTeam
        </Text>
      </Link>

      {/* Middle: Navigation menu items  */}
      <HStack spacing={6} ml={10}>
        <Link as={NextLink} href="/" fontSize="sm">
          Home
        </Link>
        <Link as={NextLink} href="/about" fontSize="sm">
          About
        </Link>
        <Link as={NextLink} href="/courses" fontSize="sm">
          Courses
        </Link>
      </HStack>

      <Spacer />

      {/* Right side: log in/ sign up  */}
      <HStack spacing={4}>
        {/* Linked to sign up page */}
        <Button as={NextLink} href="/signup" size="sm" variant="outline">
          Sign up
        </Button>

        {/* Linked to log in page */}
        <Button
          as={NextLink}
          href="/login"
          size="sm"
          color="white"
          bg="black"
          _hover={{ bg: "gray.700" }}
          borderRadius="md"
        >
          Log in
        </Button>
      </HStack>
    </Flex>
  );
};
