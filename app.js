//Definindo o dicionário amigos.
let amigos = {};

//Função para sempre limpar os campos de input
function limparCampo(){
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
}

// Função para armazenar o nome dos amigos e limpar o input
function adicionarAmigo(){
    let nome = document.getElementById("nome").value // Definindo a variável nome como o input inserido no campo "nome"
    let email = document.getElementById("email").value // Definindo a variável email como o input inserido no campo "email"
    // Adicionando os amigos em forma de lista
    let listaAmigos = document.getElementById("listaAmigos");
    listaAmigos.innerHTML = ""; // Limpando a lista de amigos do HTML

    //Verificando se o campo nome e e-mail não estão vazios antes de prosseguir
    if (nome == ""){
        alert("Por favor, digite o nome do(a) amigo(a)");
    }
    else if (email == ""){
        alert("Por favor, digite o email do(a) amigo(a)");
    }
    else {
        amigos[nome] = email; //Adciona a chave e valor ao dic "amigos"
        limparCampo(); // Limpa os campos
        console.log(amigos);
        for (let chave in amigos) { // Estrutura de repetição para adicionar cada elemento na lista de amigos
            let listaItem = document.createElement("li"); //Cria um item <"li">
            listaItem.textContent = `${chave}: ${amigos[chave]}`; //Define o texto do item como nome e e-mail de cada amigo
            listaAmigos.appendChild(listaItem); //Adiciona o item a <ul>
            console.log(listaAmigos);
        }
    }
}

//Função para exibir o resultado
function sortearAmigo(){
    if (amigos.length != 0){   
        let resultado = document.getElementById("resultado");
        //Gera um índice aleátorio para o array amigos
        let amigoSorteado = amigos[parseInt(Math.random() * amigos.length)];
        console.log(amigoSorteado);
        resultado.innerHTML = amigoSorteado;

    }
    else{
        alert("Favor adcionar pelo menos 3 amigos!")
    }
}