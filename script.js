
            const canvas = document.querySelector("canvas")
            const context = canvas.getContext('2d')
            //const headImg = new Image();
            //headImg.src = "img/snake.png";
            const apple = new Image();
            apple.src = "img/applered.png"

            let box = 20

            let snake = [];
            snake[0] = {x: 10*box, y: 10*box }

            let food = {
                x: Math.floor(Math.random() * 15 + 1) * box,
                y: Math.floor(Math.random() * 15 + 1) * box
            }

            let score = 0

            let d

            document.addEventListener("keydown", direction);

            function direction(event){
                let key = event.keyCode;
                if(key == 37 && d != "RIGHT"){
                    d = "LEFT";
                } else if (key == 38 && d != "DOWN"){
                    d = "UP";
                } else if (key == 39 && d !="LEFT"){
                    d = "RIGHT";
                } else if (key == 40 && d != "UP"){
                    d = "DOWN";
                }
            }

            function draw(){
                context.clearRect(0,0,400,400)

                for(let i = 0; i < snake.length; i++){
                    if ( i ===0 ) {
                        context.fillStyle = ( i === 0) ? "green" : "green" 
                        context.fillRect(snake[i].x, snake[i].y, box, box);
                    } else if (i === snake.length - 1) {
                        // Tail → triangle
                        const tail = snake[i];
                        const beforeTail = snake[i - 1];
                
                        let dx = tail.x - beforeTail.x;
                        let dy = tail.y - beforeTail.y;
                
                        context.fillStyle = "green";
                        context.beginPath();
                
                        if (dx === box) {
                            // queue va vers la droite
                            context.moveTo(tail.x + box, tail.y + box / 2); // pointe
                            context.lineTo(tail.x, tail.y); // coin haut gauche
                            context.lineTo(tail.x, tail.y + box); // coin bas gauche
                        } else if (dx === -box) {
                            // queue va vers la gauche
                            context.moveTo(tail.x, tail.y + box / 2);
                            context.lineTo(tail.x + box, tail.y);
                            context.lineTo(tail.x + box, tail.y + box);
                        } else if (dy === box) {
                            // queue va vers le bas
                            context.moveTo(tail.x + box / 2, tail.y + box);
                            context.lineTo(tail.x, tail.y);
                            context.lineTo(tail.x + box, tail.y);
                        } else if (dy === -box) {
                            // queue va vers le haut
                            context.moveTo(tail.x + box / 2, tail.y);
                            context.lineTo(tail.x, tail.y + box);
                            context.lineTo(tail.x + box, tail.y + box);
                        }
                        context.fill();

                }else {
                    // Corps
                    context.fillStyle = "green";
                    context.fillRect(snake[i].x, snake[i].y, box, box);
                    context.strokeStyle = "green";
                    context.strokeRect(snake[i].x, snake[i].y, box, box);
                }}

                
                context.drawImage(apple, food.x, food.y, box, box);
                

                let snakeX = snake[0].x
                let snakeY = snake[0].y

                if(d == "LEFT") snakeX -= box;
                if(d == "UP") snakeY -= box;
                if(d == "RIGHT") snakeX += box;
                if(d == "DOWN") snakeY += box;

                if(snakeX == food.x && snakeY == food.y){
                    score++;
                    food = {
                        x: Math.floor(Math.random() * 15 + 1) * box,
                        y: Math.floor(Math.random() * 15 + 1) * box
                    }
                } else {
                    snake.pop()
                }
            
            let newHead = {
                x: snakeX,
                y: snakeY
            }

            if(snakeX < 0 || snakeY < 0 || snakeX > 19*box || snakeY > 19*box || collision(newHead, snake)){
                clearInterval(game);

                // Affiche Game Over et le bouton Rejouer
                document.getElementById("gameOver").style.display = "block";
                document.getElementById("restartBtn").style.display = "inline-block";
               
                context.fillStyle = "red";
                context.font = "30px Arial";
                context.fillText("Score : " + score, 6.5 * box, 11.5 * box);
            
                // Met à jour le texte HTML aussi
                document.getElementById("finalScore").innerText = "Votre score : " + score;
                return;
            }

            snake.unshift(newHead);

            context.fillStyle = "red"
            context.font = "30px Arial"
            context.fillText(score, 2*box, 1.6*box)

        }

        function collision(head, array){
            for( let g = 0; g < array.length; g++){
                if (head.x == array[g].x && head.y == array[g].y){
                    return true;
                }
            }
            return false
        }

        let game = setInterval(draw, 100)


        document.getElementById("restartBtn").addEventListener("click", function() {
            // Réinitialise les variables
            snake = [];
            snake[0] = {x: 10 * box, y: 10 * box};
            d = null;
            score = 0;
            food = {
                x: Math.floor(Math.random() * 15 + 1) * box,
                y: Math.floor(Math.random() * 15 + 1) * box
            }
        
            // Cache Game Over et bouton
            document.getElementById("gameOver").style.display = "none";
            document.getElementById("restartBtn").style.display = "none";
        
            // Redémarre le jeu
            clearInterval(game); // Sécurité
            game = setInterval(draw, 100);
        });
        
        let savedScores = []; // tableau des scores (tu peux utiliser localStorage si tu veux plus tard)

document.getElementById("saveScore").addEventListener("click", function() {
    const playerName = document.getElementById("playerName").value.trim();
    
    if (playerName !== "") {
        savedScores.push({ name: playerName, score: score });

        // Met à jour l’affichage des scores
        updateScoreList();

        // Réinitialise le champ
        document.getElementById("playerName").value = "";
    }
});

function updateScoreList() {
    const list = document.getElementById("scoreList");
    list.innerHTML = ""; // vide la liste

    savedScores.forEach(entry => {
        const li = document.createElement("li");
        li.textContent = `${entry.name} : ${entry.score}`;
        list.appendChild(li);
    });
}
