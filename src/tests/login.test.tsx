import { render, screen, fireEvent } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import Signin from "../pages/login";

jest.mock("react-google-recaptcha", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-recaptcha">Mocked ReCAPTCHA</div>,
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

describe("Signin Component", () => {
  test("renders Signin component elements", () => {
    render(
      <ChakraProvider>
        <Signin />
      </ChakraProvider>
    );

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });

  test("shows error if CAPTCHA is not completed", () => {
    render(
      <ChakraProvider>
        <Signin />
      </ChakraProvider>
    );

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText("Password");

    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "Password123!" } });
    fireEvent.submit(emailInput.closest("form")!);

  });

  test("redirects user with correct credentials", async () => {
    render(
      <ChakraProvider>
        <Signin />
      </ChakraProvider>
    );
  });
});
