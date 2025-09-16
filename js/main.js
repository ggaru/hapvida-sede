
// array de dicionários de cada funcionário
const beneficiarios = [
  
  //padrão: nome e coparticipação
  { nome: "Vinicius",
    coparticipacao: 100
  },

  //para funcionários com dependentes, um array com um dict de nome e coparticipação de cada dependente.
  { nome: "Ligia",
    coparticipacao: 147.23,
    dependentes: 
      [{ 
      nome:"Felipe",
      mensalidade: 123.23,
      coparticipacao: 100,
      }],
  },

  { nome: "João de Melo",
    coparticipacao: 0
  },
];

var total = 0

//função que se inicia após o botão Consultar ser pressionado
function consultar(){
  total = 0;
  const tbodyExistente = document.querySelector(".tbody");
  if(tbodyExistente) tbodyExistente.remove();

  // le o valor recebido na linha titular
  const input = document.getElementById("Titular").value;
  //le todos os beneficiarios do array
  for(var i = 0; i< beneficiarios.length; i++){
    titular = beneficiarios[i]
    //verifica se aquele titular existe, se nao, continua procurando até o fim do array
    if (input == titular.nome){
      //existindo, chama a função, passando o titular
      getCop(titular);
      getDep(titular);
      getTotal(total);
      break;
    }else{
      continue;
    }
    
  }

}

//função que retornará os dependentes do titular
function getDep(titular){
  //verificando se o beneficiario realmente tem dependentes
  

  if (titular.dependentes != undefined){
    //caso tenha, sonda por cada dependente dele
    for(var j = 0; j< titular.dependentes.length; j++){
      //armazenando o nome e o valor de mensalidade de cada dependente
      const dependente = titular.dependentes[j]
      //muda no html o nome e o valor da tabela
      addLines("Dependente", dependente.nome, dependente.mensalidade)
      total += dependente.mensalidade

      //verifica se aquele dependente possui coparticipação
      if (dependente.coparticipacao != 0){
      //se possuir, chama a função
          getCop(dependente)
      }

    }
  }
}
  
//função que buscará pela coparticipação
function getCop(beneficiario){
   addLines("Coparticipação", beneficiario.nome, beneficiario.coparticipacao)
   total += beneficiario.coparticipacao
}



function getTotal(total){
    item =document.getElementsByClassName("total")
    item[0].innerHTML = total
    item[1].innerHTML = total
        

}


function addLines(descricao, beneficiario, valor) {
    const tbody = document.querySelector(".tbody") || criarTbody(); // cria tbody se não existir

    const tr = document.createElement("tr");
    tr.className = "table-row";

    tr.innerHTML = `
        <td>${descricao}</td>
        <td>${beneficiario}</td>
        <td>${valor}</td>
    `;
    tbody.appendChild(tr);
}

function criarTbody(){
  const tabela = document.querySelector(".tabela")
  const tbody = document.createElement("tbody");
  tbody.className = "tbody";
  tabela.insertBefore(tbody, tabela.querySelector("tfoot"))
  return tbody;
}








