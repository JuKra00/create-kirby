<?php

use Kirby\Filesystem\Dir;

/**
 * @var Kirby\Cms\App $kirby
 * @var Kirby\Cms\Site $site
 * @var Kirby\Cms\Page $page
 */
?>
<!DOCTYPE html>
<html lang="<?= $kirby->language()->code() ?>">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <?php if ($_ENV['MODE'] === 'development') :
    $cssFiles = Dir::read("assets/dev");
    foreach ($cssFiles as $file) :
      echo css('assets/dev/' . $file . '?v=' . time(), ['data-stylesheet' => 'vite-dev-css']);
    endforeach;
  ?>
  <?php endif ?>

  <?php
  echo vite()->css();
  ?>
</head>

<body data-template="<?= $page->intendedTemplate() ?>">