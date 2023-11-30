// variáveis principais
const timerEl = document.getElementById('timer');
const marksList = document.getElementById('marks-list');
let intervalId = 0;
let timer = 0;
let marks = [];

// função para formatar o tempo na tela
const formatTime = (time) => {
    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const hundredths = time % 100;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${hundredths.toString().padStart(2, '0')}`
};

// função que adiciona um marcador na tela
const addMarkToList = (markIndex, markTime) => {
    marksList.innerHTML += `<p>Marca ${markIndex}: ${formatTime(markTime)}</p>`
}
// função que cria o marcador
const markTime = () => { 
    if (timer <= 0) {
        return
    } else {
        marks.push(timer);
    addMarkToList(marks.length, timer);
    }
}

// função para iniciar o cronometro e pausar, também altera o icone
const toggleTimer = () => {
    const button = document.getElementById('power');
    const action = button.getAttribute('action');

    clearInterval(intervalId);

    // se a ação for iniciar ou continuar, o contador roda
    if (action == 'start' || action == 'continue') {
        intervalId = setInterval(() => {
            timer += 1;
            setTimer(timer);
        }, 10);
        button.setAttribute('action', 'pause');
        button.innerHTML = '<i class="bi bi-pause-fill"></i>';
    } else if (action == 'pause') { // se a ação for pausar, altera o botão e pausa
        button.setAttribute('action', 'continue');
        button.innerHTML = '<i class="bi bi-play-fill"></i>';
    }
}


const resetTimer = () => {
    clearInterval(intervalId);
    timer = 0;
    marks = [];
    setTimer(timer);
    marksList.innerHTML = '';
    const button = document.getElementById('power');
    button.setAttribute('action','start');
    button.innerHTML = '<i class="bi bi-play-fill"></i>';
};


const setTimer = (time) => {
    timerEl.innerText = formatTime(time);
}

document.getElementById('power').addEventListener('click', toggleTimer);
document.getElementById('mark').addEventListener('click', markTime);
document.getElementById('reset').addEventListener('click', resetTimer);