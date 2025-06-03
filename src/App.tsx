import { Box, Grid } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

export const App = () => (
    <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
            <Routes>
                <Route path="/page" element={<>A page</>} />
                <Route path="/" element={<>Home</>} />
                <Route path="*" element={<>Not found</>} />
            </Routes>
        </Grid>
    </Box>
);
