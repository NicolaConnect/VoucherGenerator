import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {SWRConfig} from "swr";
import Home from "./Pages/Home.jsx";

console.dev = (type, content) => {
    console.log("%c" + type, "background: blue; color: white; display: block;", content);
}

export default function App() {
    const fetcher = (resource, init) => {
        init = init || {};

        if (resource.includes("undefined")) {
            console.error("Fetcher", "Trying to fetch undefined resource", resource);
            return;
        }

        return fetch(resource, {
            ...init,
            headers: {
                ...init.headers,
                "Accept": "application/json",
                "Authorization": localStorage.getItem("token") ? "Bearer " + localStorage.getItem("token") : null,
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            }
        })
            .then(response => response.json());
    };

    return (
        <SWRConfig
            value={{
                refreshInterval: 5000,
                fetcher
            }}
        >
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<>Non trovato.</>} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </SWRConfig>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
