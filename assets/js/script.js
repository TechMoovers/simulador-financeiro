var inputCustoArroba = document.getElementById("inputCustoArroba");
var inputQtdBovinosMachos = document.getElementById("inputQtdBovinosMachos");
var inputQtdBovinosFemeas = document.getElementById("inputQtdBovinosFemeas");

var infoPre = document.getElementById("infoPre");
var infoPos = document.getElementById("infoPos");
var infoArmazenamento = document.getElementById("infoArmazenamento");
var infoTotal = document.getElementById("infoTotal");

function calcularPerda() {
    var custoArroba = inputCustoArroba.value;
    var qtdBovinosMachos = inputQtdBovinosMachos.value;
    var qtdBovinosFemeas = inputQtdBovinosFemeas.value;

    if (custoArroba == "") inputCustoArroba.classList.add("error");
    if (qtdBovinosMachos == "") inputQtdBovinosMachos.classList.add("error");
    if (qtdBovinosFemeas == "") inputQtdBovinosFemeas.classList.add("error");

    if (custoArroba != "" && qtdBovinosMachos != "" && qtdBovinosFemeas != "") {
        //Cálculo perda pré-abate - transporte

        var custoKg = custoArroba / 15;
        var kgMacho = qtdBovinosMachos * 588.9;
        var kgFemea = qtdBovinosFemeas * 444.7;

        var kgCarcacaMacho = kgMacho / 2;
        var kgCarcacaFemea = kgFemea / 2;

        var carneMachoPerdidaKg = (kgCarcacaMacho * 0.4807) * 0.0030;
        var carneFemeaPerdidaKg = (kgCarcacaFemea * 0.4807) * 0.0040;
        var carnePerdidaTotalKg = carneMachoPerdidaKg + carneFemeaPerdidaKg;
        var dinheiroPerdido = carnePerdidaTotalKg * custoKg;
        var oQueDeixaDePerder = dinheiroPerdido * 0.25;

        infoPre.innerHTML = `
        <p style="color: #fa1b1b; text-align:center">48,7% dos seus animais se lesionam durante o transporte.</p>

        <h3 class="topic-title">Pré-abate:</h3>

        <p>Sua empresa tem mensalmente uma perda de <span class="negative-text">${carnePerdidaTotalKg.toFixed(2)}Kg</span> de carne ou <span class="negative-text">${(carnePerdidaTotalKg / 15).toFixed(2)}Arroba</span>.
        O que equivale em dinheiro, a um prejuízo de <span class="negative-text">R$${dinheiroPerdido.toFixed(2)}</span> mensalmente e <span class="negative-text">R$${(dinheiroPerdido * 12).toFixed(2)}</span> anualmente por conta de lesões na carne causadas por estresse no pré-abate.</p>

        <p>Com a nossa solução, sua empresa <b>deixará de perder</b> mensalmente <span class="positive-text">R$${oQueDeixaDePerder.toFixed(2)}</span> e anualmente <span class="positive-text">R$${(oQueDeixaDePerder * 12).toFixed(2)}</span> baseado na diminuição da oscilação de temperatura.</p>`;

        //Cálculo perda pós-abate - transporte

        var transportePosAbate = (kgCarcacaMacho + kgCarcacaFemea) - carnePerdidaTotalKg;
        var perdaTransportePosAbate = transportePosAbate * 0.06;
        var perdaTransportePosAbateDinheiro = perdaTransportePosAbate * custoKg;
        var dxPerdaTransportePosAbateDinheiro = perdaTransportePosAbateDinheiro * 0.65;

        infoPos.innerHTML = `
        <h3 class="topic-title">Pós-abate:</h3>

        <p>Sua empresa perde <span class="negative-text">${perdaTransportePosAbate.toFixed(2)}kg</span> de carne ou <span class="negative-text">${(perdaTransportePosAbate / 15).toFixed(2)}Arroba</span>. Perda que equivale em dinheiro à <span class="negative-text">R$${perdaTransportePosAbateDinheiro.toFixed(2)}</span> mensalmente e <span class="negative-text">R$${(perdaTransportePosAbateDinheiro * 12).toFixed(2)}</span> anualmente.</p>

        <p>Contratando nosso serviço, sua empresa <b>deixará de perder</b> mensalmente <span class="positive-text">R$${dxPerdaTransportePosAbateDinheiro.toFixed(2)}</span> e anualmente <span class="positive-text">R$${(dxPerdaTransportePosAbateDinheiro * 12).toFixed(2)}</span>.</p>
        `;

        //Cálculo perda pós-abate - armazenamento

        var armazenamento = transportePosAbate - perdaTransportePosAbate;
        var perdaArmazenamento = armazenamento * 0.03;
        var perdaArmazenamentoDinheiro = perdaArmazenamento * custoKg;
        var dxPerdaArmazenamentoDinheiro = perdaArmazenamentoDinheiro * 0.65;

        infoArmazenamento.innerHTML = `
        <h3 class="topic-title">Armazenamento:</h3>

        <p>Considerando que durante o armazenamento pós-abate se perde em média 3% da carga, sua empresa perde <span class="negative-text">${perdaArmazenamento.toFixed(2)}kg</span> de carne ou <span class="negative-text">${(perdaArmazenamento / 15).toFixed(2)}Arroba</span>. Perda que equivale em dinheiro à <span class="negative-text">R$${perdaArmazenamentoDinheiro.toFixed(2)}</span> mensalmente e <span class="negative-text">R$${(perdaArmazenamentoDinheiro * 12).toFixed(2)}</span> anualmente.</p>

        <p>Contratando nosso serviço, sua empresa <b>deixará de perder</b> mensalmente <span class="positive-text">R$${dxPerdaArmazenamentoDinheiro.toFixed(2)}</span> e anualmente <span class="positive-text">R$${(dxPerdaArmazenamentoDinheiro * 12).toFixed(2)}</span>.</p>
        `;

        //Cálculo total

        var perdaTotal = perdaArmazenamentoDinheiro + perdaTransportePosAbateDinheiro + dinheiroPerdido;
        var dxPerdaTotal = dxPerdaArmazenamentoDinheiro + dxPerdaTransportePosAbateDinheiro + oQueDeixaDePerder;

        infoTotal.innerHTML = `
        <h3 class="topic-title">Total:</h3>
            <p>• Mensalmente sua empresa <b>perde</b>:
            <span class="negative-text">R$${perdaTotal.toFixed(2)}</span></p>

            <p>• Anualmente sua empresa <b>perde</b>:
            <span class="negative-text">R$${(perdaTotal * 12).toFixed(2)}</span></p>

            <p>• Mensalmente sua empresa <b>deixará de perder</b>:
            <span class="positive-text">R$${dxPerdaTotal.toFixed(2)}</span></p>

            <p>• Anualmente sua empresa <b>deixará de perder</b>:
            <span class="positive-text">R$${(dxPerdaTotal * 12).toFixed(2)}</span></p>
        `;
    }
}

function removeInputWarning() {
    var custoArroba = inputCustoArroba.value;
    var qtdBovinosMachos = inputQtdBovinosMachos.value;
    var qtdBovinosFemeas = inputQtdBovinosFemeas.value;

    if (custoArroba != "") inputCustoArroba.classList.remove("error");
    if (qtdBovinosMachos != "") inputQtdBovinosMachos.classList.remove("error");
    if (qtdBovinosFemeas != "") inputQtdBovinosFemeas.classList.remove("error");
}