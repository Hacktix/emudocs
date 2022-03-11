import { useState } from "react";
import "./ShiftRegDemo.css";

export default function ShiftRegDemo() {
    const [value, setValue] = useState(0xabcd);
    const [offset, setOffset] = useState(2);

    return (
        <div className="ShiftRegContainer">
            <h5>Interactive Demo:</h5>
            <label><b>Shift Register Value:</b></label>
            <div className="BitsContainer">
                {new Array(16).fill(0).map((_, num) => (
                    <div
                        className="Bit Clickable"
                        style={{
                            backgroundColor: (value & (1 << num)) === 0 ? "rgb(40, 40, 40)" : "rgb(60, 60, 60)"
                        }}
                        onClick={() => {
                            setValue(value ^ (1 << num));
                        }}
                    >
                        {(value & (1 << num)) === 0 ? 0 : 1}
                    </div>
                ))}
            </div>
            <div className="BitsContainer">
                {new Array(16).fill(0).map((_, num) => (
                    <div
                        className="BitSelector"
                        style={{
                            backgroundColor: num >= offset && num < (offset + 8) ? "rgb(0, 140, 0)" : "transparent"
                        }}
                    />
                ))}
            </div>
            <br />
            <label><b>Shift Register Offset:</b></label>
            <br />
            <input
                type="number"
                min={0}
                max={7}
                value={offset}
                onChange={(e) => setOffset(parseInt(e.target.value) & 7)}
            />
            <br /><br />
            <label><b>Output Value:</b></label>
            <div className="BitsContainer">
                {new Array(8).fill(0).map((_, num) => (
                    <div
                        className="Bit"
                        style={{
                            backgroundColor: ((value >> offset) & (1 << num)) === 0 ? "rgb(40, 40, 40)" : "rgb(60, 60, 60)"
                        }}
                    >
                        {((value >> offset) & (1 << num)) === 0 ? 0 : 1}
                    </div>
                ))}
            </div>
        </div>
    )
}