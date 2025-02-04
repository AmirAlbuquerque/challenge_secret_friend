let amigos = {}; //Definindo o dicionário amigos.
let listaSorteio = [] // Define lista para realizar sorteio.
//Função para sempre limpar os campos de input
function limparCampo(){
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
}

// Função para armazenar o nome dos amigos e limpar o input
function adicionarAmigo(){
    let nome = document.getElementById("nome").value // Definindo a variável nome como o input inserido no campo "nome"
    let email = document.getElementById("email").value // Definindo a variável email como o input inserido no campo "email"

    //Verificando se o campo nome e e-mail não estão vazios antes de prosseguir
    if (nome == ""){
        alert("Por favor, digite o nome do(a) amigo(a)");
    }
    else if (email == ""){
        alert("Por favor, digite o email do(a) amigo(a)");
    }
    else {
        amigos[nome] = email; //Adciona a chave e valor ao dic "amigos"
        listaSorteio.push(nome); // Adiciona lista para sorteio
        console.log(listaSorteio);
        limparCampo(); // Limpa os campos
        console.log(amigos);
        atualizarLista();
    }
}

function atualizarLista(){
    
    let listaAmigos = document.getElementById("listaAmigos");// Adicionando os amigos em forma de lista
    listaAmigos.innerHTML = ""; // Limpando a lista de amigos do HTML

    for (let chave in amigos) { // Estrutura de repetição para adicionar cada elemento na lista de amigos
        let item = document.createElement("li"); //Cria um item <"li">
        item.textContent = `${chave}: ${amigos[chave]}`; //Define o texto do item como nome e e-mail de cada amigo
        listaAmigos.appendChild(item); //Adiciona o item a <ul>
    }
}

// Muda a ordem da lista de amigos
function embaralharAmigos(lista) {
    for (let i = lista.length -1 ; i >0; i--) {
        const j = parseInt(Math.random() * (i+1));
        [lista[i], lista[j]] = [lista[j], lista[i]];
    }
}

//Função para exibir o resultado
function sortearAmigo(amigos){
    if (listaSorteio.length < 2){  
        alert("Favor adcionar pelo menos 2 amigos!");
        return null;
    }
    /*else{
        let resultado = document.getElementById("resultado");
        //Gera um índice aleátorio para o array amigos
        let amigoSorteado = listaSorteio[parseInt(Math.random() * listaSorteio.length)];
        console.log(amigoSorteado);
        resultado.innerHTML = amigoSorteado;
    }*/
    const dicSorteio = {};
    let tentativa = 0;
    
    do{
        tentativa++;
        embaralharAmigos(listaSorteio);
        //dicSorteio = {};

        let verificacao = true;
        for(let i = 0; i < listaSorteio.length; i++) {
            //const primeiroAmigo = listaSorteio[i]; // Pega o primeiro amigo da lista
            const sorteado = listaSorteio[(i+1) % listaSorteio.length]; // Pega o último amigo da lista
            if (listaSorteio[i] === sorteado) {
                verificacao = false;
                break;
            }
            dicSorteio[listaSorteio[i]] = sorteado;
        }
        if (verificacao) break;
        let resultado = document.getElementById("resultado");
        resultado = "Sorteio concluído!!"
    } while(tentativa < 100);

    if (tentativa >= 100) {
        alert("Não foi possível realizar o sorteio corretamente.");
        return null;
    }

    console.log(`Sorteio realizado após ${tentativa} tentativas.`);
    console.log("Resultado do sorteio:", dicSorteio);

    enviarEmails(dicSorteio);
}

function enviarEmails(dicSorteio){
    let sorteioComEmails = {};
    for (let nome in dicSorteio) {
        sorteioComEmails[nome] = {
            email: amigos[nome], 
            sorteado: dicSorteio[nome]
        };
    }

    fetch("https://challengesecretfriend.up.railway.app/enviar-email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ sorteio: sorteioComEmails })
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => {
        console.error("Erro ao enviar e-mails:", error);
        response.text().then(text => console.log("Resposta do servidor:", text));
    });
}