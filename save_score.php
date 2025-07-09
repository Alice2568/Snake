<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim(strip_tags($_POST['name']));
    $score = intval($_POST['score']);

    if ($name !== "" && $score >= 0) {
        $file = 'scores.json';

        if (file_exists($file)) {
            $scores = json_decode(file_get_contents($file), true);
        } else {
            $scores = [];
        }

        $scores[] = [
            'name' => $name,
            'score' => $score,
            'date' => date("Y-m-d H:i:s")
        ];

        // Trier les scores du plus haut au plus bas
        usort($scores, function($a, $b) {
            return $b['score'] - $a['score'];
        });

        // Option : garder les 10 meilleurs
        $scores = array_slice($scores, 0, 10);

        file_put_contents($file, json_encode($scores, JSON_PRETTY_PRINT));
        echo "OK";
    } else {
        echo "Nom invalide ou score négatif.";
    }
} else {
    echo "Méthode non autorisée.";
}
