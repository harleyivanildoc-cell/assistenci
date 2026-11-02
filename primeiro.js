
/* JavaScript do projeto Assistente - Espaço Acessível */

// 1. AUMENTAR E DIMINUIR O TEXTO

let tamanhoFonte = 100;

const aumentar = document.getElementById("btn-aumentar");
const diminuir = document.getElementById("btn-diminuir");

if (aumentar) {
    aumentar.addEventListener("click", function () {
        if (tamanhoFonte < 160) {
            tamanhoFonte += 10;
            document.body.style.fontSize = tamanhoFonte + "%";
        }
    });
}

if (diminuir) {
    diminuir.addEventListener("click", function () {
        if (tamanhoFonte > 80) {
            tamanhoFonte -= 10;
            document.body.style.fontSize = tamanhoFonte + "%";
        }
    });
}


// 2. ATIVAR O ALTO CONTRASTE

const botaoContraste = document.getElementById("btn-alto-contraste");

if (botaoContraste) {
    botaoContraste.addEventListener("click", function () {
        document.body.classList.toggle("alto-contraste");
    });
}


// 3. LER TEXTO EM VOZ ALTA

function lerTexto(texto) {
    if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();

        let voz = new SpeechSynthesisUtterance(texto);
        voz.lang = "pt-PT";
        voz.rate = 0.9;

        window.speechSynthesis.speak(voz);
    } else {
        alert("O teu navegador não suporta leitura por voz.");
    }
}

const botaoLerPagina = document.getElementById("btn-ler-pagina");

if (botaoLerPagina) {
    botaoLerPagina.addEventListener("click", function () {
        lerTexto(
            "Bem-vindo ao Espaço Acessível. " +
            "Esta plataforma oferece ferramentas de acessibilidade, " +
            "informações e apoio para pessoas com deficiência."
        );
    });
}


// 4. PARAR A LEITURA EM VOZ ALTA

const botaoPararVoz = document.getElementById("btn-parar-voz");

if (botaoPararVoz) {
    botaoPararVoz.addEventListener("click", function () {
        if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel();
        }
    });
}


// 5. LEITOR DE TEXTO ESCRITO

const botaoLerTexto = document.getElementById("btn-ler-escrito");
const campoTexto = document.getElementById("texto-reconhecido");

if (botaoLerTexto && campoTexto) {
    botaoLerTexto.addEventListener("click", function () {
        let texto = campoTexto.value.trim();

        if (texto !== "") {
            lerTexto(texto);
        } else {
            alert("Escreve ou coloca um texto primeiro.");
        }
    });
}


// 6. NAVEGAÇÃO POR COMANDOS DE VOZ

const botaoVoz = document.getElementById("btn-comando-voz");
const estadoVoz = document.getElementById("estado-voz");

const ReconhecimentoVoz =
    window.SpeechRecognition || window.webkitSpeechRecognition;

if (botaoVoz && ReconhecimentoVoz) {
    const reconhecimento = new ReconhecimentoVoz();

    reconhecimento.lang = "pt-PT";
    reconhecimento.continuous = false;
    reconhecimento.interimResults = false;

    botaoVoz.addEventListener("click", function () {
        reconhecimento.start();

        if (estadoVoz) {
            estadoVoz.textContent = "Estou a ouvir. Diz um comando.";
        }
    });

    reconhecimento.onresult = function (evento) {
        let comando =
            evento.results[0][0].transcript.toLowerCase();

        if (estadoVoz) {
            estadoVoz.textContent = "Comando: " + comando;
        }

        if (comando.includes("leitor")) {
            document.getElementById("leitor").scrollIntoView();
        } else if (comando.includes("serviços") ||
                   comando.includes("servicos")) {
            document.getElementById("servicos").scrollIntoView();
        } else if (comando.includes("ajuda")) {
            document.getElementById("ajuda").scrollIntoView();
        } else if (comando.includes("mapa")) {
            document.getElementById("mapa").scrollIntoView();
        } else if (comando.includes("câmara") ||
                   comando.includes("camera")) {
            document.getElementById("rua").scrollIntoView();
        } else {
            lerTexto("Não reconheci o comando. Tenta novamente.");
        }
    };

    reconhecimento.onerror = function () {
        if (estadoVoz) {
            estadoVoz.textContent =
                "Não foi possível reconhecer a voz. Tenta novamente.";
        }
    };
}


// 7. ALERTA VISUAL PARA AVISOS

const botaoAlerta = document.getElementById("btn-alerta-visual");
const alertaVisual = document.getElementById("alerta-visual");

if (botaoAlerta && alertaVisual) {
    botaoAlerta.addEventListener("click", function () {
        alertaVisual.textContent =
            "Atenção! Este é um alerta visual de teste.";

        alertaVisual.style.backgroundColor = "#ffeb00";
        alertaVisual.style.color = "#000000";

        setTimeout(function () {
            alertaVisual.style.backgroundColor = "";
            alertaVisual.style.color = "";
        }, 3000);
    });
}


// 8. NAVEGAÇÃO POR TECLADO

const botaoTeclado = document.getElementById("btn-modo-teclado");

if (botaoTeclado) {
    botaoTeclado.addEventListener("click", function () {
        document.body.classList.toggle("modo-teclado");
    });
}


// 9. PEDIDO DE AJUDA PELO WHATSAPP

const botaoAjuda = document.getElementById("btn-enviar-ajuda");

if (botaoAjuda) {
    botaoAjuda.addEventListener("click", function () {
        const telefone =
            document.getElementById("contacto-ajuda");

        const mensagem =
            document.getElementById("mensagem-ajuda");

        if (!telefone || !mensagem) {
            alert("Os campos de contacto não foram encontrados.");
            return;
        }

        const numero = telefone.value.replace(/\D/g, "");

        if (numero.length < 9) {
            alert("Introduz um número de telefone válido.");
            return;
        }

        const url =
            "https://wa.me/" + numero +
            "?text=" + encodeURIComponent(mensagem.value);

        window.open(url, "_blank", "noopener,noreferrer");
    });
}


// 10. PESQUISAR DESTINO NO GOOGLE MAPS

const botaoMapa = document.getElementById("btn-mapa");

if (botaoMapa) {
    botaoMapa.addEventListener("click", function () {
        const destino = document.getElementById("destino");

        if (!destino || destino.value.trim() === "") {
            alert("Escreve o destino que pretendes encontrar.");
            return;
        }

        const url =
            "https://www.google.com/maps/search/?api=1&query=" +
            encodeURIComponent(destino.value);

        window.open(url, "_blank", "noopener,noreferrer");
    });
}


// 11. LOCALIZACAO ATUAL PARA O MAPA

const botaoLocalizacao =
    document.getElementById("btn-mapa-local");

if (botaoLocalizacao) {
    botaoLocalizacao.addEventListener("click", function () {
        if (!navigator.geolocation) {
            alert("O teu navegador não suporta localização.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            function (posicao) {
                const latitude = posicao.coords.latitude;
                const longitude = posicao.coords.longitude;

                const url =
                    "https://www.google.com/maps/dir/?api=1&origin=" +
                    latitude + "," + longitude;

                window.open(url, "_blank", "noopener,noreferrer");
            },
            function () {
                alert(
                    "Não foi possível obter a localização. " +
                    "Verifica as permissões do navegador."
                );
            }
        );
    });
}


// 12. LEITOR DE TEXTO POR FOTOGRAFIA (OCR)

const botaoReconhecer =
    document.getElementById("btn-ler-imagem");

if (botaoReconhecer) {
    botaoReconhecer.addEventListener("click", async function () {
        const imagemInput =
            document.getElementById("imagem-texto");

        const estadoOCR =
            document.getElementById("estado-ocr");

        const textoReconhecido =
            document.getElementById("texto-reconhecido");

        if (!imagemInput || !imagemInput.files[0]) {
            alert("Seleciona uma fotografia primeiro.");
            return;
        }

        if (!window.Tesseract) {
            alert(
                "A biblioteca de leitura não está disponível. " +
                "Verifica a ligação à internet."
            );
            return;
        }

        estadoOCR.textContent = "A reconhecer o texto. Aguarda...";

        botaoReconhecer.disabled = true;

        try {
            const resultado = await Tesseract.recognize(
                imagemInput.files[0],
                "por"
            );

            textoReconhecido.value = resultado.data.text.trim();

            estadoOCR.textContent =
                textoReconhecido.value !== ""
                    ? "Texto reconhecido. Confirma se está correto."
                    : "Não foi possível reconhecer o texto.";
        } catch (erro) {
            estadoOCR.textContent =
                "Ocorreu um erro ao ler a imagem.";
        } finally {
            botaoReconhecer.disabled = false;
        }
    });
}


// 13. PRE- VISUALIZAR A FOTOGRAFIA

const entradaImagem = document.getElementById("imagem-texto");
const previaImagem = document.getElementById("previa-imagem");

if (entradaImagem && previaImagem) {
    entradaImagem.addEventListener("change", function () {
        if (entradaImagem.files[0]) {
            previaImagem.src =
                URL.createObjectURL(entradaImagem.files[0]);

            previaImagem.classList.remove("escondido");
        }
    });
}


// 14. MENSAGEM DE BOAS-VINDAS NO CONSOLE

console.log("Espaço Acessível iniciado com sucesso!");
