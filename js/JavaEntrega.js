function toggleMenu() {
    document.getElementById("menuLateral").classList.toggle("ativo");
}


let formulario;


// ============================
// INICIAR
// ============================

window.onload = function(){

    formulario = document.getElementById("Entrega");


    carregarFuncionarios();

    carregarEPIs();


    if(formulario){

        formulario.addEventListener(
            "submit",
            cadastrarEntrega
        );

    }

};




// ============================
// BUSCAR FUNCIONÁRIOS
// ============================

function carregarFuncionarios(){


fetch("https://localhost:7175/Usuario",
{
credentials:"include"
})


.then(res=>res.json())


.then(lista=>{


const select =
document.getElementById("funcionario");


lista.forEach(usuario=>{


select.innerHTML +=
`
<option value="${usuario.id}">
${usuario.nome}
</option>
`;


});


})


.catch(erro=>{

console.log(erro);

Swal.fire({
    icon: "error",
    title: "Erro!",
    text: "Erro ao carregar funcionários.",
    confirmButtonColor: "#f97316",
    confirmButtonText: "OK"
});

});


}




// ============================
// BUSCAR EPIS
// ============================

function carregarEPIs(){


fetch("https://localhost:7175/Epi",
{
credentials:"include"
})


.then(res=>res.json())


.then(lista=>{


const select =
document.getElementById("epi");


select.innerHTML =
`
<option value="">
Selecione o EPI
</option>
`;


lista.forEach(e=>{


select.innerHTML +=
`

<option

value="${e.id_epi}"

data-ca="${e.numero_Ca}"

data-estoque="${e.qntd_Estoque}">

${e.nome.trim()}

</option>

`;


});


})


.catch(erro=>{

console.log(erro);

Swal.fire({
    icon: "error",
    title: "Erro!",
    text: "Erro ao carregar EPIs.",
    confirmButtonColor: "#f97316",
    confirmButtonText: "OK"
});
});


}




// ============================
// MOSTRAR CA E ESTOQUE
// ============================

document.addEventListener("change",function(e){


if(e.target.id==="epi"){


const opcao =
e.target.options[e.target.selectedIndex];


document.getElementById("numeroCA").value =
opcao.dataset.ca || "Sem CA";


document.getElementById("quantidade").value="";


document.getElementById("quantidade").max =
opcao.dataset.estoque;


}


});




// ============================
// CADASTRAR ENTREGA
// ============================

function cadastrarEntrega(event){


event.preventDefault();



const quantidade =
Number(
document.getElementById("quantidade").value
);



const epi =
document.getElementById("epi");



const estoque =
Number(
epi.options[epi.selectedIndex]
.dataset.estoque
);



if(quantidade <=0){

Swal.fire({
    icon: "warning",
    title: "Atenção!",
    text: "Quantidade inválida.",
    confirmButtonColor: "#f97316",
    confirmButtonText: "OK"
});

return;

}



if(quantidade > estoque){

Swal.fire({
    icon: "warning",
    title: "Estoque insuficiente!",
    text: "Disponível: " + estoque,
    confirmButtonColor: "#f97316",
    confirmButtonText: "OK"
});

return;

}




const entrega = {


Data_Entrega:

document.getElementById("dataEntrega").value,



Data_Devolucao:

document.getElementById("dataDevolucao").value || null,



Fk_Usuario_Id_Usuario:

Number(
document.getElementById("funcionario").value
),



Aceito:false,



entrega_de_epi:[

{

Fk_Epi_Id_Epi:

Number(
document.getElementById("epi").value
),


Quantidade: quantidade


}

]


};



console.log(entrega);



fetch(
"https://localhost:7175/Entrega_Epi",
{

method:"POST",

credentials:"include",

headers:{

"Content-Type":"application/json"

},

body:

JSON.stringify(entrega)


})

.then(async res=>{


const texto =
await res.text();


if(!res.ok){

throw new Error(texto);

}


return texto;


})


.then(msg=>{


Swal.fire({
    icon: "success",
    title: "Sucesso!",
    text: "Entrega cadastrada com sucesso.",
    confirmButtonColor: "#f97316",
    confirmButtonText: "OK"
});


formulario.reset();


document.getElementById("numeroCA").value="";


carregarGestaoEntregas();


})


.catch(erro=>{


console.log(erro);


Swal.fire({
    icon: "error",
    title: "Erro!",
    text: "Erro ao cadastrar: " + erro.message,
    confirmButtonColor: "#f97316",
    confirmButtonText: "OK"
});

});


}






// ============================
// LISTAR ENTREGAS GESTÃO
// ============================

function carregarGestaoEntregas(){



fetch(
"https://localhost:7175/Entrega_Epi/minhas-entregas",
{

credentials:"include"

}

)



.then(async res=>{


const texto =
await res.text();



console.log(
"RETORNO GESTÃO:",
texto
);



if(!res.ok){

throw new Error(texto);

}



return JSON.parse(texto);



})



.then(lista=>{


const pendentes =
document.getElementById(
"listaEntregasPendentes"
);



const confirmadas =
document.getElementById(
"listaEntregasConfirmadas"
);



const devolucoes =
document.getElementById(
"listaDevolucoesPendentes"
);




if(!pendentes){

return;

}



pendentes.innerHTML="";

confirmadas.innerHTML="";

devolucoes.innerHTML="";





lista.forEach(e=>{



const linha =

`

<tr>

<td>
${e.funcionario}
</td>


<td>
${e.epi}
</td>


<td>
${e.quantidade}
</td>


<td>
${formatarData(e.data_Entrega)}
</td>


<td>
${e.aceito ? "Confirmado" : "Aguardando"}
</td>


</tr>

`;




if(e.solicitou_Devolucao){


devolucoes.innerHTML += linha;


}

else if(e.aceito){


confirmadas.innerHTML += linha;


}

else{


pendentes.innerHTML += linha;


}



});



})



.catch(erro=>{


console.log(
"ERRO GESTÃO:",
erro
);

Swal.fire({
    icon: "error",
    title: "Erro!",
    text: "Erro ao carregar entregas da gestão.",
    confirmButtonColor: "#f97316",
    confirmButtonText: "OK"
});

});



}





// ============================
// FORMATAR DATA
// ============================

function formatarData(data){


if(!data){

return "-";

}


return new Date(data)
.toLocaleDateString("pt-BR");


}