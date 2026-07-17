const myForm = document.getElementById('loginUsuario');

if (myForm != null) {


    myForm.addEventListener('submit', function (event) {


        event.preventDefault();



        fetch('https://localhost:7175/usuario/login', {

            method: 'POST',

            credentials: 'include',

            headers: {

                'Content-Type': 'application/json',

            },


            body: JSON.stringify({

                nome: "",

                email: document.getElementById("email").value,

                senha: document.getElementById("senha").value,

                cargo: ""

            }),


        })


        .then(response => {


            if (!response.ok) {


                throw new Error("Login inválido");


            } else{
                   return response.text();
            }

        })



        .then(data => {

console.log("Cargo recebido:", data);
            

                   alert("Logado com sucesso");



            if (data.trim() === "Gestão") {


                window.location.href =
                    "mapaGest.html";


            }


            else if(data.trim() === "Funcionário") {


                window.location.href =
                    "mapa.html";


            }


            else {


                alert("Cargo não identificado.");

            }



        })



        .catch(error => {


            alert("Email ou senha incorretos!");

            console.log(error);


        });



    });


}