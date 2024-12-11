const INPUT_FILENAME = "puzzleData.txt";
const NL = "\n";

export function puzzleData(): string[][] {
  const data = Deno
    .readTextFileSync(`${import.meta.dirname}/${INPUT_FILENAME}`)
    .split(NL) as string[] | string[][];

  return data.map((line, idx) => data[idx] = (line as string).split(""));
}
