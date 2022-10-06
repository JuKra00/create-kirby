<?php

return [
  "cache" => [
    "pages" => [
      "active" => false
    ]
  ],
  "debug" => $_ENV["MODE"] === "development" ?? false,
  'email' => [
    'transport' => [
      'type' => 'smtp',
      'host' => 'localhost',
      'port' => 1025,
      'security' => false
    ]
  ],
  "jukra00.simple-vite" => [
    "dev" => $_ENV["MODE"] === "development" ?? false,
  ],
];
