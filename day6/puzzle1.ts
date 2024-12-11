import { puzzleData } from "./puzzleData.ts";
import { count } from "https://deno.land/x/ayonli_jsext@0.9.80/esm/string/index.js";

interface PosDir {
  x: number;
  y: number;
  direction: number;
}

const data = puzzleData();
const maxY = data.length - 1;
const maxX = data[0].length - 1;

const OBSTACLE = "#";
// deno-fmt-ignore
const DIRECTIONS = [
  {x:  0, y: -1, c: '^'},
  {x:  1, y:  0, c: '>'},
  {x:  0, y:  1, c: 'V'},
  {x: -1, y:  0, c: '<'},
];

const OFFLIMIT = {
  x: -1,
  y: -1,
  direction: -1,
};

function getCurrentPositionAndDirection(
  data: string[][],
): PosDir {
  const guard = DIRECTIONS.map((dir) => dir.c);
  let y = 0, x = 0;
  for (y = 0; y < maxY; y++) {
    for (x = 0; x < maxX; x++) {
      if (guard.indexOf(data[y][x]) > -1) {
        return {
          x,
          y,
          direction: guard.indexOf(data[y][x]),
        };
      }
    }
  }
  return OFFLIMIT;
}

function getNextDirection(direction: number): number {
  direction++;
  if (direction > DIRECTIONS.length - 1) {
    return 0;
  }
  return direction;
}

function getNextPosition(current: PosDir, data: string[][]): PosDir {
  const nx = current.x + DIRECTIONS[current.direction].x;
  const ny = current.y + DIRECTIONS[current.direction].y;

  if (ny > maxY || ny < 0) {
    return OFFLIMIT;
  }
  if (nx > maxX || nx < 0) {
    return OFFLIMIT;
  }

  if (data[ny][nx] === OBSTACLE) {
    return getNextPosition({
      x: current.x,
      y: current.y,
      direction: getNextDirection(current.direction),
    }, data);
  }

  return {
    x: nx,
    y: ny,
    direction: current.direction,
  };
}

let nexPos = getCurrentPositionAndDirection(data);

export function walkData(): string {
  nexPos = getNextPosition(nexPos, data);

  if (nexPos.direction !== -1) {
    data[nexPos.y][nexPos.x] = "X";
    walkData();
  }

  return data.map((line) => line.join("")).join("\n");
}

export function puzzle1(): number {
  const data = walkData();
  console.log(data);

  return count(data, "X");
}
