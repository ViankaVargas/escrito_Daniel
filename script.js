var palabrasConRespuestas = {
    "1":"uno",
    "2":"dos",
    "3":"tres",
    "4":"cuatro",
    "5":"cinco",
    "6":"seis",
    "7":"siete",
    "8":"ocho",
    "9":"nueve",
    "10":"diez",
    "11":"once",
    "12":"doce",
    "13":"trece",
    "14":"catorce",
    "15":"quince",
    "16":"dieciséis",
    "17":"diecisiete",
    "18":"dieciocho",
    "19":"diecinueve",
    "20":"veinte",
    "21":"veintiuno",
    "22":"veintidós",
    "23":"veintitrés",
    "24":"veinticuatro",
    "25":"veinticinco",
    "26":"veintiseis",
    "27":"veintisiete",
    "28":"veintiocho",
    "29":"veintinueve",
    "30":"treinta",
    "31":"treinta y uno",
    "32":"treinta y dos",
    "33":"treinta y tres",
    "34":"treinta y cuatro",
    "35":"treinta y cinco",
    "36":"treinta y seis",
    "37":"treinta y siete",
    "38":"treinta y ocho",
    "39":"treinta y nueve",
    "40":"cuarenta"
};

var palabraElemento = document.getElementById("palabra");
var inputRespuesta = document.getElementById("inputRespuesta");
var resultadoElemento = document.getElementById("resultado");
var button = document.querySelector("button");
var incorrectWordsList = document.getElementById('incorrect-words');
var summaryElement = document.getElementById('summary');
var incorrectListContainer = document.getElementById('incorrect-list');

var preguntasRealizadas = [];
var incorrectAnswers = [];
var correctAnswers = 0;
var incorrectCount = 0;

function obtenerPalabraAleatoria() {
    var palabrasDisponibles = Object.keys(palabrasConRespuestas).filter(function (palabra) {
        return !preguntasRealizadas.includes(palabra);
    });

    var indice = Math.floor(Math.random() * palabrasDisponibles.length);
    return palabrasDisponibles[indice];
}

function iniciarJuego() {
    var palabraActual = obtenerPalabraAleatoria();

    if (palabraActual) {
        palabraElemento.textContent = palabraActual;
        resultadoElemento.textContent = "";
        resultadoElemento.className = "";
        preguntasRealizadas.push(palabraActual);
    } else {
        palabraElemento.textContent = "¡Juego completado!";
        inputRespuesta.style.display = "none";
        button.style.display = "none";
        mostrarResumenIncorrectas();
    }
}

function verificarRespuesta() {
    var palabraActual = palabraElemento.textContent;
    var respuestaIngresada = inputRespuesta.value.toLowerCase();

    if (!respuestaIngresada) {
        resultadoElemento.textContent = "Debes ingresar una respuesta";
        resultadoElemento.className = "incorrecto";
        return;
    }

    if (respuestaIngresada === palabrasConRespuestas[palabraActual]) {
        resultadoElemento.textContent = "Correcto";
        resultadoElemento.className = "correcto";
        correctAnswers++;
    } else {
        resultadoElemento.textContent = "Incorrecto";
        resultadoElemento.className = "incorrecto";
        // Guardar respuesta incorrecta en la lista
        incorrectAnswers.push({ palabra: palabraActual, respuestaCorrecta: palabrasConRespuestas[palabraActual], respuestaUsuario: respuestaIngresada });
        incorrectCount++;
    }

    setTimeout(function () {
        iniciarJuego();
        inputRespuesta.value = "";
        resultadoElemento.textContent = "";
        resultadoElemento.className = "";
    }, 2000);
}

function mostrarResumenIncorrectas() {
    var incorrectWordsList = document.getElementById('incorrect-words');
    incorrectWordsList.innerHTML = '';

    // Mostrar las palabras incorrectas
    for (var i = 0; i < incorrectAnswers.length; i++) {
        var listItem = document.createElement('li');
        listItem.innerText = incorrectAnswers[i].palabra + ' - Respuesta correcta: ' + incorrectAnswers[i].respuestaCorrecta +
                             ' - Tu respuesta: ' + incorrectAnswers[i].respuestaUsuario;
        incorrectWordsList.appendChild(listItem);
    }

    // Mostrar el resumen
    var summaryElement = document.getElementById('summary');
    summaryElement.innerText = 'Respuestas Correctas: ' + correctAnswers + ' | Respuestas Incorrectas: ' + incorrectCount;

    // Mostrar la lista de palabras incorrectas
    document.getElementById('juego-container').style.display = 'none';
    document.getElementById('incorrect-list').style.display = 'block';
}


function retryIncorrectAnswers() {
    // Restablecer la lista de preguntas a estudiar solo con las incorrectas
    questionsToAsk = shuffle(incorrectAnswers.map(function(item) {
        return { palabra: item.palabra, traduccion: palabrasConRespuestas[item.palabra] };
    }));

    // Ocultar la lista de palabras incorrectas y mostrar la sección principal del ejercicio
    document.getElementById('juego-container').style.display = 'block';
    document.getElementById('incorrect-list').style.display = 'none';

    // Reiniciar las variables para comenzar el estudio desde cero
    incorrectAnswers = [];
    correctAnswers = 0;
    incorrectCount = 0;

    // Iniciar el juego con las preguntas incorrectas
    init();
}


window.onload = function () {
    iniciarJuego();
    document.getElementById("inputRespuesta").focus();
};
