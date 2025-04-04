import { useState, useEffect } from "react";
import ApplicantCard from "../components/ApplicantCard";
import { Box, Heading, Text, Select, Stack, Input } from "@chakra-ui/react";

// Applicant type definition
type Applicant = {
  id: number;
  name: string;
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
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // asc or desc
  const [finalSelected, setFinalSelected] = useState<Applicant[]>([]);

  // When tha page open, read the data in localStorage
  useEffect(() => {
    const stored = localStorage.getItem("applicantsData");
    if (stored) {
      setApplicants(JSON.parse(stored));
    }
  }, []);

  // when applicants have modified, update data to localStorage immediately
  useEffect(() => {
    localStorage.setItem("applicantsData", JSON.stringify(applicants));
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
    }
  };

  const filteredApplicants = applicants.filter((app) => {
    const courseMatch =
      selectedCourse === "ALL" || app.course === selectedCourse;
    const availabilityMatch = searchAvailability
      ? app.availability === searchAvailability
      : true;
    const skillMatch = searchSkill
      ? app.skills.toLowerCase().includes(searchSkill.toLowerCase())
      : true;
    const nameMatch = searchName
      ? app.name?.toLowerCase().includes(searchName.toLowerCase())
      : true;

    return courseMatch && availabilityMatch && skillMatch && nameMatch;
  });

  // sorting logic
  const sortedApplicants = [...filteredApplicants].sort((a, b) => {
    if (!sortField) return 0;
    const aValue =
      a[sortField as keyof Applicant]?.toString().toLowerCase() || "";
    const bValue =
      b[sortField as keyof Applicant]?.toString().toLowerCase() || "";

    if (sortOrder === "asc") {
      return aValue.localeCompare(bValue);
    }
    return bValue.localeCompare(aValue);
  });

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
      <Stack direction="row" spacing={4} wrap="wrap" mb={6} width="100%">
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
          onChange={(e) => setSearchSkill(e.target.value)}
          width="auto"
          flex="1"
          fontWeight="semibold"
        />

        {/* Name Filter */}
        <Input
          placeholder="Search tutor's name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          width="auto"
          flex="1"
          fontWeight="semibold"
          w="350px"
        />
      </Stack>



      {/* Application Card Display */}
      {filteredApplicants.length === 0 ? (
        <Text color="gray.500">No applicants for this course.</Text>
      ) : (
        sortedApplicants.map((applicant) => (
          <ApplicantCard
            key={applicant.id}
            applicant={applicant}
            onToggle={toggleSelect}
            onRankChange={updateRank}
            onCommentChange={updateComment}
            onConfirm={confirmSelection}
          />
        ))
      )}
    </Box>
  );
}
