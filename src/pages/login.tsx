import { useState, FormEvent, useEffect } from "react";
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
import { useRouter } from "next/router";
import ReCAPTCHA from "react-google-recaptcha";
import { DEFAULT_USERS } from "../data/defaultData";

const Signin: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const toast = useToast();
  const router = useRouter();

  // Check if mock users are already in localStorage,
  // if not, set mock users from DEFAULT_USERS
  useEffect(() => {
    const existing = localStorage.getItem("users");
    if (!existing) {
      localStorage.setItem("users", JSON.stringify(DEFAULT_USERS));
    }
  }, []);

  const handleCaptcha = (token: string | null): void => {
    setCaptchaToken(token);
    console.log("CAPTCHA Token received:", token);
  };

  const handleSignin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!captchaToken) {
      toast({
        title: "CAPTCHA Required",
        description: "Please complete the CAPTCHA verification.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      console.log("Sending CAPTCHA token to the backend...");
      const res = await fetch("/api/verify-captcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: captchaToken }),
      });

      const data = await res.json();
      console.log("Backend verification response:", data);

      if (!data.success) {
        console.error("CAPTCHA verification failed:", data);
        toast({
          title: "CAPTCHA Verification Failed",
          description: "CAPTCHA verification did not pass.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
    } catch (error) {
      console.error("Error during CAPTCHA verification:", error);
      toast({
        title: "Error",
        description: "Failed to verify CAPTCHA.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = users.find(
      (user: any) => user.email === email && user.password === password
    );

    if (foundUser) {
      toast({
        title: "Login Successful",
        description: `Welcome back, ${foundUser.role}!`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      localStorage.setItem("currentUser", JSON.stringify(foundUser));

      if (foundUser.role === "lecturer") {
        router.push("/lecturer");
      } else {
        router.push("/tutor");
      }
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
    <Box maxW="md" mx="auto" mt={8} p={4} borderWidth={1} borderRadius="md">
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Sign In
      </Text>
      <form onSubmit={handleSignin}>
        <FormControl id="email" mb={4}>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" mb={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <ReCAPTCHA
          sitekey="6LdBgwsrAAAAAEVGPp79WK2DalwAKVfu38siGk10"
          onChange={handleCaptcha}
        />
        <Button type="submit" colorScheme="blue" width="full" mt={4}>
          Sign In
        </Button>
        <Text fontSize="sm" textAlign="center">
          Don’t have an account?{" "}
          <ChakraLink href="/signup" color="blue.500">
            Sign up
          </ChakraLink>
        </Text>
      </form>
    </Box>
  );
};

export default Signin;
