import { HStack, Link, Text, Button, Spacer, Flex } from "@chakra-ui/react";
import NextLink from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const router = useRouter(); // Get router instance

  // Monitor path and update login state
  useEffect(() => {
    if (router.pathname === "/tutors") {
      setIsLoggedIn(true); // Assume user is logged in if on tutors page
    }
  }, [router.pathname]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    router.push("/"); // Redirect to main page
  };

  return (
    <Flex align="center">
      {/* Left side: Website Name */}
      <Link as={NextLink} href="/" _hover={{ textDecoration: "none" }}>
        <Text fontWeight="bold" fontSize="lg">TeachTeam</Text>
      </Link>

      {/* Middle: Navigation menu */}
      <HStack spacing={6} ml={10}>
        <Link as={NextLink} href="/" fontSize="sm">Home</Link>
        <Link as={NextLink} href="/about" fontSize="sm">About</Link>
        <Link as={NextLink} href="/courses" fontSize="sm">Courses</Link>
      </HStack>

      <Spacer />

      {/* Right side: Login/Logout */}
      <HStack spacing={4}>
        <Button as={NextLink} href="/signup" size="sm" variant="outline">Sign up</Button>
        {isLoggedIn ? (
          <Button
            size="sm"
            color="white"
            bg="black"
            _hover={{ bg: "gray.700" }}
            borderRadius="md"
            onClick={handleLogout}
          >
            Logout
          </Button>
        ) : (
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
        )}
      </HStack>
    </Flex>
  );
}
