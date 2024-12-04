const INPUT_FILENAME = "./day4/puzzleData.txt";

export function puzzleData(): string[][] {
  const out = [];
  const lines = Deno.readTextFileSync(INPUT_FILENAME).split("\n");
  for (let i = 0; i < lines.length; i++) {
    out[i] = lines[i].split("");
  }
  return out;
}
