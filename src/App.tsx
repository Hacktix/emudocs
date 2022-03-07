import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Homepage from "./pages/Homepage/Homepage";
import EmudevBasics from "./pages/EmudevBasics/EmudevBasics";

import "./App.css";

export default function App() {
    return (
        <>
        <Header />
        <div className="MainContainer">
            <div className="AppContent">
                <Routes>
                    <Route path="/basics" element={<EmudevBasics />} />
                    <Route path="*" element={<Homepage />} />
                </Routes>
            </div>
        </div>
        </>
    );
}