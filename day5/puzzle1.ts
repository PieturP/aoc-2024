import { IOrderingRules, puzzleData } from "./puzzleData.ts";

function existsRule(
  pageA: number,
  pageB: number,
  orderingRules: IOrderingRules[],
): boolean {
  const item = orderingRules.find((candidate) =>
    candidate.a === pageA && candidate.b === pageB
  );
  if (item) {
    return true;
  }
  return false;
}

function validateUpdate(update: number[], orderingRules: IOrderingRules[]) {
  for (let i = 0; i < update.length; i++) {
    const pageA = update[i];
    for (let j = i + 1; j < update.length; j++) {
      const pageB = update[j];
      if (!existsRule(pageA, pageB, orderingRules)) {
        return false;
      }
    }
  }
  return true;
}

function getMiddlePageFromUpdate(update: number[]): number {
  return update[Math.floor((update.length - 1) / 2)];
}

export function puzzle1(): number {
  const data = puzzleData();
  let out = 0;

  data.updates.map((update) => {
    if (validateUpdate(update, data.orderingRules)) {
      out += getMiddlePageFromUpdate(update);
    }
  });

  return out;
}
