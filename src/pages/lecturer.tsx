import Layout from "../components/Layout";
import { Box, Heading, Text } from "@chakra-ui/react";

export default function LecturerPage() {
    return (
    <Layout>
        <Box maxW="800px" mx="auto" py={10} px={4} textAlign="center">
        <Heading as="h1" mb={4}>
            Welcome to Lecturer Dashboard
        </Heading>
        <Text fontSize="md">
            Here you can review tutor applications and manage feedback.
        </Text>
        </Box>
    </Layout>
    );
    }
