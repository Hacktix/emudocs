import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Homepage from "./pages/Homepage/Homepage";

import "./App.css";

export default function App() {
    return (
        <div>
            <Header />
            <hr className="HeaderSeparator" />
            <div className="AppContent">
                <Routes>
                    <Route path="*" element={<Homepage />} />
                </Routes>
            </div>
        </div>
    );
}