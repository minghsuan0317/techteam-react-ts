import { useState, FormEvent } from "react";
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

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const toast = useToast();
  const router = useRouter();

  const handleCaptcha = (token: string | null): void => {
    setCaptchaToken(token);
    console.log("CAPTCHA Token received:", token);
  };

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email Format",
        description: "Please enter a valid email address.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Validate password strength
    const strongPasswordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!strongPasswordRegex.test(password)) {
      toast({
        title: "Weak Password",
        description:
          "Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Check CAPTCHA token
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

    // Check password match
    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "The passwords do not match. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      // Verify CAPTCHA token with backend
      const res = await fetch("/api/verify-captcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: captchaToken }),
      });

      const data = await res.json();
      if (!data.success) {
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
      toast({
        title: "Error",
        description: "Failed to verify CAPTCHA.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Store user data (for demo purposes only)
    localStorage.setItem("users", JSON.stringify({ email, password }));

    // Show success message
    toast({
      title: "Account Created",
      description: "Your account has been successfully created!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    // Redirect to the signin page
    router.push("/signin");
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={4} borderWidth={1} borderRadius="md">
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Sign Up
      </Text>
      <form onSubmit={handleSignup}>
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
        <FormControl id="confirmPassword" mb={4}>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormControl>
        <ReCAPTCHA
          sitekey="6LdBgwsrAAAAAEVGPp79WK2DalwAKVfu38siGk10"
          onChange={handleCaptcha}
        />
        <Button type="submit" colorScheme="blue" width="full" mt={4}>
          Sign Up
        </Button>
        <Text fontSize="sm" textAlign="center" mt={2}>
          Already have an account?{" "}
          <ChakraLink href="/signin" color="blue.500">
            Sign in
          </ChakraLink>
        </Text>
      </form>
    </Box>
  );
};

export default Signup;
