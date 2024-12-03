import { puzzleData } from "./puzzleData.ts";

export function puzzle2(): number {
  let enabled = true;

  /* operations: */
  function _mul(a: number, b: number): number {
    if (!enabled) {
      return 0;
    }
    return a * b;
  }
  function _do() {
    enabled = true;
  }
  function _dont() {
    enabled = false;
  }

  /* parse: */
  let out = 0;

  const instructions = puzzleData().match(
    /(mul\(([0-9]{1,3}),([0-9]{1,3})\))|(do\(\))|(don't\(\))/g,
  );
  if (!instructions) {
    return 0;
  }

  instructions.map((instruction) => {
    instruction = instruction.replace("'", "");
    const output = eval(`_${instruction}`); // 😱
    // console.log(instruction, output);

    out += output || 0;
  });

  return out;
}
