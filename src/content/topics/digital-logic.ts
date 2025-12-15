// Chapter 0.1: Digital Logic - Topic Content
// This will eventually be migrated to Supabase

export type TopicContent = {
  id: string;
  layerSlug: string;
  chapterSlug: string;
  slug: string;
  sectionNumber: string;
  title: string;
  summary: string;
  illustrationKey: string;
  content: string; // Markdown
};

export const DIGITAL_LOGIC_TOPICS: TopicContent[] = [
  {
    id: "0-1-1",
    layerSlug: "the-machine",
    chapterSlug: "digital-logic",
    slug: "0-1-1",
    sectionNumber: "0.1.1",
    title: "The Transistor",
    summary: "The switch that computes — how voltage becomes logic.",
    illustrationKey: "transistor",
    content: `## The Idea

A transistor is a **voltage-controlled switch**. Apply voltage to one terminal (the gate), and current flows between two others (source and drain). Remove the voltage, and current stops.

This is the atomic unit of computation. Everything else—processors, memory, graphics cards, the device you're reading this on—is built from billions of these switches arranged in clever patterns.

The key insight: by treating "current flowing" as **1** and "no current" as **0**, we transform electrical engineering into information processing. The transistor doesn't "know" math—it just switches. But when you wire millions of switches together correctly, math emerges.

## The Mechanics

**MOSFET structure** (Metal-Oxide-Semiconductor Field-Effect Transistor):

The modern transistor has four parts:
- **Gate**: The control terminal. Voltage here creates an electric field
- **Source**: Where electrons originate
- **Drain**: Where electrons flow to
- **Channel**: The path between source and drain, controlled by the gate

**How switching works:**

1. **Gate voltage = 0V**: No electric field. The channel is "closed." No current flows from source to drain. This represents binary **0**.

2. **Gate voltage = Vth** (threshold): Electric field forms. Electrons accumulate in the channel, creating a conductive path. Current flows. This represents binary **1**.

The threshold voltage (Vth) is typically 0.2-0.7V in modern processors. Below this, the transistor is "off." Above it, the transistor is "on."

**Two flavors:**
- **NMOS**: Conducts when gate is HIGH (pulls output toward ground)
- **PMOS**: Conducts when gate is LOW (pulls output toward power supply)

CMOS (Complementary MOS) circuits use both types together—one pulls up, one pulls down—ensuring the output is always driven to a defined state.

## Trade-offs

**Size vs. Power:**
Smaller transistors switch faster and use less power per switch. But as they shrink below 10nm, quantum effects cause electrons to "tunnel" through the channel even when the transistor is "off." This creates **leakage current**—power wasted as heat.

**Speed vs. Reliability:**
Running transistors at higher voltages makes them switch faster but increases power consumption quadratically (P ∝ V²) and accelerates wear-out mechanisms like electromigration.

**Density vs. Heat:**
More transistors per chip means more computation, but also more heat. Modern CPUs can have 100+ billion transistors, generating 100-300W that must be removed.

**The fundamental limit:**
Each switching event dissipates energy. Landauer's principle sets the theoretical minimum at kT·ln(2) ≈ 0.017 eV at room temperature. Real transistors use ~1000x more, leaving room for improvement—but approaching physical limits.

## Failure Modes

**Stuck-at faults:**
Manufacturing defects can leave a transistor permanently on or off. Testing catches most, but some escape into production.

**Soft errors:**
Cosmic rays or radioactive decay in packaging materials can flip a transistor's state momentarily. At sea level, expect ~1 bit flip per GB of RAM per month. Critical systems use error-correcting codes.

**Electromigration:**
High current density physically moves metal atoms over time, eventually breaking connections. This limits how long chips can run at high frequencies.

**Hot carrier injection:**
Energetic electrons get trapped in the gate oxide, gradually shifting the threshold voltage. The transistor becomes harder to turn on, eventually failing to switch.

**Thermal runaway:**
Leakage current increases with temperature, which increases temperature, which increases leakage... Thermal management prevents this positive feedback loop.

## Where You'll See It

**Every digital system** is transistors. But the abstraction usually hides them:

- **CPU specifications**: "7nm process" refers to transistor feature size (though marketing numbers diverge from physical dimensions)
- **Power management**: Voltage/frequency scaling trades speed for power by changing how hard transistors switch
- **Overclocking**: Pushing transistors beyond rated specifications—works until thermal limits or reliability issues appear
- **Hardware security**: Side-channel attacks exploit transistor-level behaviors (power consumption, electromagnetic emissions) to extract secrets
- **Quantum computing**: Uses quantum properties of individual electrons, but still needs classical transistors for control and readout

Understanding transistors helps debug:
- Why chips throttle under sustained load (thermal limits)
- Why lower-power modes exist (leakage reduction)
- Why ECC memory matters for servers (soft error rates)
- Why hardware ages and eventually fails (wear-out mechanisms)
`,
  },
  {
    id: "0-1-2",
    layerSlug: "the-machine",
    chapterSlug: "digital-logic",
    slug: "0-1-2",
    sectionNumber: "0.1.2",
    title: "Boolean Algebra",
    summary: "AND, OR, NOT — the mathematics of binary decisions.",
    illustrationKey: "boolean-algebra",
    content: `## The Idea

Boolean algebra is the mathematics of true and false. It provides the formal foundation for digital logic—a way to reason about computation using only two values: **1** (true) and **0** (false).

George Boole invented it in 1847 to formalize logical reasoning. A century later, Claude Shannon realized it could describe electrical switching circuits. This connection—abstract logic mapped to physical switches—is why your computer works.

Three operations form the complete basis:
- **AND**: Both inputs must be true
- **OR**: At least one input must be true
- **NOT**: Inverts the input

Every computation your computer performs—from adding numbers to rendering graphics to running neural networks—reduces to combinations of these three operations.

## The Mechanics

**The three fundamental operations:**

**AND (conjunction, ·, ∧):**
\`\`\`
A · B = 1  only when  A = 1  AND  B = 1

Truth table:
A | B | A·B
0 | 0 |  0
0 | 1 |  0
1 | 0 |  0
1 | 1 |  1
\`\`\`

**OR (disjunction, +, ∨):**
\`\`\`
A + B = 1  when  A = 1  OR  B = 1  (or both)

Truth table:
A | B | A+B
0 | 0 |  0
0 | 1 |  1
1 | 0 |  1
1 | 1 |  1
\`\`\`

**NOT (negation, ¬, '):**
\`\`\`
¬A = 1  when  A = 0

Truth table:
A | ¬A
0 |  1
1 |  0
\`\`\`

**Derived operations:**

**NAND** (NOT-AND): ¬(A·B) — Universal gate, can build any other
**NOR** (NOT-OR): ¬(A+B) — Also universal
**XOR** (exclusive OR): A⊕B = 1 when inputs differ
**XNOR** (equivalence): A⊙B = 1 when inputs match

**Key laws for simplification:**

\`\`\`
Identity:      A · 1 = A       A + 0 = A
Null:          A · 0 = 0       A + 1 = 1
Idempotent:    A · A = A       A + A = A
Complement:    A · ¬A = 0      A + ¬A = 1
Double neg:    ¬(¬A) = A
Commutative:   A · B = B · A   A + B = B + A
Associative:   (A·B)·C = A·(B·C)
Distributive:  A·(B+C) = A·B + A·C
De Morgan's:   ¬(A·B) = ¬A + ¬B
               ¬(A+B) = ¬A · ¬B
\`\`\`

De Morgan's laws are particularly powerful—they let you convert between AND/OR by flipping operations and negating.

## Trade-offs

**Expressiveness vs. Efficiency:**
Any Boolean function can be expressed in multiple forms. **Sum of Products** (OR of ANDed terms) is easy to derive from truth tables but may use many gates. **Product of Sums** (AND of ORed terms) sometimes yields smaller circuits.

**Gate count vs. Depth:**
A flat circuit with many parallel gates computes quickly but uses more hardware. A deep circuit with serial gates uses less hardware but introduces delay at each level.

**Two-level vs. Multi-level:**
Two-level logic (all paths traverse exactly 2 gate delays) is fast but may require many gates. Multi-level logic reuses intermediate results, saving gates at the cost of delay.

**Universality trade-off:**
NAND and NOR are each universal (can build any function), making manufacturing simpler. But directly implementing AND/OR when needed uses fewer transistors per gate.

## Failure Modes

**Incomplete truth tables:**
Forgetting edge cases. A 3-input function has 8 rows; 4 inputs have 16. Missing cases cause bugs that only appear with specific input combinations.

**Assuming commutativity where it doesn't apply:**
XOR is commutative, but sequential circuits with feedback are not. Order matters when state is involved.

**Sign extension errors:**
When extending binary numbers, the sign bit must be replicated. Treating signed and unsigned values inconsistently causes overflow bugs.

**Don't-care misuse:**
"Don't care" conditions in truth tables allow optimization but can mask bugs. If an input combination "can't happen" but does due to a bug elsewhere, behavior is undefined.

## Where You'll See It

**Hardware design:**
Verilog and VHDL use Boolean expressions directly. Logic synthesis tools convert high-level descriptions to optimized gate networks.

**Query optimization:**
SQL WHERE clauses are Boolean expressions. Database query planners use Boolean algebra to simplify and reorder conditions.

**Access control:**
Permission systems (user AND admin) OR (resource.public = true). Understanding Boolean logic helps debug authorization bugs.

**Search queries:**
Google, Elasticsearch, and other search engines support Boolean operators. "CPU AND (architecture OR design) NOT tutorial" is Boolean algebra.

**Bitwise operations:**
Languages expose AND (&), OR (|), XOR (^), NOT (~) for manipulating individual bits. Used in graphics, cryptography, networking, and systems programming.

**Conditional logic:**
Every if statement is Boolean evaluation. Complex conditionals benefit from applying De Morgan's law and other simplifications for readability.
`,
  },
  {
    id: "0-1-3",
    layerSlug: "the-machine",
    chapterSlug: "digital-logic",
    slug: "0-1-3",
    sectionNumber: "0.1.3",
    title: "Logic Gates",
    summary: "Building blocks from transistors.",
    illustrationKey: "logic-gates",
    content: `## The Idea

Logic gates are Boolean operations made physical. Each gate takes one or more binary inputs and produces a binary output according to a fixed rule. They're the bridge between abstract mathematics and working hardware.

A NOT gate is 2 transistors. An AND gate is 6. From these tiny building blocks—each smaller than a virus—we construct arithmetic units, memory cells, and complete processors.

The key insight: gates are **composable**. The output of one gate can feed the input of another. This lets us build arbitrary complexity from simple, reliable primitives.

## The Mechanics

**Basic gates and their transistor implementations:**

**NOT (Inverter)** — 2 transistors
\`\`\`
Input A ──┤>o── Output ¬A

One PMOS (top) and one NMOS (bottom) in series.
When A=0: PMOS conducts, output pulled HIGH (1)
When A=1: NMOS conducts, output pulled LOW (0)
\`\`\`

**NAND** — 4 transistors
\`\`\`
A ──┬──┤
    │   ├──o── Output ¬(A·B)
B ──┴──┤

Two PMOS in parallel (either pulls up)
Two NMOS in series (both needed to pull down)
Output is LOW only when BOTH inputs are HIGH
\`\`\`

**NOR** — 4 transistors
\`\`\`
A ──┬──┤
    │   ├──o── Output ¬(A+B)
B ──┴──┤

Two PMOS in series (both needed to pull up)
Two NMOS in parallel (either pulls down)
Output is HIGH only when BOTH inputs are LOW
\`\`\`

**AND** — 6 transistors
\`\`\`
A ──┬──┤
    │   ├───┤>o── Output A·B
B ──┴──┤

NAND followed by NOT (inverter)
\`\`\`

**OR** — 6 transistors
\`\`\`
A ──┬──┤
    │   ├───┤>o── Output A+B
B ──┴──┤

NOR followed by NOT (inverter)
\`\`\`

**XOR** — 8-12 transistors (multiple designs)
\`\`\`
A ──┬──┤
    │   ├───── Output A⊕B
B ──┴──┤

Complex: (A·¬B) + (¬A·B)
Output is HIGH when inputs differ
\`\`\`

**Propagation delay:**
Each gate takes time to switch—typically 10-100 picoseconds in modern processes. Signals must propagate through all gates in a path before the output is valid.

**Fan-out:**
Each gate output can drive a limited number of inputs. Exceeding fan-out degrades signal quality and increases delay. Buffers (back-to-back inverters) restore signal strength.

## Trade-offs

**NAND/NOR universality vs. direct implementation:**

NAND and NOR can each implement any Boolean function. Manufacturing only these types simplifies production. But implementing AND with NAND+NOT uses 6 transistors instead of optimized designs using 4.

**Static vs. dynamic logic:**

Static CMOS: Output always driven to 0 or 1. Robust, but uses more transistors.
Dynamic logic: Uses charge storage on capacitances. Fewer transistors but requires clocking and refresh. Sensitive to noise.

**Gate delay vs. gate count:**

Fast circuits minimize the number of gates in the longest path (critical path). This often means using more total gates to parallelize operations.

**Power vs. speed:**

Higher supply voltage means faster switching but quadratic increase in dynamic power. Lower voltage saves power but slows gates and reduces noise margin.

## Failure Modes

**Timing violations:**
If inputs change too close to when output is sampled, the gate may produce an undefined voltage or oscillate. Setup and hold times must be respected.

**Metastability:**
When an input changes exactly at the decision threshold, the output may take arbitrarily long to settle—or settle to an invalid level. This is unavoidable when crossing clock domains.

**Glitches (hazards):**
During switching, intermediate invalid outputs may briefly appear. A path through an inverter settles before a parallel direct path, causing a momentary wrong value. Logic hazards can trigger unintended state changes.

**Crosstalk:**
Signals on adjacent wires capacitively couple. A switching wire can induce voltage changes on neighbors, potentially flipping their values. Shielding and spacing mitigate this.

**Latch-up:**
In CMOS, parasitic thyristor structures can turn on under certain conditions (voltage spikes, radiation), creating a short circuit from power to ground. The chip may be destroyed unless power is cut.

## Where You'll See It

**Digital design:**
Hardware description languages (Verilog, VHDL) let you specify logic at the gate level or higher. Synthesis tools map to available gates.

**FPGAs:**
Field-Programmable Gate Arrays contain millions of configurable logic blocks. Each block implements small lookup tables that can emulate any gate combination.

**Standard cell libraries:**
ASIC designs use pre-characterized gate implementations. Libraries include timing, power, and area data for each gate type.

**Logic analyzers:**
Debug tools capture and display logic signals over time, showing gate-level behavior in running hardware.

**CPU microarchitecture:**
Understanding gates helps interpret:
- Why certain operations are faster than others (fewer gate delays)
- How branch prediction works (speculative gate activation)
- Why power consumption varies with workload (switching activity)
`,
  },
  {
    id: "0-1-4",
    layerSlug: "the-machine",
    chapterSlug: "digital-logic",
    slug: "0-1-4",
    sectionNumber: "0.1.4",
    title: "Combinational Circuits",
    summary: "Outputs depend only on inputs — adders, multiplexers.",
    illustrationKey: "combinational-circuits",
    content: `## The Idea

A combinational circuit is a network of logic gates where **outputs depend only on current inputs**. No memory, no state, no history. Give it the same inputs, get the same outputs—every time, instantly (after propagation delay).

This property makes combinational circuits predictable and easy to reason about. They're the workhorses of computation: adding numbers, selecting data paths, comparing values, encoding and decoding signals.

The fundamental theorem: any Boolean function can be implemented as a combinational circuit. Given a truth table, you can systematically construct a circuit that computes it.

## The Mechanics

**Building from truth tables:**

**Sum of Products (SOP):**
1. Find all rows where output = 1
2. For each row, AND together all inputs (inverted if 0)
3. OR all the AND terms together

Example: 2-input XOR
\`\`\`
A | B | Output
0 | 0 |   0
0 | 1 |   1    → ¬A·B
1 | 0 |   1    → A·¬B
1 | 1 |   0

XOR = (¬A·B) + (A·¬B)
\`\`\`

**Key combinational building blocks:**

**Half Adder** — Adds two 1-bit numbers
\`\`\`
Inputs: A, B
Outputs: Sum = A⊕B, Carry = A·B

A  B │ Sum Carry
0  0 │  0   0
0  1 │  1   0
1  0 │  1   0
1  1 │  0   1
\`\`\`

**Full Adder** — Adds three 1-bit numbers (includes carry-in)
\`\`\`
Inputs: A, B, Cin
Outputs: Sum = A⊕B⊕Cin, Cout = (A·B) + (Cin·(A⊕B))
\`\`\`

**Ripple Carry Adder** — Chains full adders for multi-bit addition
\`\`\`
   A3 B3    A2 B2    A1 B1    A0 B0
    │ │      │ │      │ │      │ │
    FA ←──── FA ←──── FA ←──── FA ←── Cin
    │         │         │         │
   S3        S2        S1        S0

Delay: O(n) — carry must ripple through all stages
\`\`\`

**Multiplexer (MUX)** — Selects one of N inputs
\`\`\`
2:1 MUX: Output = (¬S·I0) + (S·I1)
4:1 MUX: Uses 2 select bits to choose among 4 inputs
\`\`\`

**Decoder** — Converts binary code to one-hot
\`\`\`
2-to-4 decoder: 2 inputs → 4 outputs, exactly one HIGH
00 → 0001
01 → 0010
10 → 0100
11 → 1000
\`\`\`

**Encoder** — Converts one-hot to binary (inverse of decoder)

**Comparator** — Determines relative magnitude of two numbers

## Trade-offs

**Ripple carry vs. carry lookahead:**

Ripple carry adder: Simple, small area, but O(n) delay as carry propagates bit by bit.

Carry lookahead adder: Computes carries in parallel using generate (G=A·B) and propagate (P=A⊕B) signals. O(log n) delay but more complex, larger area.

**Area-delay product:**
Faster circuits generally need more gates. The area-delay product measures efficiency—lower is better.

**Two-level vs. multi-level:**

Two-level (SOP/POS): Maximum 2 gate delays, predictable timing, but may need exponentially many gates for some functions.

Multi-level: Shares intermediate terms, fewer total gates, but longer critical paths and harder timing analysis.

**Encoded vs. one-hot representation:**

Encoded: log2(N) bits for N states. Compact but requires decoders.
One-hot: N bits for N states. Larger but simpler logic—each state is just checking one bit.

## Failure Modes

**Critical path underestimation:**
If the longest path is miscalculated, the circuit may be clocked too fast. Outputs sampled before they're stable produce wrong results.

**Glitches affecting downstream logic:**
Combinational circuits can glitch during transitions. If a glitch propagates to a latch's clock or reset input, spurious state changes occur.

**Overflow:**
N-bit adders produce N+1 bit results. The carry-out is the overflow indicator. Ignoring it causes incorrect results for large inputs.

**Unsigned vs. signed confusion:**
The same adder circuit works for both unsigned and two's complement signed numbers. But overflow detection differs, and comparison requires different interpretation.

**Don't-care propagation:**
Optimization using don't-cares can cause unexpected behavior if "impossible" input combinations occur due to bugs elsewhere.

## Where You'll See It

**ALU (Arithmetic Logic Unit):**
The core computational engine of every CPU. Multiplexers select between operations (add, subtract, AND, OR, etc.). The adder handles arithmetic.

**Address decoding:**
Memory systems use decoders to select which chip responds to an address. A 3-to-8 decoder enables one of 8 memory banks.

**Instruction decoding:**
The CPU's control unit is largely combinational—opcode bits select which control signals to activate.

**Data routing:**
Multiplexers throughout the CPU select data sources: register file output, memory data, immediate values, ALU result.

**Barrel shifters:**
Shift by N positions in O(log N) time using a cascade of multiplexer stages. Used for floating-point normalization and cryptographic operations.

**Parity and CRC generators:**
XOR trees compute parity bits and CRC checksums for error detection—pure combinational logic.
`,
  },
  {
    id: "0-1-5",
    layerSlug: "the-machine",
    chapterSlug: "digital-logic",
    slug: "0-1-5",
    sectionNumber: "0.1.5",
    title: "Sequential Circuits",
    summary: "Memory enters — flip-flops and state.",
    illustrationKey: "sequential-circuits",
    content: `## The Idea

Sequential circuits have **memory**. Their outputs depend not just on current inputs, but on the history of past inputs—the circuit's **state**.

This is where computation becomes interesting. Combinational circuits can transform data, but sequential circuits can **remember**, **count**, **sequence**, and **decide based on history**. Without sequential logic, there are no programs, no stored data, no computers as we know them.

The fundamental building block is the **flip-flop**: a circuit that stores one bit and updates it only at specific moments (clock edges).

## The Mechanics

**The SR Latch** — Simplest memory element
\`\`\`
    ┌───┐
S ──┤NOR├──┬── Q
    └───┘  │
        ┌──┘
        │
    ┌───┐
R ──┤NOR├──┴── Q̄
    └───┘

S=1, R=0 → Q=1 (Set)
S=0, R=1 → Q=0 (Reset)
S=0, R=0 → Q=Q (Hold - remembers!)
S=1, R=1 → Forbidden (undefined)
\`\`\`

The magic: when S=R=0, each NOR gate's output depends on the other's output. The circuit is stable in either state—it remembers which state it was last put in.

**The D Flip-Flop** — Edge-triggered, single input
\`\`\`
        ┌─────────┐
    D ──┤         │
        │  D-FF   ├── Q
CLK ────┤         │
        │    ↑    ├── Q̄
        └─────────┘

On rising edge of CLK: Q ← D
Between edges: Q holds its value
\`\`\`

The D flip-flop captures input D exactly at the clock edge and holds it until the next edge. This synchronizes all state changes to the clock, making timing analysis tractable.

**The JK Flip-Flop** — Toggle capability
\`\`\`
J=0, K=0 → Hold
J=1, K=0 → Set (Q=1)
J=0, K=1 → Reset (Q=0)
J=1, K=1 → Toggle (Q=¬Q)
\`\`\`

**Register** — Multiple flip-flops storing a word
\`\`\`
   D[7:0] ────┬────┬────┬────┬────┬────┬────┬────
              │    │    │    │    │    │    │    │
CLK ─────────┼────┼────┼────┼────┼────┼────┼────┤
              │    │    │    │    │    │    │    │
   Q[7:0] ←──FF7──FF6──FF5──FF4──FF3──FF2──FF1──FF0
\`\`\`

**Finite State Machine (FSM):**
\`\`\`
                    ┌──────────┐
    Inputs ────────►│          │
                    │   Next   │──────► Outputs
    Current ───────►│  State   │
    State           │  Logic   │
      ▲             └──────────┘
      │                   │
      │    ┌──────────┐   │
      └────┤ State    │◄──┘
           │ Register │
           └──────────┘
                ▲
                │
              CLK
\`\`\`

The state register holds current state. Combinational logic computes next state and outputs. On each clock edge, next state becomes current state.

## Trade-offs

**Latches vs. flip-flops:**

Latches are level-sensitive (transparent while clock is high). Simpler, fewer transistors, but timing analysis is harder—any input change while enabled affects output.

Flip-flops are edge-sensitive. More transistors, but changes happen only at discrete moments, simplifying timing.

**Mealy vs. Moore FSMs:**

Moore: Outputs depend only on state. Outputs change synchronously with clock. Simpler to design, often needs more states.

Mealy: Outputs depend on state AND inputs. Can respond faster (combinationally), needs fewer states, but outputs can glitch.

**One-hot vs. encoded state:**

One-hot: One flip-flop per state. Fast (next state is simple MUX), easy to debug, but uses more flip-flops.

Encoded: log2(N) flip-flops for N states. Compact but requires decoder logic.

**Clock speed vs. setup time:**

Higher clock frequency means less time between edges. But flip-flops need minimum **setup time** (data stable before edge) and **hold time** (data stable after edge). Violating these causes metastability.

## Failure Modes

**Setup/hold violations:**
If data changes too close to clock edge, the flip-flop may capture an intermediate value or enter metastability—an unstable state between 0 and 1 that takes unpredictable time to resolve.

**Clock skew:**
Different flip-flops receive the clock at slightly different times. If skew exceeds margins, one flip-flop's output may not reach another's input in time.

**Metastability:**
When sampling an asynchronous signal, there's always some probability of metastability. Synchronizer chains (2+ flip-flops in series) reduce but never eliminate this risk.

**Reset races:**
If asynchronous reset releases close to a clock edge, some flip-flops may reset while others don't—causing inconsistent state.

**State machine lockup:**
If the FSM enters an unintended state (due to noise, radiation, or bugs), it may be stuck. Safe designs ensure all states have transitions back to valid states.

## Where You'll See It

**CPU pipeline registers:**
Each pipeline stage is separated by registers. On each clock, instructions advance one stage—fetch to decode to execute to writeback.

**Memory:**
SRAM uses flip-flops (6 transistors per bit). DRAM uses capacitors with refresh—conceptually similar to level-sensitive latches.

**Counters:**
Binary counters are FSMs that cycle through 2^N states. Used for program counters, timers, address generation.

**Shift registers:**
Serial data is clocked in one bit at a time, shifting previous bits. Used for serial communication (UART, SPI) and certain algorithms.

**Protocol state machines:**
Network protocols (TCP, USB, PCIe) are implemented as FSMs. Each packet type causes specific state transitions.

**Control logic:**
The CPU's control unit is an FSM that sequences through microoperations: fetch instruction, decode, read operands, execute, write result.
`,
  },
  {
    id: "0-1-6",
    layerSlug: "the-machine",
    chapterSlug: "digital-logic",
    slug: "0-1-6",
    sectionNumber: "0.1.6",
    title: "The Clock",
    summary: "Synchronization — why timing matters.",
    illustrationKey: "clock-signal",
    content: `## The Idea

The clock is the heartbeat of digital systems. It's a signal that oscillates between 0 and 1 at a fixed frequency, providing a shared reference for when things should happen.

Without a clock, sequential circuits would be chaos—flip-flops updating at random times, signals racing unpredictably through logic, no way to coordinate the millions of operations happening simultaneously.

The clock solves the synchronization problem: all state changes happen at clock edges. Between edges, signals can bounce and settle. At the edge, stable values are captured. This converts analog timing messiness into clean digital steps.

## The Mechanics

**Clock signal characteristics:**

\`\`\`
    ┌───┐   ┌───┐   ┌───┐   ┌───┐
    │   │   │   │   │   │   │   │
────┘   └───┘   └───┘   └───┘   └───

    |←─────── Period (T) ──────→|
    |←─ Thigh ─→|

Frequency (f) = 1/T
Duty cycle = Thigh/T (often 50%)
\`\`\`

**Clock domains:**
Large systems have multiple clocks. Each clock defines a **domain**—a set of flip-flops that share timing. Crossing between domains requires synchronization.

**Clock generation:**

**Crystal oscillator:** Piezoelectric crystal vibrates at precise frequency (MHz range). Very stable—parts per million accuracy.

**PLL (Phase-Locked Loop):** Takes reference clock and generates higher frequencies by multiplication. A 100 MHz reference becomes 4 GHz internal clock.
\`\`\`
Reference ──►[Phase    ]──►[Loop    ]──►[VCO]──┬──► Output
   Clock     [Detector]    [Filter ]          │
                ▲                              │
                └───────[÷N]◄─────────────────┘
\`\`\`

**Clock distribution:**

Clock must reach every flip-flop with minimal skew. Clock trees use buffers arranged in H-tree or spine patterns to balance path lengths. In modern CPUs, clock distribution consumes significant power.

**Timing constraints:**

\`\`\`
    ┌─────────────────────────────────────┐
    │            Clock Period              │
    ├────────┬───────────────────┬────────┤
    │ tsetup │    Logic delay    │ thold  │
    │        │    (must fit)     │        │
    └────────┴───────────────────┴────────┘

Maximum frequency = 1 / (tlogic + tsetup + tskew + margin)
\`\`\`

**Setup time (tsetup):** How long before clock edge data must be stable
**Hold time (thold):** How long after clock edge data must remain stable
**Clock-to-Q (tCQ):** Delay from clock edge to flip-flop output changing

## Trade-offs

**Higher frequency vs. power:**
Power has three components:
- **Dynamic:** P = CV²f — linear with frequency
- **Short-circuit:** During transitions, both pull-up and pull-down conduct briefly
- **Leakage:** Static current, independent of frequency

Doubling frequency roughly doubles power (dynamic portion).

**Global clock vs. multiple domains:**

Single clock: Simple timing analysis, no synchronization issues
Multiple clocks: Each domain optimized for its needs, but crossing requires careful synchronization (latency, metastability risk)

**Synchronous vs. asynchronous:**

Synchronous: All changes at clock edges. Easy to design and verify, but clock distribution is challenging and imposes global timing constraints.

Asynchronous: Operations complete when ready, handshaking between stages. Potentially faster and lower power, but much harder to design and verify. Rarely used except in specialized applications.

**Clock gating:**
\`\`\`
            ┌─────┐
Clock ──────┤ AND ├──── Gated Clock
            └──┬──┘
Enable ────────┘
\`\`\`
Stopping the clock to idle circuits saves power but must be done carefully to avoid glitches.

## Failure Modes

**Clock jitter:**
Variation in clock edge timing from cycle to cycle. Reduces available time for logic. Sources: power supply noise, thermal variation, PLL instability.
\`\`\`
Ideal:    ┌───┐   ┌───┐   ┌───┐
          │   │   │   │   │   │
──────────┘   └───┘   └───┘   └───

Jitter:   ┌───┐    ┌──┐   ┌────┐
          │   │    │  │   │    │
──────────┘   └────┘  └───┘    └──
               ↑        ↑
            Early    Late
\`\`\`

**Clock skew:**
Different arrival times at different flip-flops. Can cause hold violations (if receiving flip-flop's clock arrives late) or setup violations (if sending flip-flop's clock arrives late).

**Electromagnetic interference:**
High-frequency clocks radiate. Spread-spectrum clocking slightly varies frequency to reduce peak emissions, at cost of increased jitter.

**Power supply droop:**
When many flip-flops switch simultaneously (all on same clock edge), current demand spikes. If power supply can't respond fast enough, voltage drops, potentially causing timing failures.

**PLL loss of lock:**
If reference clock is disturbed, PLL may lose synchronization and output wrong frequency or unstable signal. Systems need detection and recovery mechanisms.

## Where You'll See It

**CPU specifications:**
"4.8 GHz boost clock" means flip-flops switch 4.8 billion times per second. Base clock vs. boost clock reflects thermal/power headroom.

**Memory timing:**
DDR4-3200 operates at 1600 MHz clock (data on both edges = 3200 MT/s). Memory timings like CAS latency are measured in clock cycles.

**Display refresh:**
60 Hz, 144 Hz, 240 Hz monitors—each frame drawn in sync with display clock. Variable refresh rate (G-Sync, FreeSync) adjusts clock to match GPU output.

**Serial protocols:**
UART: Asynchronous, samples at ~16x baud rate
SPI: Synchronous, clock provided by master
I2C: Synchronous, clock stretched by slow devices
PCIe: Clock embedded in data stream, recovered by receiver

**Real-time systems:**
Hard real-time requires deterministic timing. Clock accuracy affects deadline guarantees. NTP and PTP synchronize clocks across networked systems.

**Overclocking:**
Increasing clock beyond rated speed. Works until:
- Logic can't complete in shortened period
- Power delivery can't handle increased current
- Thermals exceed safe limits
- Stability degrades (soft errors increase)
`,
  },
];

// Helper functions
export const getDigitalLogicTopic = (slug: string) =>
  DIGITAL_LOGIC_TOPICS.find((t) => t.slug === slug);

export const getDigitalLogicTopicByIndex = (index: number) =>
  DIGITAL_LOGIC_TOPICS[index];

export const getAllDigitalLogicTopics = () => DIGITAL_LOGIC_TOPICS;
