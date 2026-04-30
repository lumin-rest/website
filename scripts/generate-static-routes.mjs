import fs from "node:fs/promises";
import path from "node:path";

const buildDir = path.resolve("build");
const indexPath = path.join(buildDir, "index.html");

const routeMeta = {
  home: {
    title: "lumin.rest - Premium Roblox Script Hub",
    description:
      "lumin.rest is a premium Roblox script hub supporting Grace, Build a Boat for Treasure, Murder Mystery 2, and more.",
    keywords:
      "lumin.rest, lumin, roblox, script hub, best roblox script, working roblox script 2025, tower of hell script, grace script, build a boat script, murder mystery 2 script, rivals script",
    url: "https://lumin.rest/",
    image: "https://lumin.rest/icon.png",
  },
  key: {
    title: "Get Your Key - lumin.rest",
    description:
      "Get free or premium access to lumin.rest, a premium Roblox script hub with support for Grace, Build a Boat for Treasure, Murder Mystery 2, and more.",
    keywords: "lumin.rest key, lumin key system, roblox script key, free roblox script access, lumin premium",
    url: "https://lumin.rest/key/",
    image: "https://lumin.rest/icon.png",
  },
};

const defaultRoutes = ["privacy", "tos", "milenium-preview"];

function injectMeta(html, { title, description, keywords, url, image }) {
  const metaTags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<meta name="keywords" content="${keywords}" />`,
    `<meta name="author" content="lumin.rest" />`,
    `<meta name="robots" content="index, follow" />`,
    `<meta name="theme-color" content="#f8bfd4" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:site_name" content="lumin.rest" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:alt" content="lumin.rest logo" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:url" content="${url}" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<meta name="twitter:image:alt" content="lumin.rest logo" />`,
  ].join("\n    ");

  // Strip all existing meta/title/link tags from <head> then inject fresh set
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description"[^>]*\/>/g, "")
    .replace(/<meta name="keywords"[^>]*\/>/g, "")
    .replace(/<meta name="author"[^>]*\/>/g, "")
    .replace(/<meta name="robots"[^>]*\/>/g, "")
    .replace(/<meta name="theme-color"[^>]*\/>/g, "")
    .replace(/<link rel="canonical"[^>]*\/>/g, "")
    .replace(/<meta property="og:[^>]*\/>/g, "")
    .replace(/<meta name="twitter:[^>]*\/>/g, "")
    .replace("</head>", `    ${metaTags}\n  </head>`);
}

async function main() {
  const indexHtml = await fs.readFile(indexPath, "utf8");

  // Patch root index.html with home page meta
  await fs.writeFile(indexPath, injectMeta(indexHtml, routeMeta.home));

  const { home: _home, ...subRoutes } = routeMeta;

  await Promise.all([
    ...defaultRoutes.map(async (route) => {
      const routeDir = path.join(buildDir, route);
      await fs.mkdir(routeDir, { recursive: true });
      await fs.writeFile(path.join(routeDir, "index.html"), injectMeta(indexHtml, routeMeta.home));
    }),
    ...Object.entries(subRoutes).map(async ([route, meta]) => {
      const routeDir = path.join(buildDir, route);
      await fs.mkdir(routeDir, { recursive: true });
      await fs.writeFile(
        path.join(routeDir, "index.html"),
        injectMeta(indexHtml, meta)
      );
    }),
  ]);
}

main().catch((error) => {
  console.error("Failed to generate static route entry points.");
  console.error(error);
  process.exitCode = 1;
});