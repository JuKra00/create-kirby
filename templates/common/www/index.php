<?php

use Kirby\Cms\App;
use Dotenv\Dotenv;

$base = __DIR__;
$volumes = dirname(__DIR__) . '/volumes';
$backend = dirname(__DIR__) . '/backend';
require $backend . '/kirby/bootstrap.php';
$dotenv = Dotenv::createImmutable($backend);
$dotenv->load();

echo (new App([
  'roots' => [
    'index'     => $base,
    'media'     => $base . '/media',
    'site'      => $backend . '/site',
    'content'   => $volumes . '/content',
    'accounts'  => $volumes . '/accounts',
    'license'   => $volumes . '/license',
  ]
]))->render();
