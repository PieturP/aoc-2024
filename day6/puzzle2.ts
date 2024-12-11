import { puzzleData } from "./puzzleData.ts";
import { count } from "https://deno.land/x/ayonli_jsext@0.9.80/esm/string/index.js";
import { walkData } from "./puzzle1.ts";

interface PosDir {
  x: number;
  y: number;
  direction: number;
}

let maxX = 0, maxY = 0;

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

function initializeData(): string[][] {
  const data = puzzleData();
  maxY = data.length - 1;
  maxX = data[0].length - 1;
  return data;
}

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

function getPossibleObstructionPositions(): number[][] {
  const out: number[][] = [];
  const lines = walkData().split("\n");
  lines.forEach((line, y) => {
    line.split("").forEach((v, x) => {
      if (v === "X") {
        out.push([x, y]);
      }
    });
  });
  return out;
}

export function puzzle2(): number {
  return 0;
}

export function __puzzle2(): number {
  const positions = getPossibleObstructionPositions();
  const total = positions.length;
  let endlessLoopCount = 0;
  let str: string;
  let data;

  positions.forEach(([x, y], i) => {
    console.log(`${i} / ${total}, ${Math.round(i / total * 100)}%`);
    data = initializeData();
    let nexPos = getCurrentPositionAndDirection(data);

    function walkData(data: string[][]): string {
      nexPos = getNextPosition(nexPos, data);

      if (nexPos.direction !== -1) {
        data[nexPos.y][nexPos.x] = "X";
        walkData(data);
      }

      return data.map((line: any[]) => line.join("")).join("\n");
    }

    data[y][x] = "#";

    try {
      str = walkData(data);
    } catch (exception) {
      endlessLoopCount++;
      console.log({ x, y, loops: true });
    }
  });

  return endlessLoopCount;
}
