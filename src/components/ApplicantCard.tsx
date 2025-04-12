/***************************************************************
 * Applicant Card Component
 *
 * This component shows one tutor applicant as a card in Lecturer.tsx.
 * This helps lecturer clearly see each applicant's info and take actions on them.
 *
 * We only show the extra form (ranking, comment, confirm button) if the applicant is selected.
 * This makes both UI and workflow clearer (select first, then rank/comment). *
 *
 * We also break skills into small tags
 * This makes it easier to read and understand.
 *
 * All interactions are passed as props.
 * This makes component stays simple and reusable.
 ***************************************************************/


import {
  Box,
  Text,
  Button,
  Checkbox,
  Divider,
  Stack,
  Tag,
  Select,
  Textarea,
} from "@chakra-ui/react";

// The data structure of applicants (some fields are optional)
type Applicant = {
  id: number;
  firstName: string;
  lastName: string;
  course: string;
  availability: string;
  skills: string;
  academicCredentials: string;
  previousRoles?: string;
  isSelected?: boolean;
  rank?: number;
  comment?: string;
};

type Props = {
  applicant: Applicant;
  onToggle: (id: number) => void;
  onRankChange: (id: number, rank: number) => void;
  onCommentChange: (id: number, comment: string) => void;
  onConfirm: (applicant: Applicant) => void;
};

export default function ApplicantCard({
  applicant,
  onToggle,
  onRankChange,
  onCommentChange,
  onConfirm,
}: Props) {
  return (
    <Box p={4} mb={4} borderRadius="md" boxShadow="sm">
      {/* Checkbox is placed at the top to make selection easy to see */}
      {/* When the checkbox is checked, the applicant is selected */}
      {/* The checkbox is controlled by the isSelected property of the applicant */}
      <Checkbox
        isChecked={applicant.isSelected || false}
        onChange={() => onToggle(applicant.id)}
        mb={2}
      >
        <Text fontWeight="bold" fontSize="lg">
          {`${applicant.firstName} ${applicant.lastName}`}
        </Text>
      </Checkbox>

      {/* basic info block: shows the course, availability, education...*/}
      <Text fontWeight="bold">Course: {applicant.course}</Text>
      <Text>Availability: {applicant.availability}</Text>
      <Text>Academic Credentials: {applicant.academicCredentials}</Text>
      <Text>Previous Roles: {applicant.previousRoles || "N/A"}</Text>

      <Divider my={2} />

      {/* show each skill as a small tag */}
      {/* skills are separated by commas and trimmed to remove the space */}
      {/* the tags are wrapped in a stack to make them responsive */}
      <Text mb={1}>Skills:</Text>
      <Stack direction="row" flexWrap="wrap">
        {applicant.skills.split(",").map((skill) => {
          const trimmed = skill.trim();
          return (
            <Tag key={trimmed} colorScheme="teal" mr={2} mb={1}>
              {trimmed}
            </Tag>
          );
        })}
      </Stack>

      {/* only show the form fields below if this applicant is selected */}
      {/* we hide them to keep the UI cleaner when not needed */}
      {applicant.isSelected && (
        <>
          {/* ranking dropdown: choose from 1 to 10 */}
          {/* comment box: lecturers can write notes (string) */}
          {/* both fields are optional */}
          <Box mt={4}>
            <Text mb={1} fontWeight="semibold">
              Rank this applicant
            </Text>
            <Select
              placeholder="Select rank"
              value={applicant.rank || ""}
              onChange={(e) =>
                onRankChange(applicant.id, Number(e.target.value))
              }
            >
              {[...Array(10)].map((_, i) => {
                const value = i + 1;
                return (
                  <option key={value} value={value}>
                    {value}
                  </option>
                );
              })}
            </Select>
          </Box>
          <Box mt={4}>
            <Text mb={1} fontWeight="semibold">
              Comments
            </Text>
            <Textarea
              placeholder="Write your feedback"
              value={applicant.comment || ""}
              onChange={(e) => onCommentChange(applicant.id, e.target.value)}
            />
          </Box>

          {/* confirm button: saves this applicant to confirmed list */}
          {/* the button will call the onConfirm function with the applicant */}
          <Button
            colorScheme="green"
            size="sm"
            mt={4}
            onClick={() => onConfirm(applicant)}
          >
            Confirm Selection
          </Button>
        </>
      )}
    </Box>
  );
}
