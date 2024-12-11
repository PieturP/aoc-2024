import { parseArgs } from "jsr:@std/cli/parse-args";

const flags = parseArgs(Deno.args, {
  string: ["day"],
});

function error(msg: string) {
  console.log("%c" + msg, "color: red");
  Deno.exit(-1);
}

if (import.meta.main) {
  let input = (flags.day) as string;
  if (!input) {
    input =
      prompt("Please enter a day (0 - 25) to fetch the puzzle outcome", "") ||
      "";
  }
  if (!input) {
    error("No day specified.");
  }

  const day = parseInt(input, 10);
  if (!day || day < 1 || day > 24) {
    error("Day not valid");
  }

  let module1, module2;
  try {
    module1 = await import(`./day${day}/puzzle1.ts`);
    module2 = await import(`./day${day}/puzzle2.ts`);
  } catch (_error) {
    console.dir(_error);
    error("Module not found");
  }

  console.log("");
  console.log(`Going to run puzzles for: %cday ${day}`, "color: cyan");

  const timeStart = performance.now();
  // console.log("Output for puzzle 1", module1.puzzle1());
  console.log("Output for puzzle 2", module2.puzzle2());
  const timeEnd = performance.now();
  console.log();
  console.log(
    `Puzzles took: %c${(timeEnd - timeStart)} milliseconds %cin total`,
    "color: cyan",
    "color: normal",
  );

  Deno.exit(0);
}
