import "./ScrollToTop.css";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
    const [hidden, setHidden] = useState(true);

    useEffect(() => window.addEventListener("scroll", (e) => {
        setHidden(!window.scrollY);
    }), []);

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    return (
        <div
            className="ScrollToTopButton"
            style={{ opacity: hidden ? 0 : 1 }}
            onClick={scrollToTop}
        >
            ᐱ
        </div>
    )
}