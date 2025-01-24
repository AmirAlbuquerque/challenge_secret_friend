//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema.

let amigos = [];
//let i = 0;

function limparCampo(){
    document.querySelector("input").value = "";
}

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
    }
}