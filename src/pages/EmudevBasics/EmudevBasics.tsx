import MemoryMap from "../../components/MemoryMap/MemoryMap"

export default function EmudevBasics() {
    return (
        <>
        <h1>Emulator Development Basics</h1>
        <p>
            <b>Note:</b> This Guide is intended for people who already have experience and are confident in their knowledge with programming in at least one language.
            This is not a programming tutorial. You have been warned!
        </p>
        <p>
            So, you've decided to dive into the vast field that is Emulator Development, and are probably unsure of where to get started. Well, I'd argue this is a pretty
            good place. In the following paragraphs I will try to explain, from the ground up, what exactly Emulators do, how they do it and how you can get started on
            making your own. That being said, let's get into it!
        </p>
        
        <br/>

        <h2>What do Emulators do?</h2>
        <p>
            This might seem like a dumb question at first. They play console games on devices that aren't consoles, right? But that's a very general answer.
            From a more technical point of view, Emulators try to "pretend to be" (or "emulate") a certain set of hardware, usually game consoles. This is not as simple
            as just "running a console game on your PC". Instead, an Emulator needs to correctly simulate all (or at least most of) the hardware present in the console,
            such as the processor, potential co-processors, graphics chips, audio processors, and so on and so forth.
        </p>
        <p>
            How exactly does this go down? Well, on the most basic level, all of these hardware components just have a few inputs and a few outputs, with some data
            processing inbetween. This is what most Emulator Development boils down to - hardware components sending data between each other which somehow <i>magically</i> makes
            it all work together to play games. (If you're a bit confused right now, don't worry, we're just starting off.)
        </p>
        <p>
            In order to make this a bit more easily understandable, let's take a look at some examples of hardware components which an Emulator may have to, well, <i>emulate.</i>
        </p>
        
        <br/>

        <h3>The Memory Bus</h3>
        <p>
            Every single emulate-able machine in existence has a Memory Bus. Effectively, the Memory Bus is the wiring that connects all the hardware within the system and lets
            it communicate with each other. If you're a complete beginner this may already sound complicated, but it really isn't (at least most of the time). Usually, especially
            in older systems, Memory Buses boil down to two sets of data: the <b>data</b> which should be transferred, and a <b>memory address</b> which determines where exactly
            the data should go.
        </p>
        <p>
            Now, the Memory Bus sometimes needs to connect up multiple pieces of hardware. Chances are the system has a bit of RAM which needs to be connected to the Memory Bus.
            If it uses cartridges to store game data on, that will also have to be connected. Potential graphics or audio processing chips also need to be connected, so that
            the other hardware components can communicate with them. How does this work?
        </p>
        <p>
            The answer is quite simple: <b>Memory Regions</b>. Let's assume we have a Memory Bus which uses 16-bit addresses, so values from <code>0x0000</code> to <code>0xFFFF</code>.
            Now let's assume that we have 4 KB of RAM. Each byte would need one address, so in order to be able to access every byte of the 4 KB of RAM, we would need <code>0x1000</code> addresses.
            So let's connect it up! The first byte of RAM will be address <code>0x0000</code>, the next byte <code>0x0001</code> and so on, until we hit <code>0x0FFF</code>. And voilà!
            Now the <b>Memory Region</b> from address <code>0x0000</code> to <code>0x0FFF</code> is connected to our RAM, and we still have a ton of memory addresses remaining that are
            unassigned, which we could use for other hardware! This assignment of Memory Regions is usually documented in something known as the <b>Memory Map</b>, which shows which
            Memory Regions are connected to which hardware. These memory maps usually look something like this:
        </p>
        <MemoryMap
            maxAddress={0xFFFF}
            addressPrefix="$"
            regions={[
                {startAddress: 0x0000, endAddress: 0x7FFF, color:{r: 200,g: 25, b: 25}, name: "ROM", description: "Cartridge Memory is acessible in this memory region."},
                {startAddress: 0x8000, endAddress: 0x9FFF, color:{r: 25, g: 125,b: 25}, name: "RAM", description: "8 KB of RAM are accessible in this memory region."},
                {startAddress: 0xA000, endAddress: 0xDFFF, color:{r: 35, g: 35, b: 150}, name: "VRAM", description: "16 KB of Video RAM are accessible in this memory region."},
                {startAddress: 0xE000, endAddress: 0xEFFF, name: "Unmapped", description: "This memory region is not connected to any hardware."},
                {startAddress: 0xF000, endAddress: 0xFEFF, color:{r: 60, g: 60, b: 60}, name: "Peripheral 1", description: "This memory region is mapped to some example peripheral hardware."},
                {startAddress: 0xFF00, endAddress: 0xFFFF, color:{r: 75, g: 75, b: 75}, name: "Peripheral 2", description: "This memory region is mapped to another example peripheral hardware."}
            ]}
        />
        <p>
            So let's recap: Every system has a Memory Bus which lets the hardware communicate by reading or writing data from and to each other. The Memory Bus knows where to put the
            data through the use of Memory Addresses. Certain ranges of Memory Addresses (also known as Memory Regions) are usually connected to specific hardware within the system,
            and this assignment is usually documented in Memory Maps. Simple enough, right?
        </p>
        
        <br/>

        <h3>The CPU</h3>
        <p>
            The heart of every system is the CPU, or Central Processing Unit. It's responsible for executing code and, effectively, <i>making things do stuff</i>. How does it do this?
            Well, generally, Processors follow a flow of operations known as the <b>Fetch - Decode - Execute Loop</b>. If you're new to this sort of stuff that might not mean much to
            you, so let's go through each of those three terms one by one.
        </p>
        <h4>Fetch - Decode - Execute</h4>
        <p>
            <b>Fetch:</b> The Processor needs to know what exactly it has to do. As a programmer unfamiliar with low-level operations this may be new to you, but effectively, the CPU
            is given what's known as "instructions". These instructions are pretty much nothing more than one or more bytes that tell the Processor what exactly it's supposed to do.
            In this "Fetch" step, the Processor reads (or "fetches") the next instruction byte(s) from memory, and that's it!<br/>
            <b>Fun Fact:</b> If you've ever compiled code before, which you probably have, you've turned your human-readable source code into instruction bytes.
        </p>
        <p>
            <b>Decode:</b> So now the Processor has the instruction bytes, but what is it supposed to do? This is what's determined in the "Decode" step. The previously fetched
            bytes are decoded and the CPU is "getting ready" to do what the instruction tells it to do.
        </p>
        <p>
            Now that we know which instruction we need to run and what exactly it does, we can get to the last step: <b>Execute!</b>
        </p>
        <p>
            But why is it called a "Loop"? Because the Processor repeats these three steps over and over, and it does so <i>really, really quickly</i>. Even some of the oldest
            systems execute hundreds of thousands if not millions of instructions <i>every second</i>. This allows for a bunch of instructions as simple as "add two numbers" to
            turn into something as complex as an actual game that runs on the system.
        </p>
        <p>
            The set of all instructions a processor can execute is referred to as the <b>Instruction Set</b>. While there may be some similarities between some processors, there's
            no "general" instruction set - each processor type has it's own which needs to be emulated.
        </p>
        <h4>Registers</h4>
        <p>
            Another term which you will most definitely come across is <b>Registers</b>. Long story short, Registers are a very small but very fast type of data storage within
            the processor itself which is commonly used to make loading and saving data faster than having to read and write from memory each time. Which registers there are and what
            size of data they can hold is, once again, all up to which type of processor you're emulating. However, most processors have three basic types of registers:
        </p>
        <p>
            A <b>Program Counter</b>, also known as the <b>Instruction Pointer</b>, keeps track of which memory address the processor should fetch instructions from.
        </p>
        <p>
            A <b>Stack Pointer</b>, which keeps track of the lower limit of a memory region known as <b>The Stack</b>. The Stack is commonly used as a quick type of temporary storage,
            and many processors have dedicated instructions to write data to or read data from the stack (also known as "pushing" or "popping"). For a more detailed explanation,
            check out <a href="https://en.wikipedia.org/wiki/Stack_(abstract_data_type)">the relevant Wikipedia article.</a>
        </p>
        <p>
            A range of <b>Data Registers</b> which can be used for arithmetic operations and to hold data. While a processor may have multiple data registers, it's not uncommon for
            arithmetic instructions to only apply to one single register, which is commonly referred to as the <b>Accumulator Register</b> (as it's the register in which the results
            of the calculations <i>accumulate</i>).
        </p>

        <br/>

        <h3>Additional Hardware</h3>
        <p>
            The Memory Bus and the CPU are the only two hardware parts that every system has. All other hardware that you may have to emulate heavily depends on the system, and
            there's almost nothing system-specific hardware has in common with that of other systems. For details on graphic chips, audio processing chips or any other processors
            or hardware, check out the documentation of the specific system you're trying to emulate.
        </p>

        <br/>

        <h2>Your First Emulator</h2>
        <p>
            Once you're familiar with the concepts explained in the paragraphs above, you can start giving own first emulator a shot! If you want to get more familiar with the whole
            concept of Fetch - Decode - Execute, I'd recommend choosing a <b>CHIP-8 Interpreter</b> as your first project. While there's no documentation for CHIP-8 on this site, I
            can recommend <a href="http://devernay.free.fr/hacks/chip8/C8TECH10.HTM">Cowgod's CHIP-8 Technical Reference</a> as
            well as <a href="https://tobiasvl.github.io/blog/write-a-chip-8-emulator/">Tobias V. Langhoff's Guide to making a Chip-8 emulator</a>.
        </p>
        <p>
            If you're feeling confident of your understanding and are looking for something a little bit more challenging, the Space Invaders Arcade Machine is a good starter project
            and first "real hardware". It uses an Intel 8080 CPU, which is very simple to emulate and has many similarities with the more common Z80 processor, doesn't use any graphics
            chips, so it's easy to get some graphics showing, and it uses dedicated separate bitshifting hardware which is an excellent introduction to the idea of emulating
            system-specific hardware. The documentation of Space Invaders on Emudocs is still in progress, but in the mean time I recommend
            the <a href="https://computerarcheology.com/Arcade/SpaceInvaders/Hardware.html">Computer Archeology page on Space Invaders.</a>
        </p>
        <p>
            Otherwise, if you're already very familiar with low-level programming, you might want to try emulating the Nintendo Gameboy. The complexity of the system is definitely
            a step up from CHIP-8 or Space Invaders, but it's still very manageable, especially if you're not completely new to working close to the hardware level. The documentation
            of the Gameboy on this site is also in the works, but <a href="https://gbdev.io/pandocs/">The Gameboy Pandocs</a> are arguably the best source of information you need
            to develop an emulator.
        </p>
        </>
    )
}