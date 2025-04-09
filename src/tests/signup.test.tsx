import { render, screen, fireEvent } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import Signup from "../pages/signup";

test("renders signup form and handles password mismatch validation", async () => {
  render(
    <ChakraProvider>
      <Signup />
    </ChakraProvider>
  );

  // Find input fields
  const emailInput = screen.getByLabelText(/email address/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
  const submitButton = screen.getByRole("button", { name: /sign up/i });

  // Simulate user input
  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "Password123!" } });
  fireEvent.change(confirmPasswordInput, { target: { value: "Password1234!" } });

  // Click the submit button
  fireEvent.click(submitButton);

  // Expect an error toast or message to be rendered
  const toast = await screen.findByText(/the passwords do not match/i);
  expect(toast).toBeInTheDocument();
});
