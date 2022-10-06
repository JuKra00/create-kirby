<?php

/**
 * @var Kirby\Cms\App $kirby
 * @var Kirby\Cms\Site $site
 * @var Kirby\Cms\Page $page
 */
?>
<?php snippet('page/head') ?>
<?php snippet("hero/default"); ?>
<main>
  <div id="intro" data-title='"<?= $page->headline()->or($page->title())->toJson() ?>"'></div>
</main>
<?php snippet('page/foot') ?>