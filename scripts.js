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
const latasTinta = [18, 3.6, 2.5, 0.5];

// Funções
function calculaTintaNecessaria(comodo) {
    let area1 = (comodo[0].altura * 1) * (comodo[0].largura * 1);
    let area2 = (comodo[1].altura * 1) * (comodo[1].largura * 1);
    let area3 = (comodo[2].altura * 1) * (comodo[2].largura * 1);
    let area4 = (comodo[3].altura * 1) * (comodo[3].largura * 1);

    let areaJanelas = (comodo[0].nmrJanelas * 2.4) + (comodo[1].nmrJanelas * 2.4) + (comodo[2].nmrJanelas * 2.4) + (comodo[3].nmrJanelas * 2.4);
    let areaPortas = (comodo[0].nmrPortas * 1.52) + (comodo[1].nmrPortas * 1.52) + (comodo[2].nmrPortas * 1.52) + (comodo[3].nmrPortas * 1.52);

    let areaTotal = (area1 + area2 + area3 + area4);
    let tintaNecessaria = (areaTotal - (areaJanelas + areaPortas)) / 5;


    return tintaNecessaria;
}

function atualizaParedeAtual() {
    if ((comodo.length > 0) && comodo.length < 4) {
        paredeAtual = comodo.length + 1;
    }
    if (comodo.length == 4) {
        $("#btnCalc").removeClass('hidden');
        $("#formButton").prop('disabled', true);
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
        if ((verificaAlturaParede(nmrPortas, altura) == true) && comodo.length < 4) {
            comodo.push({
                'altura': altura,
                'largura': largura,
                'nmrPortas': nmrPortas,
                'nmrJanelas': nmrJanelas
            });

            console.log(comodo);

            atualizaParedeAtual();

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

$('#btnCalc').on('click', (e) => {
    e.preventDefault();

    // let tintaNecessaria = calculaTintaNecessaria(comodo);
    let tintaNecessaria = 19;
    let cont = 0;
    let qtdLata = 0;

    console.clear();

    while (cont <= latasTinta.length) {
        if (latasTinta[cont] > 0.5) {
            if (latasTinta[cont] <= tintaNecessaria) {
                if (tintaNecessaria - latasTinta[cont] < latasTinta[cont]) {
                    if (cont === 0)
                        mensagem = `Você precisa comprar 1 lata de ${latasTinta[cont]} litros`;
                    else {
                        if (tintaNecessaria - latasTinta[cont] <= 0)
                            mensagem += ` e 1 lata de ${latasTinta[cont]} litros`;
                        else
                            mensagem += `, 1 lata de ${latasTinta[cont]} litros`;
                    }

                    tintaNecessaria = tintaNecessaria - latasTinta[cont];
                }
                else if (latasTinta[cont] <= tintaNecessaria) {
                    while (latasTinta[cont] <= tintaNecessaria) {
                        qtdLata++;

                        tintaNecessaria = tintaNecessaria - latasTinta[cont];
                    }

                    if (cont === 0)
                        mensagem = `Você precisa comprar ${qtdLata} latas de ${latasTinta[cont]} litros`;
                    else {
                        if (tintaNecessaria - latasTinta[cont] <= 0)
                            mensagem += ` e ${qtdLata} latas de ${latasTinta[cont]} litros`;
                        else
                            mensagem += `, ${qtdLata} latas de ${latasTinta[cont]} litros`;
                    }

                }
            }
        }
        else {
            if (tintaNecessaria > 0) {
                qtdLata = 0;

                while (tintaNecessaria > 0) {
                    qtdLata++;

                    tintaNecessaria = tintaNecessaria - latasTinta[cont];
                }

                if (cont === 0)
                    mensagem = `Você precisa comprar ${qtdLata} latas de ${latasTinta[cont]} litros`;
                else {
                    if (tintaNecessaria - latasTinta[cont] <= 0)
                        mensagem += ` e ${qtdLata} latas de ${latasTinta[cont]} litros`;
                    else
                        mensagem += `, ${qtdLata} latas de ${latasTinta[cont]} litros`;
                }
            }
        }


        cont++;
    }

    console.log(mensagem);
})