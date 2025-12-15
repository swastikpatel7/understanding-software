import TransistorSVG from "@/components/illustrations/TransistorSVG";
import LogicGatesSVG from "@/components/illustrations/LogicGatesSVG";
import HalfAdderSVG from "@/components/illustrations/HalfAdderSVG";
import FlipFlopSVG from "@/components/illustrations/FlipFlopSVG";
import ClockSignalSVG from "@/components/illustrations/ClockSignalSVG";
import CPUArchitectureSVG from "@/components/illustrations/CPUArchitectureSVG";
import MemoryLayoutSVG from "@/components/illustrations/MemoryLayoutSVG";

export type TopicIllustrations = {
  main: React.ReactElement;
  inline: Array<{
    component: React.ReactElement;
    title: string;
  }>;
};

// Illustration registry for Chapter 0.1: Digital Logic
export const getDigitalLogicIllustrations = (
  illustrationKey: string
): TopicIllustrations => {
  switch (illustrationKey) {
    case "transistor":
      return {
        main: <TransistorSVG />,
        inline: [
          {
            component: <LogicGatesSVG />,
            title: "Transistors combine to form logic gates",
          },
          {
            component: <MemoryLayoutSVG />,
            title: "Billions of transistors form memory arrays",
          },
          {
            component: <CPUArchitectureSVG />,
            title: "Processor built from transistor networks",
          },
        ],
      };

    case "boolean-algebra":
      return {
        main: <LogicGatesSVG />,
        inline: [
          {
            component: <TransistorSVG />,
            title: "Boolean operations implemented in silicon",
          },
          {
            component: <HalfAdderSVG />,
            title: "Boolean algebra enables arithmetic circuits",
          },
          {
            component: <FlipFlopSVG />,
            title: "Boolean logic with memory creates state machines",
          },
        ],
      };

    case "logic-gates":
      return {
        main: <LogicGatesSVG />,
        inline: [
          {
            component: <TransistorSVG />,
            title: "Gates built from transistor arrangements",
          },
          {
            component: <HalfAdderSVG />,
            title: "Gates compose into arithmetic circuits",
          },
          {
            component: <CPUArchitectureSVG />,
            title: "Millions of gates form processor logic",
          },
        ],
      };

    case "combinational-circuits":
      return {
        main: <HalfAdderSVG />,
        inline: [
          {
            component: <LogicGatesSVG />,
            title: "Built from basic gate primitives",
          },
          {
            component: <CPUArchitectureSVG />,
            title: "ALU is a complex combinational circuit",
          },
          {
            component: <MemoryLayoutSVG />,
            title: "Address decoders select memory locations",
          },
        ],
      };

    case "sequential-circuits":
      return {
        main: <FlipFlopSVG />,
        inline: [
          {
            component: <ClockSignalSVG />,
            title: "Clock synchronizes state changes",
          },
          {
            component: <LogicGatesSVG />,
            title: "Combinational logic computes next state",
          },
          {
            component: <MemoryLayoutSVG />,
            title: "Registers hold program state",
          },
        ],
      };

    case "clock-signal":
      return {
        main: <ClockSignalSVG />,
        inline: [
          {
            component: <FlipFlopSVG />,
            title: "Flip-flops capture data on clock edges",
          },
          {
            component: <CPUArchitectureSVG />,
            title: "Clock drives entire processor pipeline",
          },
          {
            component: <MemoryLayoutSVG />,
            title: "Memory timing synchronized to clock",
          },
        ],
      };

    default:
      return {
        main: <LogicGatesSVG />,
        inline: [
          {
            component: <TransistorSVG />,
            title: "Digital logic fundamentals",
          },
          {
            component: <HalfAdderSVG />,
            title: "Combinational circuits",
          },
          {
            component: <FlipFlopSVG />,
            title: "Sequential circuits",
          },
        ],
      };
  }
};

// Export all Digital Logic illustrations for easy access
export const DIGITAL_LOGIC_ILLUSTRATIONS = {
  transistor: () => <TransistorSVG />,
  "boolean-algebra": () => <LogicGatesSVG />,
  "logic-gates": () => <LogicGatesSVG />,
  "combinational-circuits": () => <HalfAdderSVG />,
  "sequential-circuits": () => <FlipFlopSVG />,
  "clock-signal": () => <ClockSignalSVG />,
};
