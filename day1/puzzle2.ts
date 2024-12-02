import { puzzleData } from "./puzzleData.ts";

function countFrequency(test: number, arr: number[]): number {
  let out = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === test) {
      out++;
    }
  }

  return out;
}

export function puzzle2(): number {
  let out = 0;

  const data = puzzleData();

  for (let index = 0; index < data.left.length; index++) {
    const left = data.left[index];
    out += left * countFrequency(left, data.right);
  }

  return out;
}
