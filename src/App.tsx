import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Homepage from "./pages/Homepage/Homepage";
import EmudevBasics from "./pages/EmudevBasics/EmudevBasics";
import SpaceInvaders from "./pages/Arcade/SpaceInvaders/SpaceInvaders";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

const wrapPage = (Component: Function) => <div className="Page"><Component/></div>

export default function App() {
    return (
        <>
        <Header />
        <div className="MainContainer">
            <Routes>
                <Route path="/basics" element={wrapPage(EmudevBasics)} />
                <Route path="/arcade/spaceinvaders" element={wrapPage(SpaceInvaders)} />
                <Route path="*" element={wrapPage(Homepage)} />
            </Routes>
        </div>
        <ScrollToTop />
        </>
    );
}