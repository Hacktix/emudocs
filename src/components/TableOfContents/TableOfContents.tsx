import { useEffect, useState } from "react";
import "./TableOfContents.css";

const TOC_ELEMENT_INDENT = 25;

const Headings = ({headings}: {headings: Element[]}) => {
    return (
        <ul className="HeadingsList">
            {headings.map(heading => (
                <div
                    key={heading.id}
                    style={{marginLeft: TOC_ELEMENT_INDENT*(+(heading.nodeName[1]) - 1)}}
                >
                    <li>
                        <span
                            className="TOCEntry"
                            onClick={() => {
                                document.querySelector(`#${heading.id}`)?.scrollIntoView({
                                    behavior: "smooth"
                                });
                            }}
                        >&nbsp;&nbsp;{heading.innerHTML}</span>
                    </li>
                </div>
            ))}
        </ul>
    )
}

export default function TableOfContents() {
    const [headings, setHeadings] = useState<Element[]>([]);

    useEffect(() => {
        const headingElements = Array.from(
            document.querySelectorAll("h1, h2, h3, h4, h5")
        ).filter(elem => elem.id);
        setHeadings(headingElements);
    }, []);

    if(headings.length === 0)
        return null;

    return (
        <div className="TableOfContents">
            <h4 className="TOCTitle">Table of Contents:</h4>
            <Headings headings={headings} />
        </div>
    );
}