<?php

return [
  "bnomei.robots-txt.sitemap" => "/sitemap.xml",
  "bnomei.robots-txt.groups" => [
    "*" => [
      "disallow" => ["/kirby/", "/site/", "/panel"],
      "allow" => ["/media/"],
    ],
  ],
  "cache" => [
    "pages" => [
      "active" => true,
      "ignore" => function ($page) {
        return in_array($page->intendedTemplate()->name(), ["thanks", "error"]);
      },
    ],
  ],
  'debug' => false,
  "jukra00.simple-vite" => [
    "main" => "frontend/index.ts",
    "dev" => false,
  ],
  "languages" => true,
];
