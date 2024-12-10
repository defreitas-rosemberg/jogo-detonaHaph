
/*

definição do objeto literal chamado state, 
que possui duas propriedades principais: view e values.

Esse objeto agrupa de forma lógica as informações relacionadas ao estado do jogo, 
como as referências de elementos da interface (view) e os valores internos do jogo (values). 
Isso torna o código mais organizado e fácil de entender, 
facilitando a manutenção e a expansão do código no futuro.

Ao agrupar as referências aos elementos HTML em um único objeto (view), 
o código pode facilmente acessar e manipular qualquer parte da interface de forma centralizada, 
sem a necessidade de procurar repetidamente os elementos no DOM. 
Isso torna o código mais eficiente e fácil de modificar.

*/

const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score")
    },

    values: {
        timerId: null,
        gameVelocity: 1000,
        hitPosition: 0, /* posição de cada quadrado */
        result: 0, /* guarda a pontuação */
        currentTime: 60,
        countDownTimerId: setInterval(countDown, 1000)
    },
};

/* função responsável por gerenciar o tempo internamente */
function countDown () {
    state.values.currentTime --; 
    
    /* responsável por gerenciar o tempo de maneira visual*/
    state.view.timeLeft.textContent = state.values.currentTime; 

    if (state.values.currentTime <= 0) {

        // essas duas funções baixo garatem que o timer será zerado após 60 seg. 
        // Garante também que ao passar 60 seg o tempo não fique negativo no visor time left 
        clearInterval(state.values.timerId);
        clearInterval(state.values.countDownTimerId);
        
        alert(`Fim de jogo! Você conseguiu ${state.values.result} pontos.`);
    }
}

function playSound () {
    let audio = new Audio ("./src/audios/hit.m4a");
    audio.play (); 
}

function randomSquare () {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy"); 
    state.values.hitPosition = randomSquare.id;
}

/*

setInterval(randomSquare, state.values.gameVelocity -> 
poderia estar atribuido em timerId, dentro do objeto values
assim como foi feito com o setInterval(countDown, 1000)

 timerId: (randomSquare, 1000)

 1000 no lugar de state.values.gameVelocity (daria erro em função do state ter acabado de ser declarado)

*/

function moveEnemy () {
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitBox () {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                alert("Na mosca !!!");
                state.values.result ++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null; 
                playSound(); 
            } 
        });
    });
}

function init () {
    moveEnemy(); 
    addListenerHitBox();
}

init (); 