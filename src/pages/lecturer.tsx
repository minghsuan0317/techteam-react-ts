import { useState, useEffect } from "react";
import ApplicantCard from "../components/ApplicantCard";
import {
  Box,
  Button,
  Heading,
  Text,
  Select,
  Stack,
  Input,
  Checkbox,
} from "@chakra-ui/react";

// Applicant type definition
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

const courses = [
  { code: "COSC1010", name: "Database Concepts" },
  { code: "COSC1220", name: "Cloud Computing" },
  { code: "COSC1330", name: "Algorithms and Analysis" },
  { code: "COSC2020", name: "Data Structures" },
  { code: "COSC3030", name: "Full Stack Development" },
  { code: "COSC4040", name: "Artificial Intelligence" },
];

export default function LecturerPage() {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [selectedCourse, setSelectedCourse] = useState("ALL");
  const [searchAvailability, setSearchAvailability] = useState("");
  const [searchSkill, setSearchSkill] = useState("");
  const [searchName, setSearchName] = useState("");
  const [finalSelected, setFinalSelected] = useState<Applicant[]>([]);
  const [showPending, setShowPending] = useState(true);
  const [showConfirmed, setShowConfirmed] = useState(true);

  // When tha page open, read the data in localStorage
  useEffect(() => {
    const stored = localStorage.getItem("tutorApplications");
    if (stored) {
      setApplicants(JSON.parse(stored));
    }
  }, []);

  // Save the confirmed applicants to localStorage when it updates
  useEffect(() => {
    const selected = localStorage.getItem("finalSelected");
    if (selected) {
      setFinalSelected(JSON.parse(selected));
    }
  }, []);

  // Load the confirmed applicants from localStorage
  useEffect(() => {
    localStorage.setItem("finalSelected", JSON.stringify(finalSelected));
  }, [finalSelected]);

  // when applicants have modified, update data to localStorage immediately!
  useEffect(() => {
    localStorage.setItem("tutorApplications", JSON.stringify(applicants));
  }, [applicants]);

  // Toggle Selection
  // Toggle whether to select a specific applicant
  // this will be called when the checkbox is clicked
  const toggleSelect = (id: number) => {
    const updated = applicants.map((app) =>
      app.id === id ? { ...app, isSelected: !app.isSelected } : app
    );
    setApplicants(updated);
  };

  const applyFilters = (app: Applicant) => {
    const courseMatch =
      selectedCourse === "ALL" || app.course === selectedCourse;
    const availabilityMatch = searchAvailability
      ? app.availability === searchAvailability
      : true;
    const skillMatch = searchSkill
      ? app.skills.trim().toLowerCase().includes(searchSkill.toLowerCase())
      : true;
    const nameMatch = searchName.trim()
      ? `${app.firstName} ${app.lastName}`
          .toLowerCase()
          .includes(searchName.trim().toLowerCase())
      : true;

    return courseMatch && availabilityMatch && skillMatch && nameMatch;
  };

  // Update Ranking
  const updateRank = (id: number, rank: number) => {
    const updated = applicants.map((app) =>
      app.id === id ? { ...app, rank } : app
    );
    setApplicants(updated);
  };

  // Upadate comment
  const updateComment = (id: number, comment: string) => {
    const updated = applicants.map((app) =>
      app.id === id ? { ...app, comment } : app
    );
    setApplicants(updated);
  };

  // Confirm Selection
  const confirmSelection = (applicant: Applicant) => {
    if (!finalSelected.some((a) => a.id === applicant.id)) {
      setFinalSelected((prev) => [...prev, applicant]);

      const updatedApplicants = applicants.map((app) =>
        app.id === applicant.id ? { ...app, isSelected: true } : app
      );
      setApplicants(updatedApplicants);

      alert(`${applicant.firstName} ${applicant.lastName} has been confirmed!`);
    }
  };

  // Remove a tutor from the confirmed list
  const removeFromConfirmed = (id: number) => {
    const updatedFinal = finalSelected.filter((app) => app.id !== id);
    setFinalSelected(updatedFinal);

    const updatedApplicants = applicants.map((app) =>
      app.id === id ? { ...app, isSelected: false } : app
    );
    setApplicants(updatedApplicants);
  };

  const filteredApplicants = applicants.filter(
    (app) =>
      applyFilters(app) &&
      showPending &&
      !finalSelected.some((a) => a.id === app.id)
  );

  const filteredConfirmed = finalSelected
    .filter((app) => applyFilters(app) && showConfirmed)
    .sort((a, b) => (a.rank || 999) - (b.rank || 999));

  return (
    <Box maxW="800px" mx="auto" py={10} px={4}>
      <Heading as="h1" mb={6} textAlign="center">
        Lecturer Dashboard
      </Heading>

      <Text fontSize="md" mb={4} textAlign="center">
        Select a course to view and manage tutor applicants.
      </Text>

      <Select
        value={selectedCourse}
        onChange={(e) => setSelectedCourse(e.target.value)}
        mb={6}
      >
        <option value="ALL">All Courses</option>
        {courses.map((course) => (
          <option key={course.code} value={course.code}>
            {course.code} – {course.name}
          </option>
        ))}
      </Select>

      {/* Advanced Filter */}
      <Stack direction="row" spacing={4} mb={6} width="100%">
        {/* Availability Filter */}
        <Select
          placeholder="Availability"
          value={searchAvailability}
          onChange={(e) => setSearchAvailability(e.target.value)}
          width="auto"
          flex="1"
          fontWeight="semibold"
        >
          <option value="Part Time">Part Time</option>
          <option value="Full Time">Full Time</option>
        </Select>

        {/* Skill Filter */}
        <Input
          placeholder="Search skill"
          value={searchSkill}
          onChange={(e) => setSearchSkill(e.target.value.trim())}
          width="auto"
          flex="1"
          fontWeight="semibold"
        />

        {/* Name Filter */}
        <Input
          placeholder="Search tutor's name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value.trim())}
          width="auto"
          flex="1"
          fontWeight="semibold"
          w="350px"
        />

        {/* Status Filter */}
        <Stack direction="row" spacing={4} mb={4}>
          <Checkbox
            isChecked={showPending}
            onChange={() => setShowPending(!showPending)}
          >
            Pending
          </Checkbox>
          <Checkbox
            isChecked={showConfirmed}
            onChange={() => setShowConfirmed(!showConfirmed)}
          >
            Confirmed
          </Checkbox>
        </Stack>
      </Stack>

      {/* Empty message when no data */}
      {filteredApplicants.length === 0 && filteredConfirmed.length === 0 && (
        <Text color="gray.500">No applicants for this course.</Text>
      )}

      {/* Pending Application Card Display */}
      {filteredApplicants.length > 0 && (
        <Box mb={8}>
          <Heading size="md" mb={4}>
            Pending Applicants
          </Heading>
          {[...filteredApplicants]
            .sort((a, b) => (a.rank || 999) - (b.rank || 999))
            .map((applicant) => (
              <ApplicantCard
                key={applicant.id}
                applicant={applicant}
                onToggle={toggleSelect}
                onRankChange={updateRank}
                onCommentChange={updateComment}
                onConfirm={confirmSelection}
              />
            ))}
        </Box>
      )}

      {/* Confirmed Applicants Section */}
      {showConfirmed && finalSelected.length > 0 && (
        <Box mt={10}>
          <Heading size="md" mb={4}>
            Confirmed Applicants
          </Heading>

          {filteredConfirmed.map((applicant) => (
            <Box
              key={applicant.id}
              border="1px solid #ccc"
              borderRadius="md"
              p={4}
              mb={3}
              bg="gray.50"
            >
              <Text fontWeight="bold">
                {applicant.firstName} {applicant.lastName}
              </Text>
              <Text>Course: {applicant.course}</Text>
              <Text>Rank: {applicant.rank || "Not ranked"}</Text>
              <Text>Comment: {applicant.comment || "No comment"}</Text>
              <Box mt={2}>
                <Button
                  colorScheme="red"
                  size="sm"
                  mt={2}
                  onClick={() => removeFromConfirmed(applicant.id)}
                >
                  Remove
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
