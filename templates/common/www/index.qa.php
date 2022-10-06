<?php
require dirname(__DIR__) . '/backend/kirby/bootstrap.php';

use Kirby\Cms\App;

$volumes = dirname(__DIR__, 4) . '/volumes';
$backend = dirname(__DIR__) . '/backend';

(new App([
  'roots' => [
    'site'     => $backend . '/site',
    'content'  => $volumes . '/content',
    'accounts' => $volumes . '/accounts',
    'license' => $volumes . '/license',
  ]
]))->render();
