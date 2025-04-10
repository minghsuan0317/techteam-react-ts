import { render, screen } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import ApplicantCard from "../components/ApplicantCard";
import userEvent from "@testing-library/user-event";


const dummyApplicant = {
  id: 1,
  firstName: "Ming",
  lastName: "Chen",
  course: "COSC1220",
  availability: "Full time",
  skills: "React, TypeScript",
  academicCredentials: "Master of IT",
  previousRoles: "Software Engineer",
  isSelected: true,
  rank: 1,
  comment: "Strong candidate",
};

test("renders applicant name", () => {
  render(
    <ChakraProvider>
      <ApplicantCard
        applicant={dummyApplicant}
        onToggle={() => {}}
        onRankChange={() => {}}
        onCommentChange={() => {}}
        onConfirm={() => {}}
      />
    </ChakraProvider>
  );

  expect(screen.getByText(/Ming Chen/i)).toBeInTheDocument();
});

test("renders applicant skills as tags", () => {
  render(
    <ChakraProvider>
      <ApplicantCard
        applicant={dummyApplicant}
        onToggle={() => {}}
        onRankChange={() => {}}
        onCommentChange={() => {}}
        onConfirm={() => {}}
      />
    </ChakraProvider>
  );

  expect(screen.getByText(/React/i)).toBeInTheDocument();
  expect(screen.getByText(/TypeScript/i)).toBeInTheDocument();
});


test("calls onRankChange when a rank is selected", async () => {
  const handleRankChange = jest.fn();

  render(
    <ChakraProvider>
      <ApplicantCard
        applicant={{ ...dummyApplicant, rank: undefined }}
        onToggle={() => {}}
        onRankChange={handleRankChange}
        onCommentChange={() => {}}
        onConfirm={() => {}}
      />
    </ChakraProvider>
  );

  const select = screen.getByRole("combobox");
  await userEvent.selectOptions(select, "3");

  expect(handleRankChange).toHaveBeenCalledWith(1, 3);
});


test("calls onConfirm when Confirm Selection button is clicked", () => {
  const handleConfirm = jest.fn();

  render(
    <ChakraProvider>
      <ApplicantCard
        applicant={dummyApplicant}
        onToggle={() => {}}
        onRankChange={() => {}}
        onCommentChange={() => {}}
        onConfirm={handleConfirm}
      />
    </ChakraProvider>
  );

  const button = screen.getByRole("button", { name: /Confirm Selection/i });
  button.click();

  expect(handleConfirm).toHaveBeenCalledWith(dummyApplicant);
});
