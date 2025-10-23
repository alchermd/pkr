import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const el = document.getElementById("root")!;
const dataEl = document.getElementById("initial-data")!;
const initialData = dataEl ? JSON.parse(dataEl.textContent) : {};

createRoot(el).render(<App initialData={initialData} />);
