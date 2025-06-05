import { Box, Grid, Text } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Schedule from "./components/Schedule";
import Home from "./components/Home";

export const App = () => (
    <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
            <Routes>
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/" element={<Home />} />
                <Route
                    path="*"
                    element={<Text my="auto">Page not found.</Text>}
                />
            </Routes>
        </Grid>
    </Box>
);
