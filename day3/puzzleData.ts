const INPUT_FILENAME = "./day3/puzzleData.txt";

export function puzzleData(): string {
  return Deno.readTextFileSync(INPUT_FILENAME);
}
