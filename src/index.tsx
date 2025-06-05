import {
    ColorModeScript,
    ChakraBaseProvider,
    extendBaseTheme,
    theme as chakraTheme,
} from "@chakra-ui/react";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";
import { RecoilRoot } from "recoil";
import { BrowserRouter as Router } from "react-router-dom";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(container);

const { Button, Container, Heading, Input, Tag, Tooltip } =
    chakraTheme.components;

const theme = extendBaseTheme({
    components: {
        Button,
        Container,
        Heading,
        Input,
        Tag,
        Tooltip,
    },
});

root.render(
    <React.StrictMode>
        <ColorModeScript />
        <RecoilRoot>
            <ChakraBaseProvider theme={theme}>
                <Router>
                    <App />
                </Router>
            </ChakraBaseProvider>
        </RecoilRoot>
    </React.StrictMode>
);

serviceWorker.unregister();
reportWebVitals();
