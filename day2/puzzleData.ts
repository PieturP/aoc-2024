const INPUT_FILENAME = "./day2/puzzleData.txt";
const EOL = "\n";

export function getInputData(): string {
  return Deno.readTextFileSync(INPUT_FILENAME);
}

export function puzzleData() {
  return getInputData().split(EOL);
}
