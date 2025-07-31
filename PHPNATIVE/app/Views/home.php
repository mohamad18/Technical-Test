<h2><?= $title ?></h2>
<?php if (isset($user)) : ?>
    <p>User ID: <?= $user['id'] ?> | Name: <?= $user['name'] ?></p>
<?php endif; ?>
<?php if (isset($name)) : ?>
    <p>New User: <?= $name ?></p>
<?php endif; ?>
