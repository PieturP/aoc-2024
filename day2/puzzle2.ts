import { puzzleData } from "./puzzleData.ts";

const DELIMITER = " ";
const THRESHOLD = 3;

let trend = 0; // direction (-1 decreasing, 1 increasing)

function compare(levelA: number, levelB: number, levels: number[]): boolean {
  if (levelA === levelB ) {
    console.log('NEITHER INCREASE OR DECREASE', levels);
    return false;
  }

  if (levelB > levelA) {
    if (trend === -1) {
      console.log('INCREASE AFTER DECREASE', levels);
      return false;
    }
    trend = 1;
  }

  if (levelB < levelA) {
    if (trend === 1) {
      console.log('DECREASE AFTER INCREASE', levels);
      return false;
    }
    trend = -1;
  }

  if (Math.abs(levelA - levelB) > THRESHOLD) {
    console.log('THRESHOLD TOO HIGH', levels, '>> ' + Math.abs(levelA - levelB));
    return false;
  }
  return true;
}

function walkLevels(levels: number[]): boolean
{
  trend = 0;
  for (let i = 0; i < levels.length - 1; i++) {
    const levelA = levels[i];
    const levelB = levels[i + 1];
    if (!compare(levelA, levelB, levels)) {
      return false;
    }
  }
  return true;
}

function dampen(levels: number[]): number[][]
{
  const out = [];
  for (let i = 0; i < levels.length; i++) {
    const mutated = [...levels];
    mutated.splice(i, 1);
    out.push(mutated);
  }
  return out;
}

export function puzzle2(): number {
  let out = 0;

  puzzleData().map((record) => {
    const levels = record.split(DELIMITER).map((level) => parseInt(level, 10));
    let safe = walkLevels(levels);

    if (!safe) {
      const dampened = dampen(levels);

      for (let i = 0; i < dampened.length; i++) {
        if (walkLevels(dampened[i])) {
          console.log('DAMPENED', levels, dampened[i]);
          safe = true;
          break;
        }
      }
    }

    if (safe) {
      out++;
    }
  });

  return out;
}
