import { useMemo, useState, useEffect } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";

import ApplicantCard from "../components/ApplicantCard";

import {
  Box,
  Button,
  Heading,
  Text,
  Select,
  Stack,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Switch,
  Flex,
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

// custom Hook useApplicantStats
function useApplicantStats(applicants: Applicant[]) {
  return useMemo(() => {
    // 過濾出已被選擇且已有排名的申請人
    const selectedWithRank = applicants.filter(
      (app) => app.isSelected && typeof app.rank === "number"
    );

    let mostChosen: Applicant | null = null;
    let leastChosen: Applicant | null = null;

    if (selectedWithRank.length > 0) {
      // Assume that the smaller the rank number, the more favored it is.
      mostChosen = selectedWithRank.reduce((prev, curr) =>
        curr.rank! < prev.rank! ? curr : prev
      );
      leastChosen = selectedWithRank.reduce((prev, curr) =>
        curr.rank! > prev.rank! ? curr : prev
      );
    }

    const notSelected = applicants.filter((app) => !app.isSelected);

    return { mostChosen, leastChosen, notSelected };
  }, [applicants]);
}

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
  const [sortField, setSortField] = useState<string>("");

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

  const sortedApplicants = [...filteredApplicants].sort((a, b) => {
    if (!sortField) return 0;
    const aValue =
      a[sortField as keyof Applicant]?.toString().toLowerCase() || "";
    const bValue =
      b[sortField as keyof Applicant]?.toString().toLowerCase() || "";
    return aValue.localeCompare(bValue);
  });

  const filteredConfirmed = finalSelected
    .filter((app) => applyFilters(app) && showConfirmed)
    .sort((a, b) => (a.rank || 999) - (b.rank || 999));

  const { mostChosen, leastChosen, notSelected } = useApplicantStats(applicants);

  return (
    <Box maxW="800px" mx="auto" py={10} px={4}>
      <Heading as="h1" mb={6} textAlign="center">
        Lecturer Dashboard
      </Heading>

      <Text fontSize="md" mb={4} textAlign="center">
        Select a course to view and manage tutor applicants.
      </Text>

      <Stack direction="row" spacing={4} mb={6} width="100%">
        <Select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          width="auto"
          flex="1"
          fontWeight="semibold"
        >
          <option value="ALL">All Courses</option>
          {courses.map((course) => (
            <option key={course.code} value={course.code}>
              {course.code} – {course.name}
            </option>
          ))}
        </Select>

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
      </Stack>

      {/* Advanced Filter */}
      <Stack spacing={4} mb={6}>
        <Stack direction="row" spacing={4} mb={6} width="100%">
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
            placeholder="Search name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value.trim())}
            width="auto"
            flex="1"
            fontWeight="semibold"
          />

          {/* Sort the applicants’ list by course name and availability */}
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Sort by
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setSortField("course")}>Course</MenuItem>
              <MenuItem onClick={() => setSortField("availability")}>
                Availability
              </MenuItem>
            </MenuList>
          </Menu>

          {/* Status Filter */}
          <Flex gap={4} align="center">
            <Flex align="center" gap={2}>
              <Switch
                isChecked={showPending}
                onChange={() => setShowPending(!showPending)}
                colorScheme="blue"
                id="pending-switch"
              />
              <label htmlFor="pending-switch">Pending</label>
            </Flex>
            <Flex align="center" gap={2}>
              <Switch
                isChecked={showConfirmed}
                onChange={() => setShowConfirmed(!showConfirmed)}
                colorScheme="blue"
                id="confirmed-switch"
              />
              <label htmlFor="confirmed-switch">Confirmed</label>
            </Flex>
          </Flex>
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
          {sortedApplicants.map((applicant) => (
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
            Confirmed Applicants (Sorted by Rank)
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
      {/* Confirmed Applicants Section */}
      {showConfirmed && finalSelected.length > 0 && (
        <Box mt={10}>
        <Heading size="md" mb={4}>
          Visual Representation
        </Heading>


        <Box mb={3} p={4} border="1px solid #ccc" borderRadius="md" bg ="gray.50">
          <Box mb={2}>
            <Text>
              Most Chosen Applicant:{" "}
              {mostChosen
                ? `${mostChosen.firstName} ${mostChosen.lastName} (Rank: ${mostChosen.rank})`
                : "Not available"}
            </Text>
          </Box>
          <Box mb={2}>
            <Text>
              Least Chosen Applicant:{" "}
              {leastChosen
                ? `${leastChosen.firstName} ${leastChosen.lastName} (Rank: ${leastChosen.rank})`
                : "Not available"}
            </Text>
          </Box>
          <Box>
            <Text fontWeight="bold">Applicants Not Selected:</Text>
            {notSelected.length > 0 ? (
              notSelected.map((app) => (
                <Text key={app.id}>
                  {app.firstName} {app.lastName}
                </Text>
              ))
            ) : (
              <Text>None</Text>
            )}
          </Box>
        </Box>
    
    </Box>
  )}
    </Box>
  );
}