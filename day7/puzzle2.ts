import { isEmoji } from "https://deno.land/x/ayonli_jsext@0.9.80/esm/string.js";
import { EnumOperatorTest, puzzleData } from "./puzzleData.ts";

const operators = {
  "add": (opA: number, opB: number) => opA + opB,
  "mul": (opA: number, opB: number) => opA * opB,
  "com": (opA: number, opB: number) => parseInt(`${opA}${opB}`, 10),
};

function getOperator(i: number) {
  if (i === 2) {
    return operators["com"];
  }
  if (i === 1) {
    return operators["mul"];
  }
  return operators["add"];
}

function isValid(test: EnumOperatorTest): boolean {
  const l = test.operands.length - 1; // how many positions for operators
  const complexity = Math.pow(
    Object.entries(operators).length, // 2
    l,
  );

  console.log("\n\n");
  console.log(test, complexity);

  let ii;
  for (let i = 0; i < complexity; i++) {
    let out = 0;
    let operantA = test.operands[0];

    console.log("\n");
    for (let j = 0; j < l; j++) {
      ii = (i & (3 << j)) % 3;

      const operator = getOperator(ii);

      const operantB = test.operands[j + 1];
      out = operator(operantA, operantB);

      console.log(ii, j, ii, operator, operantA, operantB, out);
      operantA = out;
    }
    if (out === test.test) {
      console.dir({ "isValid": test });
      return true;
    }
  }

  return false;
}

export function puzzle2(): number {
  // const lines = puzzleData();
  // console.log(isValid(lines[1]));
  // return 43;
  return puzzleData()
    .filter((line) => isValid(line))
    .map((line) => line.test)
    .reduce((prev, cur) => prev += cur);
}
