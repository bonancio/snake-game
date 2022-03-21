const somdefundo = new Audio("music/music.mp3");
const somGameOver = new Audio("music/gameover.mp3");
const somMovimento = new Audio("music/move.mp3");
const somComer = new Audio("music/food.mp3");


var direction = { x: 0, y: 0 };
var cobrinha = [{ x: 5, y: 5 }];
var fruit = {
    x: Math.floor(Math.random() * 28) + 1,
    y: Math.floor(Math.random() * 28) + 1
};
var pontos = 0;

var ultimaVezAtualizada = 0;
var velocidade = 5;

function main(tempoAtual) {
    window.requestAnimationFrame(main);
    if ((tempoAtual - ultimaVezAtualizada) / 1000 < 1 / velocidade) {
        return;
    }

    ultimaVezAtualizada = tempoAtual;

    atualizaGame();
}

function verificaColisao(){
    for(var i = 1; i < cobrinha.length; i++){
        if (cobrinha[i].x == cobrinha[0].x  &&  cobrinha[i].y == cobrinha[0].y){
            return true;
        }
    }

    if (cobrinha[0].x >= 30 || 
        cobrinha[0].x <= 0 || 
        cobrinha[0].y >= 30 || 
        cobrinha[0].y <= 0){
            return true;
        }
        return false;
}

function verificaComeuFrutinha() {
    console.log('e')
    if(cobrinha[0].x == fruit.x && cobrinha[0].y == fruit.y){
        somComer.play();
        pontos += 10;
        pontuacao.innerHTML = pontos + " pontos"
        cobrinha.unshift({x: cobrinha[0].x + direction.x, y: cobrinha[0].y + direction.y})
        fruit.x = Math.floor(Math.random() * 28) + 1;
        fruit.y = Math.floor(Math.random() * 28) + 1;
        velocidade = velocidade + 0.5
    }
}


function atualizaGame() {
    
    if (verificaColisao()) {
        somdefundo.pause();
        somGameOver.play();
        alert("GAME OVER");
        cobrinha = [{x: 5, y: 5}];
        direction.x = 0;
        direction.y = 0;
        pontos = 0;
        pontuacao.innerHTML = 0 + " pontos";
    }

    verificaComeuFrutinha()

    somdefundo.play();

    for(var i = cobrinha.length - 2; i >= 0; i--) {
        cobrinha[i+1] = {...cobrinha[i]}
    }

    cobrinha[0].y += direction.y;
    cobrinha[0].x += direction.x;


    board.innerHTML = "";
    for (var i = 0; i < cobrinha.length; i++) {
        var parteCobrinha = document.createElement('div');
        parteCobrinha.style.gridRowStart = cobrinha[i].y
        parteCobrinha.style.gridColumnStart = cobrinha[i].x


        if (i == 0) {
            parteCobrinha.classList.add("head")
        } else[
            parteCobrinha.classList.add("snake")
        ]

        board.appendChild(parteCobrinha);

    }

    var frutinha = document.createElement("div");
    frutinha.style.gridColumnStart = fruit.x;
    frutinha.style.gridRowStart = fruit.y;
    frutinha.classList.add("fruit");
    board.appendChild(frutinha);
}

window.addEventListener("keydown", function (e) {


    switch (e.code) {
        case "KeyW":
        case "ArrowUp":
            somMovimento.play();
            direction.x = 0
            direction.y = -1;
            break;
        case "KeyA":
        case "ArrowLeft":
            somMovimento.play();
            direction.x = -1
            direction.y = 0;
            break;
        case "KeyS":
        case "ArrowDown":
            somMovimento.play();
            direction.x = 0
            direction.y = 1;
            break;
        case "KeyD":
        case "ArrowRight":
            somMovimento.play();
            direction.x = 1
            direction.y = 0;
            break;
        case "Enter":
            direction.x = 1
            direction.y = 0;
            somdefundo.play();
            break;
    }
})


main();

