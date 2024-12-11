import { EnumOperatorTest, puzzleData } from "./puzzleData.ts";

const operators = {
  "add": (opA: number, opB: number) => opA + opB,
  "mul": (opA: number, opB: number) => opA * opB,
};

function getOperator(b: boolean) {
  return b ? operators["mul"] : operators["add"];
}

function isValid(test: EnumOperatorTest): boolean {
  const l = test.operands.length - 1; // how many positions for operators
  const complexity = Math.pow(
    Object.entries(operators).length, // 2
    l,
  );

  // console.log("\n\n");
  // console.log(test, complexity);

  let b;
  for (let i = 0; i < complexity; i++) {
    let out = 0;
    let operantA = test.operands[0];

    console.log("\n");
    for (let j = 0; j < l; j++) {
      b = (i & (1 << j)) !== 0;
      const operator = getOperator(b);

      const operantB = test.operands[j + 1];
      out = operator(operantA, operantB);

      console.log(i, j, operator, operantA, operantB, out);
      operantA = out;
    }
    if (out === test.test) {
      console.dir({ "isValid": true, ...test });
      return true;
    }
  }

  return false;
}

export function puzzle1(): number {
  return puzzleData()
    .filter((line) => isValid(line))
    .map((line) => line.test)
    .reduce((prev, cur) => prev += cur);
}
