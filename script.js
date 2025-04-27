// gifs e musicas
const GIFS_SIM   = ["horse_yes_1.gif","horse_yes_2.gif","horse_yes_3.gif","horse_yes_4.gif","horse_yes_5.gif"];
const GIFS_NAO   = ["horse_no_1.gif","horse_no_2.gif","horse_no_3.gif","horse_no_4.gif","horse_no_5.gif"];
const MP3_SIM    = ["sim_1.mp3", "sim_2.mp3"];
const MP3_NAO    = ["nao_1.mp3", "nao_2.mp3"];

// elementos
const enviarBtn   = document.getElementById("enviar-btn");
const perguntaInp = document.getElementById("pergunta");
const panePerg    = document.getElementById("pergunta-pane");
const paneResp    = document.getElementById("resposta-pane");
const gifResp     = document.getElementById("gif-resposta");
const h2Resp      = document.getElementById("resposta-titulo");
const pPerg       = document.getElementById("frase-pergunta");
const pConf       = document.getElementById("frase-confirmacao");
const btnAgain    = document.getElementById("consultar-novamente-btn");
const audMenu     = document.getElementById("musica-menu");
const audResp     = document.getElementById("musica-resposta");

// permitir Enter para enviar
perguntaInp.addEventListener("keydown", e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      enviarBtn.click();
    }
  });


// funcoes utilitarias
const aleatorio = arr => arr[Math.floor(Math.random() * arr.length)];
const pararAudio = a => { a.pause(); a.currentTime = 0; };

// toca menu depois do 1ro clique permitido pelo navegador
window.addEventListener("DOMContentLoaded", () => audMenu.play().catch(()=>{}));

// ---------------------------------------------------------------------
enviarBtn.addEventListener("click", () => {
  const pergunta = perguntaInp.value.trim();
  if (!pergunta) { alert("Você acha que pode mandar um texto vazio para O Cavalo??"); return; }

  const ehSim = Math.random() < 0.5;

  // escolhe mídia aleatória
  gifResp.src  = `midias/${ehSim ? aleatorio(GIFS_SIM) : aleatorio(GIFS_NAO)}`;
  audResp.src  = `midias/${ehSim ? aleatorio(MP3_SIM) : aleatorio(MP3_NAO)}`;

  // textos
  h2Resp.textContent = ehSim ? "Sim." : "Não.";
  pPerg.textContent  = `"${pergunta}"`;
  pConf.textContent  = `O cavalo diz ${ehSim ? "sim" : "não"} para a sua pergunta.`;

  // áudio
  pararAudio(audMenu);
  pararAudio(audResp); // caso estivesse tocando de antes
  audResp.play();

  // telas
  panePerg.classList.add("hidden");
  paneResp.classList.remove("hidden");
});

// volumes
const sliderVol = document.getElementById("slider-volume");

// volume inicial 0-1
const setVolume = v => {
  const vol = v / 100; // converte p/ 0-1
  [audMenu, audResp].forEach(a => { if (a) a.volume = vol; });
};
setVolume(sliderVol.value);

// sempre que o usuário mexer
sliderVol.addEventListener("input", () => setVolume(sliderVol.value));

// ---------------------------------------------------------------------
btnAgain.addEventListener("click", () => {
  pararAudio(audResp);
  audMenu.play();

  perguntaInp.value = "";
  paneResp.classList.add("hidden");
  panePerg.classList.remove("hidden");
  perguntaInp.focus();
});
