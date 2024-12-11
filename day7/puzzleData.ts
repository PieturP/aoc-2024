const INPUT_FILENAME = "testData.txt";
const NL = "\n";

export interface EnumOperatorTest {
  test: number;
  operands: number[];
}

export interface EnumOperatorTests extends Array<EnumOperatorTest> {}

///

export function puzzleData(): EnumOperatorTests {
  const data = Deno
    .readTextFileSync(`${import.meta.dirname}/${INPUT_FILENAME}`)
    .split(NL);

  const out: EnumOperatorTests = [];

  data.forEach((entry) => {
    const line = entry.split(":");
    const operands = line[1]
      .split(" ")
      .filter((operand) => operand)
      .map((
        operand,
      ) => parseInt(operand, 10));

    out.push({
      test: parseInt(line[0], 10),
      operands,
    });
  });

  return out;
}
