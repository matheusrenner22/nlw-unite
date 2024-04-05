let participantes = [
  {
    nome: "Diego Fernandes",
    email: "diego@gmail.com",
    dataInscricao: dayjs("2023-04-03"),
    dataCheckIn: dayjs("2023-05-04"),
  },
  {
    nome: "Mayk Brito",
    email: "mayk@gmail.com",
    dataInscricao: dayjs("2021-04-03"),
    dataCheckIn: dayjs("2022-04-04"),
  },
  {
    nome: "Ana Souza",
    email: "ana@gmail.com",
    dataInscricao: dayjs("2014-04-03"),
    dataCheckIn: dayjs("2020-04-04"),
  },
  {
    nome: "João Silva",
    email: "joao@gmail.com",
    dataInscricao: dayjs("2023-04-03"),
    dataCheckIn: dayjs("2023-04-04"),
  },
  {
    nome: "Maria Oliveira",
    email: "maria@gmail.com",
    dataInscricao: dayjs("2021-04-03"),
    dataCheckIn: dayjs("2021-04-04"),
  },
  {
    nome: "Pedro Santos",
    email: "pedro@gmail.com",
    dataInscricao: dayjs("2020-04-03"),
    dataCheckIn: dayjs("2021-04-04"),
  },
  {
    nome: "Carla Lima",
    email: "carla@gmail.com",
    dataInscricao: dayjs("2021-04-03"),
    dataCheckIn: dayjs("2022-04-04"),
  },
  {
    nome: "Lucas Sousa",
    email: "lucas@gmail.com",
    dataInscricao: dayjs("2020-04-03"),
    dataCheckIn: dayjs("2024-04-04"),
  },
  {
    nome: "Paula Costa",
    email: "paula@gmail.com",
    dataInscricao: dayjs("2021-04-03"),
    dataCheckIn: dayjs("2022-04-04"),
  },
  {
    nome: "Rafaela Santos",
    email: "rafaela@gmail.com",
    dataInscricao: dayjs("2024-04-03"),
    dataCheckIn: dayjs("2024-04-04"),
  },
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs().to(participante.dataInscricao);
  let dataCheckIn = dayjs().to(participante.dataCheckIn);

  if (participante.dataCheckIn === null) {
    dataCheckIn = `
      <button data-email="${participante.email}" onclick="fazerCheckIn(event)">
        Confirmar check-in
      </button>
    `;
  }

  return `
  <tr>
    <td>
      <strong>${participante.nome}</strong> <br />
      <small>${participante.email}</small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `;
};

const atualizarList = (participantes) => {
  let output = "";

  // // estrutura de repeticao - loop
  for (let participante of participantes) {
    // faça alguma coisa
    output += criarNovoParticipante(participante);
  }

  // substituir informação do HTML
  document.querySelector("tbody").innerHTML = output;
};

// executa função
atualizarList(participantes);

const adicionarParticipante = (event) => {
  event.preventDefault();

  const dadosDoFormulario = new FormData(event.target);
  const participante = {
    nome: dadosDoFormulario.get("nome"),
    email: dadosDoFormulario.get("email"),
    dataInscricao: new Date(),
    dataCheckIn: null,
  };

  // verificar se o participante já existe
  const participanteExiste = participantes.find((p) => {
    return p.email === participante.email;
  });

  if (participanteExiste) {
    alert("Email já cadastrado");
    return;
  }

  participantes = [participante, ...participantes];
  atualizarList(participantes);

  // Limpar o formulário
  event.target.querySelector('[name="nome"]').value = "";
  event.target.querySelector('[name="email"]').value = "";
};

const fazerCheckIn = (event) => {
  // confirmar se realmente quer o check-in
  const mensagemConfirmacao = "Tem certeza que deseja fazer o check-in?";
  if (confirm(mensagemConfirmacao) === false) {
    return;
  }

  // encontrar o participante dentro da lista
  const participante = participantes.find((pessoa) => {
    return pessoa.email === event.target.dataset.email;
  });

  // atualizar o check-in do participante
  participante.dataCheckIn = new Date();

  // atualizar a lista de participantes
  atualizarList(participantes);
};
