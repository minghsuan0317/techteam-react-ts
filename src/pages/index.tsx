import { useState } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Text,
  Link as ChakraLink,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router"; // Import useRouter for navigation

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const router = useRouter(); // Initialize useRouter

  // Dummy data stored in localStorage
  if (typeof window !== "undefined") {
    localStorage.setItem(
      "dummyUser",
      JSON.stringify({ email: "test@example.com", password: "Password123!" })
    );
  }

  const handleSignin = (e: React.FormEvent) => {
    e.preventDefault();

    // Get the dummy user from localStorage
    const dummyUser = JSON.parse(localStorage.getItem("dummyUser") || "{}");

    // Email and password validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isPasswordStrong =
      password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password);

    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!isPasswordStrong) {
      toast({
        title: "Weak Password",
        description:
          "Password must be at least 8 characters long, include a number, and an uppercase letter.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Check if credentials match
    if (email === dummyUser.email && password === dummyUser.password) {
      toast({
        title: "Login Successful",
        description: "Welcome back!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Redirect to the tutor page
      router.push("/tutors"); // Use router.push for navigation
    } else {
      toast({
        title: "Invalid Credentials",
        description: "Email or password is incorrect.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="400px" mx="auto" mt="100px" p="20px" boxShadow="md" borderRadius="lg">
      <Text fontSize="2xl" fontWeight="bold" mb="4" textAlign="center">
        Sign In
      </Text>
      <form onSubmit={handleSignin}>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </FormControl>
        <FormControl id="password" isRequired mt="4">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </FormControl>
        <Button colorScheme="purple" type="submit" width="100%" mt="6">
          Login
        </Button>
      </form>
      <Text mt="4" textAlign="center">
        Don’t have an account?{" "}
        <ChakraLink href="/signup" color="blue.500">
          Register here
        </ChakraLink>
      </Text>

      {/* Placeholder for CAPTCHA */}
      <Box mt="4" textAlign="center">
        <Text color="gray.500">CAPTCHA Placeholder</Text>
      </Box>
    </Box>
  );
};

export default Signin;
