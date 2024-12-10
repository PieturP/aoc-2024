const INPUT_FILENAME = "testData.txt";
const NL = "\n";

export interface IOrderingRules {
  a: number;
  b: number;
}

export interface IPuzzleData {
  orderingRules: IOrderingRules[];
  updates: number[][];
}

export function puzzleData(): IPuzzleData {
  const data = Deno
    .readTextFileSync(`${import.meta.dirname}/${INPUT_FILENAME}`)
    .split(NL + NL);

  return {
    orderingRules: data[0].split(NL).map((el) => {
      const out = el.split("|").map((el) => parseInt(el, 10));
      return { a: out[0], b: out[1] };
    }),
    updates: data[1].split(NL).map((udate) =>
      udate.split(",").map((pageNum) => parseInt(pageNum, 10))
    ),
  };
}
