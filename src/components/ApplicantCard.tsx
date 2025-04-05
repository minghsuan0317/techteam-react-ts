// ApplicantCard show the pending applicant's details in lecturer page.
// It allows the lecturer to select, rank, and comment on the applicant.


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
      <Checkbox
        isChecked={applicant.isSelected || false}
        onChange={() => onToggle(applicant.id)}
        mb={2}
      >
        <Text fontWeight="bold" fontSize="lg">
          {`${applicant.firstName} ${applicant.lastName}`}
        </Text>
      </Checkbox>

      <Text fontWeight="bold">Availability: {applicant.availability}</Text>
      <Text>Academic Credentials: {applicant.academicCredentials}</Text>
      <Text>Previous Roles: {applicant.previousRoles || "N/A"}</Text>

      <Divider my={2} />
      <Text mb={1}>Skills:</Text>
      <Stack direction="row" flexWrap="wrap">
        {applicant.skills.split(",").map((skill) => {
          // Remove the space from the skill and use it as the key!
          const trimmed = skill.trim();
          return (
            <Tag key={trimmed} colorScheme="teal" mr={2} mb={1}>
              {trimmed}
            </Tag>
          );
        })}
      </Stack>

      {applicant.isSelected && (
        <>
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
