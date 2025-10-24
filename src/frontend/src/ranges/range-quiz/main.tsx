import React from "react";
import { createRoot } from "react-dom/client";
import App, { AppProps } from "@/ranges/range-quiz/App";

const el = document.getElementById("root")!;
const dataEl = document.getElementById("initial-data")!;
const appProps: AppProps = dataEl ? JSON.parse(dataEl.textContent) : {};

createRoot(el).render(<App {...appProps} />);
