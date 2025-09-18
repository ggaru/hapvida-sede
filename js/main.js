
// array de dicionários de cada funcionário
const beneficiarios = [
  
  //padrão: nome e coparticipação
  { nome: "Alexandro Lima",
    coparticipacao: 0},
    
  { nome: "Ana Ligia",
    coparticipacao: 166.90},

  { nome: "Ananias Neto",
    coparticipacao: 0,
    dependentes:[{
      nome: "Jade Sophia",
      mensalidade: 144.96,
      coparticipacao: 0,}]},  
  
  { nome: "Valdeane",
    coparticipacao: 0,
    dependentes:[{
      nome: "Agatha Valentina",
      mensalidade: 144.96,
      coparticipacao:23.20,}]},
    
  { nome: "Charliane Mariano",
    coparticipacao: 0},
  
  { nome: "Derik Jonathan",
    coparticipacao: 0},

  { nome: "Dian Kelly",
    coparticipacao: 0,
    dependentes: [
      { nome:"Sarah Vitória",
        mensalidade: 144.96,
        coparticipacao: 0},
      { nome: "Samuel Victor",
        mensalidade: 144.96,
        coparticipacao:0},]},

  { nome: "Felipe Marques",
    coparticipacao: 0},

  { nome: "Sousa",
    coparticipacao: 0},

  { nome: "João Batista",
    coparticipacao: 0,
    dependentes: [
    { nome: "Jucelia Paula",
      mensalidade: 337.09,
      coparticipacao:0,},
    { nome: "Natan de sousa",
      mensalidade: 160.67,
      coparticipacao:44.45,},
    { nome: "Noemi de Sousa",
      mensalidade: 160.67,
      coparticipacao:0,},]},
  
  { nome: "João de melo",
    coparticipacao: 0},    
  
  { nome: "José Maria",
    coparticipacao: 0},    
  
  { nome: "Kleber Viana",
    coparticipacao: 23.20,
    dependentes: [
      { nome:"Kaua Silva",
        mensalidade: 144.96,
        coparticipacao:23.20},
      { nome:"Kaleb Silva",
        mensalidade: 144.96,
        coparticipacao:37.40},]},    
  
  { nome: "Marcos Alves",
    coparticipacao: 39.73}, 
  
  { nome: "Vinicius Pinheiro",
    coparticipacao:23.20},  

  { nome: "Mikael Marreiro",
    coparticipacao:21.25},  

  { nome: "Wender Vaz",
    coparticipacao:0,
    dependentes:[
      { nome: "Maryana Victoria",
        mensalidade:160.67,
        coparticipacao:23.20}]},  
];

const meses = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];
var total = 0
var valorMen = 0;
var valorCop = 0;

function formatarDados(){

  const dataAtual = new Date()
  const ano = dataAtual.getFullYear();
  const mes = dataAtual.getMonth() + 1;
  const dia = dataAtual.getDate();

  const head = document.getElementById('header');
  const p1 = document.getElementById('text') || document.createElement('p');
  p1.id = "text"
  p1.textContent = 'Desconto na quantia de R$ '+total+' referente ao plano de saúde empresarial correspondente ao mês de '+ meses[mes]+".";
 
  head.appendChild(p1);
  document.getElementById('mes').innerHTML = meses[mes]
  const container = document.getElementById('container-table') ;
  const p = document.getElementById('data') || document.createElement('p');
  p.id = 'data';
  p.textContent = 'Fortaleza, ' + dia + ' de ' + meses[mes] + ' de ' + ano;
  
  container.appendChild(p);
}
//função que se inicia após o botão Consultar ser pressionado
function consultar(){
  total = 0;
  valorMen= 0;
  valorCop = 0;

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
  formatarDados();

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
        valorMen += dependente.mensalidade
        
        
      }
      //verifica se aquele dependente possui coparticipação
      if (dependente.coparticipacao > 0){
        //total += dependente.coparticipacao
        valorCop += dependente.coparticipacao;
        getCop(dependente)
      }
      
    }
    addTotals(valorMen,"Valor Dependentes");
  }

}
  
//função que buscará pela coparticipação
function getCop(beneficiario){
  if (beneficiario.coparticipacao >0){
    addLines("Coparticipação", beneficiario.nome, beneficiario.coparticipacao)
    total += beneficiario.coparticipacao
    addTotals(valorCop,"Valor Coparticipação"); 
  }
  
}

function getTotal(total){
    item =document.getElementsByClassName("total")
    item[0].innerHTML = 'R$ ' + total
    item[1].innerHTML = 'R$ ' + total
}

function addTotals(valor, desc){
  const tfoot = document.querySelector("tfoot")
  const tr = document.createElement("tr")
  tr.id ="totals";
  tr.innerHTML=`
    <td> &nbsp; </td>
    <td> ${desc} </td>
    <td> R$ ${valor} </td>
  `
  tfoot.insertBefore(tr,tfoot.children[0])
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








