<?php

/**
 * @var Kirby\Cms\App $kirby
 * @var Kirby\Cms\Site $site
 * @var Kirby\Cms\Page $page
 */
?>
<?php snippet('page/head') ?>
<?php snippet('hero/default') ?>
<div class="infobox" data-snippet="InfoBox">
  This is an infobox to demonstrate the use of javascript enhanced snippets. You can click on it to delete it.
</div>
<main>
  <?php snippet('page/blocks', ['blocks' => $page->maincontent()]); ?>
</main>
<?php snippet('page/foot') ?>