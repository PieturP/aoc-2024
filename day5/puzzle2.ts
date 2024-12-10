import { distinct } from "jsr:@std/collections/distinct";
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

/**
 * Took a little while to write this....
 *
 * @param orderingRules
 * @returns
 */
function determinePageOrder(orderingRules: IOrderingRules[]): number[] {
  const pagesBeforeMap = new Map();
  let out: number[] = [];

  // First, determine all unique page numbers, so we don't walk possible values twice (or more)
  const uniquePages = distinct(
    [
      ...orderingRules.map((rule) => rule.a),
      ...orderingRules.map((rule) => rule.b),
    ],
  );

  // ...Then for all these pages, find every page *before* it and put it in the pagesBeforeMap
  uniquePages.forEach((a) => {
    const pagesBefore = orderingRules
      .filter((rule) => rule.a === a)
      .map((rule) => rule.b);
    pagesBeforeMap.set(a, pagesBefore);
  });

  console.info({ pagesBeforeMap });

  // Now walk it all
  pagesBeforeMap.forEach((pagesBefore: number[], page) => {
    const shouldGoRight = out.indexOf(page) === -1;
    if (shouldGoRight) {
      pagesBefore.forEach((p) => {
        const iP = out.indexOf(p);
        if (iP === -1) {
          out.push(p);
        } else {
          console.log("Already in place", p);
          // out = [
          //   ...out.slice(0, iP + 1),
          //   page,
          //   ...out.slice(iP),
          // ];
          // console.log({
          //   "pageLoop": true,
          //   page,
          //   p,
          //   iP,
          //   out,
          // });
          // Deno.exit();
        }
      });
      out.push(page);
    } else {
      pagesBefore.forEach((p) => {
        const idx = out.indexOf(p);

        if (idx === -1) {
          console.log({
            "shouldGoLeft": true,
            "pageBefore already there": false,
            page,
            pos: out.indexOf(page),
            p,
            idx,
            out,
            pagesBefore,
          });
          Deno.exit();
        } else {
          console.log({
            "shouldGoLeft": true,
            "pageBefore already there": true,
            page,
            pos: out.indexOf(page),
            p,
            idx,
            out,
            pagesBefore,
          });
          Deno.exit();
          // shuffle??
        }
      });
    }
  });

  console.log({ out });
  Deno.exit();
  // But reversed :)

  return out.reverse();
}

function sortUpdate(update: number[], orderedPages: number[]): number[] {
  const out: number[] = [];
  update.map((page) => {
    out[
      orderedPages.indexOf(page) > -1
        ? orderedPages.indexOf(page)
        : orderedPages.length
    ] = page;
  });
  return out.flat();
}

export function puzzle2(): number {
  const data = puzzleData();
  const pageOrder = determinePageOrder(data.orderingRules);

  console.log(pageOrder);
  Deno.exit();

  let out = 0;

  data.updates.map((update) => {
    if (!validateUpdate(update, data.orderingRules)) {
      const sortedUpdate = sortUpdate(update, pageOrder);
      // console.log({
      //   update,
      //   sortedUpdate,
      //   middle: getMiddlePageFromUpdate(sortedUpdate),
      // });

      out += getMiddlePageFromUpdate(sortedUpdate);
    }
  });

  return out;
}
