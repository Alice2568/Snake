<?php
$scores = [];
if (file_exists('scores.json')) {
    $scores = json_decode(file_get_contents('scores.json'), true);
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <title>Highscores - Snake</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>🏆 Meilleurs scores</h1>
        <a href="index.php">Retour au jeu</a>
    </header>

    <main>
        <?php if (count($scores) > 0): ?>
            <ol>
                <?php foreach ($scores as $entry): ?>
                    <li><?= htmlspecialchars($entry['name']) ?> — <?= $entry['score'] ?> pts (<?= $entry['date'] ?>)</li>
                <?php endforeach; ?>
            </ol>
        <?php else: ?>
            <p>Aucun score enregistré pour le moment.</p>
        <?php endif; ?>
    </main>
</body>
</html>
