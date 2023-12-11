let usuarios;
async function getUsers(){
  try {
    const res = await fetch(`https://randomuser.me/api/?results=10`);
    const data = await res.json();

    if(!res.ok){
      console.log(data.description);
      return;
    }

    usuarios = data.results;
    criaCards(usuarios);

  } catch (error) {
    console.log(`Erro: ${error}`);
  }
}

getUsers();

function criaCards(usuarios){
  const container = document.querySelector('.container-cards')
  console.log(usuarios);

  usuarios.forEach(element => {

    container.innerHTML += 
    `<div class="card">
      <img src="${element.picture.large
      }" alt="">
      <h1>${element.name.first} ${element.name.last}</h1>
      <p>${element.email}</p>
      <button class="remover">Remover</button>
    </div>`;
  });

  actionRemover();
}

function actionRemover(params) {
  const btnRemover = document.querySelectorAll('.remover')

  console.log(btnRemover);

  btnRemover.forEach(botao => {
    botao.addEventListener('click', excluirCard);
  });
}

function excluirCard(){
  
}