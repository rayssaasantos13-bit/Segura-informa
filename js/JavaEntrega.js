// ============================
// MENU
// ============================

function toggleMenu() {
    document.getElementById("menuLateral").classList.toggle("ativo");
}

let formulario;



// ========================
// INICIAR
// ========================


window.onload = function(){


    formulario =
    document.getElementById("Entrega");


    carregarFuncionarios();


    carregarEPIs();



    formulario.addEventListener(
        "submit",
        cadastrarEntrega
    );


};





// ========================
// BUSCAR FUNCIONÁRIOS
// ========================


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

alert(
"Erro ao carregar funcionários"
);


});


}






// ========================
// BUSCAR EPIS
// ========================


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
data-ca="${e.numero_Ca}">

${e.nome}

</option>

`;


});


})


.catch(erro=>{


console.log(erro);

alert(
"Erro ao carregar EPIs"
);


});


}






// ========================
// MOSTRAR NUMERO CA
// ========================


document.addEventListener(
"change",
function(e){


if(e.target.id === "epi"){


const opcao =
e.target.options[e.target.selectedIndex];


const ca =
opcao.getAttribute("data-ca");



document.getElementById("numeroCA").value =
ca || "Sem CA cadastrado";


}


});






// ========================
// CADASTRAR ENTREGA
// ========================


function cadastrarEntrega(event){


event.preventDefault();



const entrega = {


Data_Entrega:

document.getElementById("dataEntrega").value,



Data_Devolucao:

document.getElementById("dataDevolucao").value || null,



Fk_Usuario_Id_Usuario:

Number(
document.getElementById("funcionario").value
),



Confirmado:false,



entrega_de_epi:[


{

Fk_Epi_Id_Epi:

Number(
document.getElementById("epi").value
)


}

]


};





fetch("https://localhost:7175/Entrega_Epi",
{


method:"POST",


credentials:"include",


headers:{


"Content-Type":"application/json"


},


body:
JSON.stringify(entrega)


})


.then(async resposta=>{


const texto =
await resposta.text();



if(!resposta.ok){


throw new Error(texto);


}



return texto;



})


.then(()=>{


alert(
"Entrega cadastrada com sucesso!"
);



formulario.reset();



document.getElementById("numeroCA").value="";



})


.catch(erro=>{


console.log(erro);


alert(
"Erro ao cadastrar: " + erro.message
);


});


}