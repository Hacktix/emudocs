
import "./Header.css";
import Banner from "../../assets/images/emudocs-banner.png";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <div className="AppHeader">
            <Link to="/">
                <img className="AppBanner" src={Banner} alt="Emudocs" />
            </Link>
            <div>
                { /* This is where navigation buttons will go once I have any */ }
            </div>
        </div>
    );
}