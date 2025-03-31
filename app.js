let amigos = {}; //Definindo o dicionário amigos.
let listaSorteio = []; // Define lista para realizar sorteio.
//Função para sempre limpar os campos de input
function limparCampo() {
  document.getElementById("nome").value = "";
  document.getElementById("email").value = "";
}

// Função para armazenar o nome dos amigos e limpar o input
function adicionarAmigo() {
  let nome = document.getElementById("nome").value; // Definindo a variável nome como o input inserido no campo "nome"
  let email = document.getElementById("email").value; // Definindo a variável email como o input inserido no campo "email"

  //Verificando se o campo nome e e-mail não estão vazios antes de prosseguir
  if (nome == "") {
    alert("Por favor, digite o nome do(a) amigo(a)");
  } else if (email == "") {
    alert("Por favor, digite o email do(a) amigo(a)");
  } else {
    amigos[nome] = email; //Adciona a chave e valor ao dic "amigos"
    listaSorteio.push(nome); // Adiciona lista para sorteio
    limparCampo(); // Limpa os campos
    atualizarLista(); // Atualiza a lista de amigos
  }
}

function atualizarLista() {
  let listaAmigos = document.getElementById("listaAmigos"); // Adicionando os amigos em forma de lista
  listaAmigos.innerHTML = ""; // Limpando a lista de amigos do HTML

  for (let chave in amigos) {
    // Estrutura de repetição para adicionar cada elemento na lista de amigos
    let item = document.createElement("li"); //Cria um item <"li">
    item.textContent = `${chave}: ${amigos[chave]}`; //Define o texto do item como nome e e-mail de cada amigo
    listaAmigos.appendChild(item); //Adiciona o item a <ul>
  }
}

// Muda a ordem da lista de amigos
function embaralharAmigos(lista) {
  for (let i = lista.length - 1; i > 0; i--) {
    const j = parseInt(Math.random() * (i + 1));
    [lista[i], lista[j]] = [lista[j], lista[i]];
  }
}

//Função para exibir o resultado
function sortearAmigo(amigos) {
  // Verifica se a lista de amigos tem menos de 2 amigos
  if (listaSorteio.length < 2) {
    alert("Favor adcionar pelo menos 2 amigos!");
    return null;
  }
  const dicSorteio = {}; // Dicionário para armazenar o resultado do sorteio
  let tentativa = 0; // Variável para contar o número de tentativas
  // Loop para tentar realizar o sorteio
  do {
    tentativa++;
    embaralharAmigos(listaSorteio);
    // Sorteia os amigos
    let verificacao = true;
    for (let i = 0; i < listaSorteio.length; i++) {
      const sorteado = listaSorteio[(i + 1) % listaSorteio.length]; // Pega o último amigo da lista
      if (listaSorteio[i] === sorteado) {
        verificacao = false;
        break;
      }
      dicSorteio[listaSorteio[i]] = sorteado; // Adiciona o amigo sorteado ao dicionário
    }
    if (verificacao) {
      let resultado = document.getElementById("resultado");
      resultado.innerHTML = "Sorteio concluído!!";
      break;
    }
  } while (tentativa < 100);
  // Se não conseguir sortear após 100 tentativas, exibe mensagem de erro
  if (tentativa >= 100) {
    alert("Não foi possível realizar o sorteio corretamente.");
    return null;
  }

  console.log(`Sorteio realizado após ${tentativa} tentativas.`);
  console.log("Resultado do sorteio:", dicSorteio);

  enviarEmails(dicSorteio); // Envia os e-mails com o resultado do sorteio
}

function enviarEmails(dicSorteio) {
  let sorteioComEmails = {};
  for (let nome in dicSorteio) {
    sorteioComEmails[nome] = {
      email: amigos[nome],
      sorteado: dicSorteio[nome],
    };
  }

  fetch("https://challengesecretfriend.up.railway.app/enviar-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sorteio: sorteioComEmails }),
  })
    .then((response) => response.json())
    .then((data) => alert(data.message))
    .catch((error) => {
      console.error("Erro ao enviar e-mails:", error);
      response
        .text()
        .then((text) => console.log("Resposta do servidor:", text));
    });
}
