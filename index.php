<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="utf-8">
        <title>Snake</title>
        <link rel="icon" type="image/x-icon" href="img/favicon.ico">
        <link href="style.css" rel="stylesheet">
    </head>
    <body>
        <header>
            <a href="score.php">Voir les highscores</a>
        </header>
        <h1>Snake</h1>
        <canvas width="400" height="400"></canvas>
        <div style="display:none;">
            <h3 id="finalScore"></h3>
            <label for="playerName">Votre pseudo : </label>
            <input type="text" id="playerName" placeholder="Entrez votre pseudo">
            <button id="SaveScore">Enregistrer le score</button>
            
        </div>
            <h1 id="gameOver" style="display:none;">Game Over</h1>
            <button id="restartBtn" style="display:none;">Rejouer</button>
        
        
    <script src="script.js"></script>
    </body>
</html>