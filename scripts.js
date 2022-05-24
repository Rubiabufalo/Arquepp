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
let mensagem = "";
let campoMensagem = $("#mensagem");

// Funções
function atualizaParedeAtual() {
    if (comodo.length > 0) {
        paredeAtual = comodo.length + 1;
    }

    $('#textoParede').text("Parede " + paredeAtual);
}



function verificaAreaParede(altura, largura) {
    let area = altura * largura;

    if (area >= 1 && area <= 15) {
        return true;
    }
    else {
        return false;
    }
}

function verificaAlturaParede(nmrPortas, altura) {
    if ((nmrPortas > 0 && (altura - 0.3) >= 1.9) || nmrPortas == 0)
    return true;

    else
    return false;
}

function proporcaoParede(nmrPortas, nmrJanelas, altura, largura) {
    let area = (altura * largura) / 2;
    let areaJanelas = nmrJanelas * 2.4;
    let areaPortas = nmrPortas * 1.52;

    if ((areaJanelas + areaPortas) <= area) {
       if (verificaAlturaParede(nmrPortas, altura) == true) {
        comodo.push({
                'altura': altura,
                'largura': largura,
                'nmrPortas': nmrPortas,
                'nmrJanelas': nmrJanelas
        });

        console.log(comodo);
       }
       else {
        mensagem = "A parede deve ter pelo menos 30cm a mais de altura que a porta";
        campoMensagem.removeClass("hidden");
        campoMensagem.text(mensagem);
       }
    }
    else {
        mensagem = "O total de área das portas e janelas deve ser de no máximo 50% da área da parede";
        campoMensagem.removeClass("hidden");
        campoMensagem.text(mensagem);
    }
}

function validaParede(altura, largura, nmrPortas, nmrJanelas) {
    if (verificaAreaParede(altura, largura) == true) {
        proporcaoParede(nmrPortas, nmrJanelas, altura, largura);
    }
    else {
        mensagem = "A área da parede deve estar entre 1 e 15 metros quadrados";
        campoMensagem.removeClass("hidden");
        campoMensagem.text(mensagem);
    }
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

    validaParede(altura, largura, nmrPortas, nmrJanelas);
});