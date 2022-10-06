#!/usr/bin/env node

import svgstore from "svgstore";
import fs from "fs";
import path from "path";
import fg from "fast-glob";
import { optimize } from "svgo";
import yargs from "yargs";

const argv = yargs(process.argv.slice(2))
  .usage("Usage: $0 -i [string] -o [string]")
  .demandOption(["i", "o"])
  .describe("i", "Input path to folder containing .svg, e.g. src/svg/")
  .describe("o", "Output path of sprite, e.g. public/sprite.svg")
  .help().argv;

const icons = fg.sync([path.join(process.cwd(), argv.i, "*.svg")], {
  objectMode: true,
});

// Initiate the sprite with svgstore
const sprite = svgstore({
  // Add these attributes to the sprite SVG
  svgAttrs: {
    style: "display: none;",
    "aria-hidden": "true",
    xmlns: "http://www.w3.org/2000/svg",
  },
  // Copy these attributes from the icon source SVG to the symbol in the sprite
  copyAttrs: ["width", "height"],
});

// Loop through each icon in the list
icons.forEach(({ name: filename, path }) => {
  const name = filename.replace(".svg", "");
  // Log the name of the icon and its title to the console
  console.log(`Transforming \x1b[32m${filename}\x1b[0m`);

  const svgFile = fs
    .readFileSync(path, "utf8")
    // Make its dimensions relative to the surounding text
    .replace(/width="(\d*)"/, 'width="100%"')
    .replace(/height="(\d*)"/, 'height="100%"');

  const svgoResult = optimize(svgFile, {
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {},
        },
      },
      {
        name: "addCurrentColor",
        type: "perItem",
        fn: (ast, params, info) => {
            ast.attributes.fill = "currentColor";
        },
      },
    ],
  });

  const svgoOutput = svgoResult.data;
  // Add title
  const optimizedsvgFile = svgoOutput.replace(
    /(<svg [a-z -"=\/\. \d:]*>)/g,
    `$1<title id="${name}-icon">${name}</title>`
  );

  // Add the new symbol to the sprite
  sprite.add(`symbol-${name}`, optimizedsvgFile, {
    // Add attributes for accessibility
    symbolAttrs: {
      "aria-labelledby": `${name}-icon`,
      role: "img",
    },
  });
});

fs.writeFileSync(
  path.join(process.cwd(), argv.o),
  sprite.toString({ inline: true })
);
