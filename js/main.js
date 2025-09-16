
// array de dicionários de cada funcionário
const beneficiarios = [
  
  //padrão: nome e coparticipação
  { nome: "Alexandro Lima",
    coparticipacao: 0},
    
  { nome: "Ana Ligia",
    coparticipacao: 0},

  { nome: "Ananias Neto",
    coparticipacao: 0,
    dependentes:[{
      nome: "Jade Sophia",
      mensalidade: 0,
      coparticipacao: 0,}]},  
  
  { nome: "Valdeane",
    coparticipacao: 0,
    dependentes:[{
      nome: "Agatha Valentina",
      mensalidade: 0,
      coparticipacao:0,}]},
    
  { nome: "Charliane Mariano",
    coparticipacao: 0},
  
  { nome: "Derik Jonathan",
    coparticipacao: 0},

  { nome: "Dian Kelly",
    coparticipacao: 0,
    dependentes: [
      { nome:"Sarah Vitória",
        mensalidade: 0,
        coparticipacao: 0},
      { nome: "Samuel Victor",
        mensalidade: 0,
        coparticipacao:0},]},

  { nome: "Felipe Marques",
    coparticipacao: 0},

  { nome: "Sousa",
    coparticipacao: 0},

  { nome: "João Batista",
    coparticipacao: 20,
    dependentes: [
    { nome: "Jucelia Paula",
      mensalidade: 10,
      coparticipacao:20.07,},
    { nome: "Natan de sousa",
      mensalidade: 10.59,
      coparticipacao:20.00,},
    { nome: "Noemi de Sousa",
      mensalidade: 10,
      coparticipacao:20,},]},
  
  { nome: "João de melo",
    coparticipacao: 0},    
  
  { nome: "José Maria",
    coparticipacao: 0},    
  
  { nome: "Kleber Viana",
    coparticipacao: 0,
    dependentes: [
      { nome:"Kaua Silva",
        mensalidade: 0,
        coparticipacao:0},
      { nome:"Kaleb Silva",
        mensalidade: 0,
        coparticipacao:0},]},    
  
  { nome: "Marcos Alves",
    coparticipacao: 0}, 
  
  { nome: "Vinicius Pinheiro",
    coparticipacao:0},  

  { nome: "Mikael Marreiro",
    coparticipacao:0},  

  { nome: "Wender Vaz",
    coparticipacao:0,
    dependentes:[
      { nome: "Maryana Victoria",
        mensalidade:0,
        coparticipacao:0}]},  
];

const meses = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

var total = 0

const dataAtual = new Date()
const ano = dataAtual.getFullYear();
const mes = dataAtual.getMonth() + 1;
const dia = dataAtual.getDate();

const p1 = document.createElement('p');
p1.textContent = 'Desconto na quantia de R$ '+total+' referente ao plano de saúde empresarial correspondente ao mês de'+ meses[mes].
const head = document.getElementById('header');
head.appendChild(p1);

const p = document.createElement('p');
p.id = 'data';
p.textContent = 'Fortaleza, ' + dia + ' de ' + meses[mes] + ' de ' + ano;
const container = document.getElementById('container-table');
container.appendChild(p);

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
      if (dependente.mensalidade > 0){
        addLines("Dependente", dependente.nome, dependente.mensalidade)
        total += dependente.mensalidade
      }
      //verifica se aquele dependente possui coparticipação
      if (dependente.coparticipacao > 0){
      //se possuir, chama a função

        getCop(dependente)
      }

    }
  }
}
  
//função que buscará pela coparticipação
function getCop(beneficiario){
  if (beneficiario.coparticipacao >0){
   addLines("Coparticipação", beneficiario.nome, beneficiario.coparticipacao)
   total += beneficiario.coparticipacao
  }
}



function getTotal(total){
    item =document.getElementsByClassName("total")
    item[0].innerHTML = 'R$ ' + total
    item[1].innerHTML = 'R$ ' + total
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








