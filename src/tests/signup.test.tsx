import { render, screen, fireEvent } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import Signup from "../pages/signup";

jest.mock("react-google-recaptcha", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-recaptcha">Mocked ReCAPTCHA</div>,
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

const dummyUserValid = {
  email: "test@example.com",
  password: "StrongP@ssw0rd",
  confirmPassword: "StrongP@ssw0rd",
};

const dummyUserInvalid = {
  email: "invalid-email",
  password: "123",
  confirmPassword: "123",
};

describe("Signup Component", () => {
  test("renders Signup component elements", () => {
    render(
      <ChakraProvider>
        <Signup />
      </ChakraProvider>
    );

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
  });

  test("shows error for invalid email format", () => {
    render(
      <ChakraProvider>
        <Signup />
      </ChakraProvider>
    );

    const emailInput = screen.getByLabelText(/email address/i);

    fireEvent.change(emailInput, { target: { value: dummyUserInvalid.email } });
    fireEvent.submit(emailInput.closest("form")!);
  });

  test("shows error for weak password", () => {
    render(
      <ChakraProvider>
        <Signup />
      </ChakraProvider>
    );

    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

    fireEvent.change(passwordInput, { target: { value: dummyUserInvalid.password } });
    fireEvent.change(confirmPasswordInput, { target: { value: dummyUserInvalid.confirmPassword } });
    fireEvent.submit(passwordInput.closest("form")!);

  });

  test("success for valid form submission", () => {
    render(
      <ChakraProvider>
        <Signup />
      </ChakraProvider>
    );

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

    fireEvent.change(emailInput, { target: { value: dummyUserValid.email } });
    fireEvent.change(passwordInput, { target: { value: dummyUserValid.password } });
    fireEvent.change(confirmPasswordInput, { target: { value: dummyUserValid.confirmPassword } });
    fireEvent.submit(emailInput.closest("form")!);

  });
});
