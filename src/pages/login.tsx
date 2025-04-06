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

const Signin: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const toast = useToast();
  const router = useRouter();

  // Dummy 資料存到 localStorage，僅用於測試
  if (typeof window !== "undefined") {
    localStorage.setItem(
      "dummyUser",
      JSON.stringify({ email: "test@example.com", password: "Password123!" })
    );
  }

  // 當 CAPTCHA 完成時會回呼此函式，接收回傳的 token
  const handleCaptcha = (token: string | null): void => {
    setCaptchaToken(token);
    console.log("CAPTCHA Token received:", token); // Debug: 記錄前端獲取的 CAPTCHA Token
  };

  // 表單送出時的處理函式
  const handleSignin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 若尚未取得 CAPTCHA token
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

    // 呼叫後端 API 驗證 CAPTCHA token
    try {
      console.log("Sending CAPTCHA token to the backend..."); // Debug
      const res = await fetch("/api/verify-captcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: captchaToken }),
      });

      // 檢查後端的響應
      const data = await res.json();
      console.log("Backend verification response:", data); // Debug: 記錄後端 API 響應

      if (!data.success) {
        console.error("CAPTCHA verification failed:", data); // Debug
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
      console.error("Error during CAPTCHA verification:", error); // Debug: 記錄錯誤細節
      toast({
        title: "Error",
        description: "Failed to verify CAPTCHA.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Dummy 使用者驗證邏輯
    const dummyUser = JSON.parse(localStorage.getItem("dummyUser") || "{}");
    if (email === dummyUser.email && password === dummyUser.password) {
      toast({
        title: "Login Successful",
        description: "Welcome back!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push("/tutors");
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
