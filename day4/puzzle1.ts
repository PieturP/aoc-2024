import { puzzleData } from "./puzzleData.ts";

// Took inspiration from https://www.geeksforgeeks.org/search-a-word-in-a-2d-grid-of-characters/
function search2D(
  grid: string[][],
  row: number,
  col: number,
  word: string,
): number {
  let count = 0;

  // Check first character
  if (grid[row][col] !== word[0]) {
    return 0;
  }

  // deno-fmt-ignore
  const directions  = [
    {x: -1, y: -1},
    {x: -1, y:  0},
    {x: -1, y:  1},
    {x:  0, y: -1},
    {x:  0, y:  1},
    {x:  1, y: -1},
    {x:  1, y:  0},
    {x:  1, y:  1},
  ];

  directions.map((direction) => {
    let currX = row + direction.x;
    let currY = col + direction.y;

    let i: number;
    for (i = 1; i < word.length; i++) {
      if (
        currX >= grid.length ||
        currX < 0 ||
        currY >= grid[0].length ||
        currY < 0
      ) {
        break;
      }
      if (grid[currX][currY] !== word[i]) {
        break;
      }
      //  Move to next position in this direction:
      currX += direction.x;
      currY += direction.y;
    }

    // All checked :)
    if (i === word.length) {
      count++;
    }

    // .. up to next direction
  });

  return count;
}

export function puzzle1(): number {
  const lines = puzzleData();
  let out = 0;

  lines.forEach((line, row) =>
    line.forEach((_item, col) => {
      out += search2D(lines, row, col, "XMAS");
    })
  );

  return out;
}
