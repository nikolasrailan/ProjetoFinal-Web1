let usuarios;
async function getUsers(){
  try {
    const res = await fetch(`http://localhost:3000/usuarios`);
    const data = await res.json();

    if(!res.ok){
      console.log(data);
      return;
    }
    usuarios = data;
    criaCards(usuarios);

  } catch (error) {
    console.log(`Erro: ${error}`);
  }
}

getUsers();

function criaCards(usuarios){
  const container = document.querySelector('.container-cards')
  //console.log(usuarios);

  usuarios.forEach(element => {
    console.log(element.id);

    container.innerHTML += 
    `<div class="card">
      <img src="./img/icone.avif"/>
      <h1>${element.name}</h1>
      <p>${element.email}</p>
      <button class="remover">Remover</button>
    </div>`;
  });

  actionRemover();
}

async function deletarCards(id) {
  try {
    const res = await fetch(
      `http://localhost:3000/usuarios/${id}`,
      {
        method: "DELETE",
      },
    );

    const data = await res.json();

    if(!res.ok){
      console.log(data);

      return;
    }

    console.log(data);
  } catch (error) {

    console.log(error);
  }
}


function actionRemover(params) {
  const btnRemover = document.querySelectorAll('.remover')

  //console.log(btnRemover);



  btnRemover.forEach((botao, index) => {
    botao.addEventListener('click', ()=>{excluirCard(index)});
  });
}

function excluirCard(index){
  console.log(index);
  deletarCards(index)
}

async function novoUsuario(novoUsuario){
  try {
    const res = await fetch('http://localhost:3000/usuarios',
      {method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(novoUsuario),
      },
    );

    const data = await res.json();

    if(!res.ok){
      console.log(data);
      return;
    }

    console.log(data);

  } catch (error) {
    console.log(error);
  }
}

let formulario = document.querySelector("form");

formulario.onsubmit = (event) => {
  event.preventDefault();

  let inputNome = document.querySelector('input[name^="nome"]');
  let nome = inputNome.value;

  let inputEmail = document.querySelector('input[name^="email"]');
  let email = inputEmail.value;

  const user = {name: nome, email: email};

  novoUsuario(user);
}

//console.log(formulario);