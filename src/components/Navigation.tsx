import { HStack, Link, Text, Button, Spacer, Flex } from "@chakra-ui/react";
import NextLink from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [router.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    router.push("/");
  };

  return (
    <Flex align="center">
      {/* Logo button to the home page */}
      <Link as={NextLink} href="/" _hover={{ textDecoration: "none" }}>
        <Text fontWeight="bold" fontSize="lg">
          TeachTeam
        </Text>
      </Link>

      <Spacer />

      <HStack spacing={4}>
        {!user && (
          <>
            <Button as={NextLink} href="/signup" size="sm" variant="outline">
              Sign up
            </Button>
            <Button
              as={NextLink}
              href="/login"
              size="sm"
              color="white"
              bg="black"
              _hover={{ bg: "gray.700" }}
            >
              Log in
            </Button>
          </>
        )}

        {/* When Lecturer logging in */}
        {user?.role === "lecturer" && (
          <>
            <Link as={NextLink} href="/lecturer" fontSize="sm">
              Lecturer Dashboard
            </Link>
            <Button
              size="sm"
              onClick={handleLogout}
              color="white"
              bg="black"
              _hover={{ bg: "gray.700" }}
            >
              Logout
            </Button>
          </>
        )}

        {/* When Tutor logging in */}
        {user?.role === "tutor" && (
          <>
            <Link as={NextLink} href="/tutor" fontSize="sm">
              Tutor Dashboard
            </Link>
            <Button
              size="sm"
              onClick={handleLogout}
              color="white"
              bg="black"
              _hover={{ bg: "gray.700" }}
            >
              Logout
            </Button>
          </>
        )}
      </HStack>
    </Flex>
  );
}
