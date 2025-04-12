import { DEFAULT_APPLICATIONS } from "../data/defaultData";
import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Select,
  Text,
  Textarea,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Tutor = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [availability, setAvailability] = useState("");
  const [skills, setSkills] = useState("");
  const [academicCredentials, setAcademicCredentials] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [previousRoles, setPreviousRoles] = useState("");
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (!storedUser) {
      router.push("/login");
      return;
    }

    try {
      const user = JSON.parse(storedUser);
      if (user.role !== "tutor") {
        console.error("You are not authorized to access this page.");
        router.push("/login");
      }
    } catch (error) {
      console.error("Invalid user data in localStorage");
      router.push("/login");
    }
  }, [router]);

  // Check if the mock tutor applications already in localStorage
  // if not, set mock applications from DEFAULT_APPLICATIONS
  useEffect(() => {
    const stored = localStorage.getItem("tutorApplications");
    if (!stored) {
      localStorage.setItem(
        "tutorApplications",
        JSON.stringify(DEFAULT_APPLICATIONS)
      );
    }
  }, []);

  const courses = [
    { code: "COSC1010", name: "Database Concepts" },
    { code: "COSC1220", name: "Cloud Computing" },
    { code: "COSC1330", name: "Algorithms and Analysis" },
    { code: "COSC2020", name: "Data Structures" },
    { code: "COSC3030", name: "Full Stack Development" },
    { code: "COSC4040", name: "Artificial Intelligence" },
  ];

  const handleApply = () => {
    if (
      !firstName ||
      !lastName ||
      !selectedCourse ||
      !availability ||
      !skills ||
      !academicCredentials
    ) {
      toast({
        title: "Incomplete Form",
        description: "Please fill out all fields to apply for a role.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const applicationData = {
      id: Date.now(), // Use timestamp as a unique ID
      firstName,
      lastName,
      course: selectedCourse,
      availability,
      skills,
      academicCredentials,
      previousRoles,
    };

    if (typeof window !== "undefined") {
      const existingApplications = JSON.parse(
        localStorage.getItem("tutorApplications") || "[]"
      );
      existingApplications.push(applicationData);
      localStorage.setItem(
        "tutorApplications",
        JSON.stringify(existingApplications)
      );
    }

    toast({
      title: "Application Submitted",
      description: `You have successfully applied for ${selectedCourse}.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    // Reset all input fields
    setFirstName("");
    setLastName("");
    setSelectedCourse("");
    setAvailability("");
    setSkills("");
    setAcademicCredentials("");
    setPreviousRoles("");
  };

  return (
    <Box
      maxW="600px"
      mx="auto"
      mt="50px"
      p="20px"
      boxShadow="md"
      borderRadius="lg"
    >
      <Text fontSize="2xl" fontWeight="bold" mb="4" textAlign="center">
        Tutor Portal
      </Text>

      <FormControl id="firstName" isRequired mb="4">
        <FormLabel>First Name</FormLabel>
        <Input
          placeholder="Enter your first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </FormControl>

      <FormControl id="lastName" isRequired mb="4">
        <FormLabel>Last Name</FormLabel>
        <Input
          placeholder="Enter your last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </FormControl>

      <FormControl id="course" isRequired mb="4">
        <FormLabel>Course to Apply</FormLabel>
        <Select
          placeholder="Select a course"
          value={selectedCourse} // Set the value to the selected course (resetting to default)
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          {courses.map((course) => (
            <option key={course.code} value={course.code}>
              {course.code} -{" "}
              {course.name.charAt(0).toUpperCase() + course.name.slice(1)}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl id="availability" isRequired mb="4">
        <FormLabel>Availability</FormLabel>
        <Select
          placeholder="Select availability"
          value={availability} // Set the value to the selected availability (resetting to default)
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

      <Button colorScheme="purple" width="100%" mt="6" onClick={handleApply}>
        Apply
      </Button>
    </Box>
  );
};

export default Tutor;
