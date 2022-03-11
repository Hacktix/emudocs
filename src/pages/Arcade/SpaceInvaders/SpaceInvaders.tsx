import MemoryMap from "../../../components/MemoryMap/MemoryMap";
import TableOfContents from "../../../components/TableOfContents/TableOfContents";
import ShiftRegDemo from "./ShiftRegDemo";

export default function SpaceInvaders() {
    return (
        <>
            <h1>Space Invaders</h1>
            <p>
                This page contains all documentation required to implement an Emulator for the original Taito Space Invaders arcade machine. This is arguably one of the best starter
                projects for getting into Emulator Development, as the CPU present in the system is quite basic and commonly used, and not much additional hardware has to be emulated.
            </p>

            <TableOfContents />

            <h2 id="memorymap">Memory Map</h2>
            <p>
                The Space Invaders arcade machine uses 16-bit Memory Addressing, although only 14 bits are ever actually used. The ROM for the original Taito Space Invaders is commonly
                split up into four files: <code>invaders.e, invaders.f, invaders.g</code> and <code>invaders.h</code>. The following table shows which file is mapped to which memory
                region, as well as mappings for other hardware:
            </p>
            <MemoryMap
                maxAddress={0xFFFF}
                addressPrefix="$"
                regions={[
                    { startAddress: 0x0000, endAddress: 0x07FF, color: { r: 200, g: 25, b: 25 }, name: "ROM (invaders.h)" },
                    { startAddress: 0x0800, endAddress: 0x0FFF, color: { r: 200, g: 25, b: 25 }, name: "ROM (invaders.g)" },
                    { startAddress: 0x1000, endAddress: 0x17FF, color: { r: 200, g: 25, b: 25 }, name: "ROM (invaders.f)" },
                    { startAddress: 0x1800, endAddress: 0x1FFF, color: { r: 200, g: 25, b: 25 }, name: "ROM (invaders.e)" },
                    { startAddress: 0x2000, endAddress: 0x23FF, color: { r: 25, g: 125, b: 25 }, name: "RAM", description: "1KB of general-purpose RAM." },
                    { startAddress: 0x2400, endAddress: 0x3FFF, color: { r: 35, g: 35, b: 150 }, name: "VRAM", description: "7KB Video RAM, where each bit represents a pixel on screen." },
                    { startAddress: 0x4000, endAddress: 0xFFFF, name: "RAM Mirror (unused)", description: "The most significant 2 bits of the address are ignored, so memory accesses in this region access either RAM or VRAM." },
                ]}
            />
            <br />

            <h2 id="display">Display</h2>
            <p>
                The display of the Space Invaders arcade machine is a simple black-and-white screen with a resolution of 224x256 pixels. One bit in the VRAM memory region corresponds
                to one pixel on screen, a 1-bit representing a white "on" pixel, while a 0-bit represents a black "off" pixel.
            </p>
            <p>
                The mapping of bits to pixels goes bottom to top and left to right. The least significant bit of the byte in address <code>$2400</code> represents the bottom left
                pixel of the screen, and the remaining bits go upwards from there. Therefore, the 32 bytes from <code>$2400</code> to <code>$241F</code> represent the leftmost
                column of pixels, and the address <code>$2420</code> marks the start of the second column.
            </p>
            <p>
                <b>Fun Fact:</b> The display in the actual arcade machines is simply mounted in a 90° angle, which is the reason for this slightly odd address-to-pixel mapping.
            </p>
            <br />

            <h2 id="cpu">CPU</h2>
            <p>
                The CPU used in the Space Invaders arcade machine is a standard Intel 8080 CPU. Documentation of this processor isn't available on Emudocs (yet), but the following
                links contain all important information:<br />
                &gt; <a href="https://altairclone.com/downloads/manuals/8080%20Programmers%20Manual.pdf">8080 Assembly Language Programming Manual </a><br />
                &gt; <a href="https://www.tramm.li/i8080/Intel%208080-8085%20Assembly%20Language%20Programming%201977%20Intel.pdf">8080/8085 Assembly Language Programming </a><br />
                &gt; <a href="http://bitsavers.trailing-edge.com/components/intel/MCS80/98-153B_Intel_8080_Microcomputer_Systems_Users_Manual_197509.pdf">8080 Microcomputer Systems User's Manual </a>
                (Instruction Descriptions starting at page 48 are especially useful as they include information about timing)
            </p>
            <h3 id="interrupts">Interrupts</h3>
            <p>
                The CPU in the Space Invaders arcade machine is wired up to two possible interrupt sources, which causes it to break execution of the program and execute an RST
                instruction instead. The first type of interrupt signal occurs when approximately half of the frame is "rendered" (on hardware, this is determined by the position
                of the beam of the CRT), which executes an <code>RST 8</code> instruction, which acts the same as a <code>CALL $0008</code> would. Similarly, when the frame is
                fully rendered, the second interrupt signal occurs, causing execution of an <code>RST 10</code> instruction, which acts the same as a <code>CALL $0010</code> would.
            </p>
            <p>
                Since the Space Invaders processor ran at approximately 2MHz, half a frame would take around 34952.5 CPU cycles to render (assuming a clock rate of 2097152Hz, which
                is 2*2^20).
            </p>
            <p>
                <b>Note:</b> "CPU cycles" in this case mean what's referred to as "States" in most official sources of 8080 documentation.
            </p>
            <br />

            <h2 id="io">Additional Hardware</h2>
            <p>
                The Intel 8080 processor includes specific <code>IN</code> and <code>OUT</code> instructions which write data to or read data from other hardware components using
                a specific port number. The following is a list of available ports and the hardware they are connected to:
            </p>
            <br />

            <h3 id="ctrl-settings">Controls and Settings</h3>
            <p>
                Ports 1 and 2 can be read from to determine the state of the control buttons as well as some configurations for the arcade machine. <b>Fun Fact:</b> On real
                arcade machines, these "game settings" were configurable using dip switches on the back side of the machine.
            </p>
            <h4 id="port1in">[IN] Port 1 - Controls</h4>
            <p>
                <table>
                    <tr>
                        <td className="TableBorderRight">Bit 0</td><td>1 for a short time when user deposits a coin into the machine</td>
                    </tr>
                    <tr>
                        <td className="TableBorderRight">Bit 1</td><td>1 if 2P Start button is pressed</td>
                    </tr>
                    <tr>
                        <td className="TableBorderRight">Bit 2</td><td>1 if 1P Start button is pressed</td>
                    </tr>
                    <tr>
                        <td className="TableBorderRight">Bit 3</td><td>Always 1</td>
                    </tr>
                    <tr>
                        <td className="TableBorderRight">Bit 4</td><td>1 if P1 Shot button is pressed</td>
                    </tr>
                    <tr>
                        <td className="TableBorderRight">Bit 5</td><td>1 if P1 Left button is pressed</td>
                    </tr>
                    <tr>
                        <td className="TableBorderRight">Bit 6</td><td>1 if P1 Right button is pressed</td>
                    </tr>
                </table>
            </p>
            <h4 id="port2in">[IN] Port 2 - Settings and P2 Controls</h4>
            <p>
                <table>
                    <tr>
                        <td className="TableBorderRight">Bit 0-1</td><td>Number of player lives minus 3 (00 = 3 Ships, 01 = 4 Ships, 10 = 5 Ships, 11 = 6 Ships)</td>
                    </tr>
                    <tr>
                        <td className="TableBorderRight">Bit 2</td><td>1 if the arcade machine is tilted, negligible for emulation purposes</td>
                    </tr>
                    <tr>
                        <td className="TableBorderRight">Bit 3</td><td>Amount of points needed to add player life (0 = 1500 Points, 1 = 1000 Points)</td>
                    </tr>
                    <tr>
                        <td className="TableBorderRight">Bit 4</td><td>1 if P2 Shot button is pressed</td>
                    </tr>
                    <tr>
                        <td className="TableBorderRight">Bit 5</td><td>1 if P2 Left button is pressed</td>
                    </tr>
                    <tr>
                        <td className="TableBorderRight">Bit 6</td><td>1 if P2 Right button is pressed</td>
                    </tr>
                    <tr>
                        <td className="TableBorderRight">Bit 7</td><td>If 0, coin info is displayed on demo screen (?)</td>
                    </tr>
                </table>
            </p>
            <br />

            <h3 id="sfx">Sound Effects</h3>
            <p>
                Ports 3 and 5 can be written to in order to trigger the sound hardware to play certain sounds. Emulating this sound hardware would be unnecessarily complex, so
                emulators usually tend to simply play back audio samples when these bits are written to. This is a perfectly valid approach and works fine for most sounds. The only
                special case is the UFO sound, which needs to be played repeatedly until it's corresponding bit is reset to zero.
            </p>
            <h4 id="port3out">[OUT] Port 3 - Sound Effects 1</h4>
            <p>
                <table>
                    <tr>
                        <td className="TableBorderRight">Bit 0</td><td>UFO</td>
                    </tr>
                    <tr>
                        <td className="TableBorderRight">Bit 1</td><td>Player Shot</td>
                    </tr>
                    <tr>
                        <td className="TableBorderRight">Bit 2</td><td>Player Death</td>
                    </tr>
                    <tr>
                        <td className="TableBorderRight">Bit 3</td><td>Invader Hit</td>
                    </tr>
                </table>
            </p>
            <h4 id="port3out">[OUT] Port 5 - Sound Effects 2</h4>
            <p>
                <table>
                    <tr>
                        <td className="TableBorderRight">Bit 0</td><td>Fleet Movement 1</td>
                    </tr>
                    <tr>
                        <td className="TableBorderRight">Bit 1</td><td>Fleet Movement 2</td>
                    </tr>
                    <tr>
                        <td className="TableBorderRight">Bit 2</td><td>Fleet Movement 3</td>
                    </tr>
                    <tr>
                        <td className="TableBorderRight">Bit 3</td><td>Fleet Movement 4</td>
                    </tr>
                    <tr>
                        <td className="TableBorderRight">Bit 4</td><td>UFO Hit</td>
                    </tr>
                </table>
            </p>
            <br />

            <h3 id="shiftware">Shift Hardware</h3>
            <p>
                Due to the nature of how Space Invaders works, bitshifting is a fairly common operation in the game code. Because the Intel 8080 processor doesn't support
                bitshifting extensively, the machine uses dedicated bit shifting hardware, occupying an input port and two output ports.
            </p>
            <p>
                The shift hardware is a 16-bit register. Writing data to <b>Port 4</b> shifts the contents of the register to the right by 8 bits and places the newly written data
                byte into bits 8-15.
            </p>
            <p>
                Writing data to <b>Port 2</b> sets the offset for the read operation. If the offset is zero, reading from <b>Port 3</b> returns the uppermost 8 bits currently
                present in the shift register. If the offset is one, bits 7-14 are read. If the offset is two, bits 6-13 are read, and so on.
                <br/>
                <b>Note:</b> Only the lowest 3 bits are used for the offset, all other bits are ignored.
            </p>
            <ShiftRegDemo />
        </>
    );
}