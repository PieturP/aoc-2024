import { PuzzleData } from "./PuzzleData.d.ts";

const INPUT_FILENAME = "./day1/puzzleData.txt";
const EOL = "\n";
const DELIMITER = "   ";

export function getInputData(): string {
  return Deno.readTextFileSync(INPUT_FILENAME);
}

export function puzzleData(): PuzzleData {
  const left = [] as number[];
  const right = [] as number[];

  getInputData()
    .split(EOL)
    .map((line) => {
      const split: string[] = line.split(DELIMITER);
      left.push(parseInt(split[0], 10));
      right.push(parseInt(split[1], 10));
    }
  )

  return {
    left,
    right
  }
}
