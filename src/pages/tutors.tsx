import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import Layout from "../components/Layout"; // Import the Layout component

const Tutors = () => {
  const [availability, setAvailability] = useState("");
  const [skills, setSkills] = useState("");
  const [academicCredentials, setAcademicCredentials] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [previousRoles, setPreviousRoles] = useState("");
  const toast = useToast();

  const courses = [
    { code: "COSC1010", name: "Database Concepts" },
    { code: "COSC1220", name: "Cloud Computing" },
    { code: "COSC1330", name: "Algorithms and Analysis" },
    { code: "COSC2020", name: "Data Structures" },
    { code: "COSC3030", name: "Full Stack Development" },
    { code: "COSC4040", name: "Artificial Intelligence" },
  ];

  const handleApply = () => {
    if (!selectedCourse || !availability || !skills || !academicCredentials) {
      toast({
        title: "Incomplete Form",
        description: "Please fill out all fields to apply for a role.",
        status: "error",
        duration: 3000, // 3 seconds
        isClosable: true,
      });
      return;
    }

    toast({
      title: "Application Submitted",
      description: `You have successfully applied for ${selectedCourse}.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Layout>
      <Box maxW="600px" mx="auto" mt="50px" p="20px" boxShadow="md" borderRadius="lg">
        <Text fontSize="2xl" fontWeight="bold" mb="4" textAlign="center">
          Tutors Portal
        </Text>

        {/* Form */}
        <FormControl id="course" isRequired mb="4">
          <FormLabel>Course to Apply</FormLabel>
          <Select
            placeholder="Select a course"
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            {courses.map((course) => (
              <option key={course.code} value={course.code}>
                {course.code} - {course.name.charAt(0).toUpperCase() + course.name.slice(1)}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl id="availability" isRequired mb="4">
          <FormLabel>Availability</FormLabel>
          <Select
            placeholder="Select availability"
            onChange={(e) => setAvailability(e.target.value)}
          >
            <option value="Part Time">Part Time</option>
            <option value="Full Time">Full Time</option>
          </Select>
        </FormControl>

        <FormControl id="skills" isRequired mb="4">
          <FormLabel>Skills</FormLabel>
          <Textarea
            placeholder="List your skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </FormControl>

        <FormControl id="academicCredentials" isRequired mb="4">
          <FormLabel>Academic Credentials</FormLabel>
          <Textarea
            placeholder="Enter your academic credentials"
            value={academicCredentials}
            onChange={(e) => setAcademicCredentials(e.target.value)}
          />
        </FormControl>

        <FormControl id="previousRoles" mb="4">
          <FormLabel>Previous Roles</FormLabel>
          <Textarea
            placeholder="List any previous roles (optional)"
            value={previousRoles}
            onChange={(e) => setPreviousRoles(e.target.value)}
          />
        </FormControl>

        <Button
          colorScheme="purple"
          width="100%"
          mt="6"
          onClick={handleApply}
        >
          Apply
        </Button>
      </Box>
    </Layout>
  );
};

export default Tutors;
