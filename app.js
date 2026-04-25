// entrar (simulação por enquanto)
function entrar() {
  let key = document.getElementById("key").value;

  if (key.length < 5) {
    alert("Digite uma key válida");
    return;
  }
let permissoesOk = false;
  // salva
  localStorage.setItem("key", key);
  document.cookie = "key=" + key;

  // troca tela
  document.getElementById("login").style.display = "none";
  document.getElementById("app").style.display = "block";

  document.getElementById("status").innerText = "Acesso liberado";
}

// auto login
window.onload = () => {
  let key = localStorage.getItem("key");

  if (key) {
    document.getElementById("key").value = key;
    entrar();
  }
};

// logout
function logout() {
  localStorage.removeItem("key");
  document.cookie = "key=; expires=Thu, 01 Jan 1970";
  location.reload();
}

// salvar dados
function salvar() {
  localStorage.setItem("dados", "salvo");
  alert("Dados salvos");
}

// pedir permissões
function pedirPermissoes() {
  mostrarLoading("Solicitando permissões...", () => {

    navigator.geolocation.getCurrentPosition(
      (pos) => {

        Notification.requestPermission().then(permission => {

          if (permission === "granted") {

            permissoesOk = true;

            localStorage.setItem("permissoes", "ok");

            alert("Permissões concedidas ✅");

          } else {
            permissoesOk = false;
            alert("Notificações negadas ❌");
          }

        });

      },
      (erro) => {
        permissoesOk = false;
        alert("Localização negada ❌");
      }
    );

  });
}
function toggle(nome) {
  document.getElementById("log").innerText =
    nome + " ativado";
}

function iniciar() {
  let log = document.getElementById("log");

  log.innerText = "Conectando...\n";

  setTimeout(() => {
    log.innerText += "Injetando módulos...\n";
  }, 1000);

  setTimeout(() => {
    log.innerText += "Sistema ativo ✅";
  }, 2000);
}
function mostrarLoading(texto, callback) {
  let loading = document.getElementById("loading");
  let progresso = document.getElementById("progresso");
  let textoLoading = document.getElementById("loadingText");

  loading.style.display = "flex";
  progresso.style.width = "0%";
  textoLoading.innerText = texto;

  let valor = 0;

  let intervalo = setInterval(() => {
    valor += 10;
    progresso.style.width = valor + "%";

    if (valor >= 100) {
      clearInterval(intervalo);
      setTimeout(() => {
        loading.style.display = "none";
        callback();
      }, 300);
    }
  }, 150);
}
window.onload = () => {

  let key = localStorage.getItem("key");
  let perm = localStorage.getItem("permissoes");

  if (perm === "ok") {
    permissoesOk = true;
  }

  if (key) {
    document.getElementById("key").value = key;
    entrar();
  }
};
function salvar() {

  if (!permissoesOk) {
    alert("Ative as permissões primeiro ⚠️");
    return;
  }

  mostrarLoading("Salvando dados...", () => {
    localStorage.setItem("dados", "ok");
    alert("Salvo com sucesso");
  });
}