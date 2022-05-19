// let usuarion;
// let button;


// button = document.getElementById("btnEnviar");


// button.addEventListener ('click', (e) => {
//     e.preventDefault();

//     usuarion = document.getElementById("usuarion").value;

//     alert(usuarion);
// });

// $("#btnEnviar").on('click', (e) => {
//     e.preventDefault();

//     alert($("#usuarion").val());
// })

// let parede = {
//     'altura': 0,
//     'largura': 0,
//     'nmrPortas': 0,
//     'nmrJanelas': 0
// }

let comodo = [];
let paredeAtual = 1;

function atualizaParedeAtual() {
    if (comodo.length > 0) {
    paredeAtual = comodo.length + 1;
}

$('#textoParede').text("Parede " + paredeAtual);
}

$(document).ready(() => {
    atualizaParedeAtual();
});

$('#formButton').on('click', (e) => {
    e.preventDefault();

    let altura = $('#altura').val();
    let largura = $('#largura').val();
    let nmrPortas = $('#portas').val();
    let nmrJanelas = $('#janelas').val();

    let area = altura * largura;

    if (area >= 1 && area <= 15) {
        alert("Muito bem!");
    }
    else{
        alert("Muito ruim!")
    }
});