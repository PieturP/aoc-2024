import { puzzleData } from "./puzzleData.ts";

function _mul(a: number, b: number): number {
  return a * b;
}

export function puzzle1(): number {
  let out = 0;

  const instructions = puzzleData().match(/mul\(([0-9]{1,3}),([0-9]{1,3})\)/g);
  if (!instructions) {
    return 0;
  }

  instructions.map((instruction) => {
    out += eval(`_${instruction}`); // 😱
  });

  return out;
}
