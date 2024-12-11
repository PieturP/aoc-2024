import { puzzleData } from "./puzzleData.ts";

interface PosDir {
  x: number;
  y: number;
  direction: number;
}

function getMaxY(data: string[][]) {
  return data.length - 1;
}
function getMaxX(data: string[][]) {
  return data[0].length - 1;
}

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
  for (y = 0; y < getMaxY(data); y++) {
    for (x = 0; x < getMaxX(data); x++) {
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

  if (ny > getMaxY(data) || ny < 0) {
    return OFFLIMIT;
  }
  if (nx > getMaxX(data) || nx < 0) {
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

function puzzle1AsString(): string {
  const data = puzzleData();
  let nextPos = getCurrentPositionAndDirection(data);

  function walkData(): string {
    nextPos = getNextPosition(nextPos, data);

    if (nextPos.direction !== -1) {
      data[nextPos.y][nextPos.x] = "X";
      walkData();
    }

    return data.map((line) => line.join("")).join("\n");
  }
  return walkData();
}

function getPossibleObstructionPositions(): number[][] {
  const out: number[][] = [];
  const lines = puzzle1AsString().split("\n");
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
  const positions = getPossibleObstructionPositions();
  const total = positions.length;

  let endlessLoopCount = 0;
  let _str: string;

  positions.forEach(([x, y], i) => {
    console.log(
      `Brute forcing output for puzzle 2: ${
        Math.round(i / total * 100)
      }%, (${i}/${total})`,
    );

    const data = puzzleData();
    let nextPosition = getCurrentPositionAndDirection(data);

    function walkData(data: string[][]): string {
      nextPosition = getNextPosition(nextPosition, data);

      if (nextPosition.direction !== -1) {
        data[nextPosition.y][nextPosition.x] = "X";
        walkData(data);
      }

      return data.map((line: any[]) => line.join("")).join("\n");
    }

    data[y][x] = "#";

    try {
      _str = walkData(data);
    } catch (_ex) {
      // console.log(_str);
      endlessLoopCount++;
    }
  });

  return endlessLoopCount;
}
