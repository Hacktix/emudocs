import "./DropdownMenu.css";

export type DropdownMenuProps = {
    label: string,
    children: string | JSX.Element
}

export default function DropdownMenu(props: DropdownMenuProps) {
    return (
        <div>
            <div className="DropdownBox">
                <h3 className="DropdownLabel">
                    {props.label}&#x2009;<small><sub>▼</sub></small>
                </h3>
                <div className="DropdownContent">
                    {props.children}
                </div>
            </div>
        </div>
    );
}