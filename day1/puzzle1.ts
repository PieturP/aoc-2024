import { puzzleData } from "./puzzleData.ts";

export function puzzle1(): number {
  let out = 0;

  const data = puzzleData();
  data.left.sort();
  data.right.sort();

  for (let index = 0; index < data.left.length; index++) {
    out += Math.abs(
      data.left[index] - data.right[index],
    );
  }

  return out;
}
