
import "./Header.css";
import Banner from "../../assets/images/emudocs-banner.png";
import { Link } from "react-router-dom";
import DropdownMenu from "../DropdownMenu/DropdownMenu";

export default function Header() {
    return (
        <div className="AppHeader">
            <Link to="/">
                <img className="AppBanner" src={Banner} alt="Emudocs" />
            </Link>
            <div className="NavigationContainer">
                <Link to="/basics">
                    <h3 className="NavigationLabel">Emudev Basics</h3>
                </Link>
                <DropdownMenu label="Arcade">
                    <Link to="/arcade/spaceinvaders">
                        Space Invaders
                    </Link>
                </DropdownMenu>
                <DropdownMenu label="Nintendo">
                    Coming Soon!
                </DropdownMenu>
            </div>
        </div>
    );
}