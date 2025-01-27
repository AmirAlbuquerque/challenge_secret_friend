//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema.

let amigos = [];
//let i = 0;

function limparCampo(){
    document.querySelector("input").value = "";
}

// Função para armazenar o nome dos amigos e limpar o input
function adicionarAmigo(){
    if (document.querySelector("input").value == ""){
        alert("Por favor, digite o nome do(a) amigo(a)");
    }
    else {
        //amigos[i] = document.querySelector("input").value;
        amigos.push(document.querySelector("input").value);
        limparCampo();
        //i++;
        console.log(amigos);
        
        // Adicionando os amigos em forma de lista
        let listaAmigos = document.getElementById("listaAmigos");
        listaAmigos.innerHTML = "";
        // Estrutura de repetição
        amigos.forEach((amigo) => {
        let listaItem = document.createElement("li"); //Cria um item <li>
        listaItem.textContent = amigo; //Define o texto do item como nome de cada amigo
        listaAmigos.appendChild(listaItem); //Adiciona o item a <ul>
        console.log(listaAmigos);
        });
    }
}
