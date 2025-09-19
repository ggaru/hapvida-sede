
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
  p1.textContent = 'Desconto na quantia de R$ '+total.toFixed(2)+' referente ao plano de saúde empresarial correspondente ao mês de '+ meses[mes]+".";
 
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
  const tfootExistente = document.querySelector("tfoot")
  console.log(tfootExistente)
  if  (tfootExistente) tfootExistente.remove()
  const tbodyExistente = document.querySelector(".tbody");
  if(tbodyExistente) tbodyExistente.remove();

  // le o valor recebido na linha titular
  const input = document.getElementById("Titular").value;
  //le todos os beneficiarios do array
  for(var i = 0; i< beneficiarios.length; i++){
    titular = beneficiarios[i]
    
    //verifica se aquele titular existe, se nao, continua procurando até o fim do array
    if (input == titular.nome){
      console.log("Titular: "+titular.nome)
      //existindo, chama a função, passando o titular
      if (titular.dependentes){
        getDep(titular);
      }
      getCop(titular)
    }else{
      continue;
    }
  }
  formatarDados();
  addTotal();
  getTotal(total);  
}
//função que retornará os dependentes do titular
function getDep(titular){
    console.log("chamando função getdep")
    for(var j = 0; j< titular.dependentes.length; j++){
      //armazenando o nome e o valor de mensalidade de cada dependente
      const dependente = titular.dependentes[j]
      //muda no html o nome e o valor da tabela
      if (dependente.mensalidade > 0){
        addLines("Dependente", dependente.nome, dependente.mensalidade)
        total += dependente.mensalidade
        valorMen += dependente.mensalidade
      } 
    }
  addTotals(valorMen,"Valor Dependentes");
}
//função que buscará pela coparticipação
function getCop(beneficiario){
  console.log("chamando função getcop")
  console.log("Coparticipação: "+ beneficiario.nome +": "+ beneficiario.coparticipacao)
  if (beneficiario.coparticipacao>0){
    total += beneficiario.coparticipacao
    valorCop += beneficiario.coparticipacao
    addLines("Coparticipação", beneficiario.nome, beneficiario.coparticipacao)
  }
  if (beneficiario.dependentes){
    for (var i = 0; i <beneficiario.dependentes.length; i++){
      if (beneficiario.dependentes[i].coparticipacao > 0){
        total += beneficiario.dependentes[i].coparticipacao
        valorCop += beneficiario.dependentes[i].coparticipacao
        addLines("Coparticipação", beneficiario.dependentes[i].nome, beneficiario.dependentes[i].coparticipacao)
      }
    }
  }
  addTotals(valorCop,"Valor Coparticipação"); 
}
function getTotal(total){
    item =document.getElementsByClassName("total")
    item[0].innerHTML = 'R$ ' + total.toFixed(2)
    item[1].innerHTML = 'R$ ' + total.toFixed(2)
}
function addTotals(valor, desc){
  console.log("chamando função addtotals")

  if (valor > 0){
    const tfoot = document.querySelector("tfoot") || criarTfoot();
    const tr = document.createElement("tr")
    tr.className ="totals";
    
    tr.innerHTML=`
      <td> &nbsp; </td>
      <td> ${desc} </td>
      <td> R$ ${valor.toFixed(2)} </td>
    `
    tfoot.insertBefore(tr,tfoot.children[0])
  }
}

function addLines(descricao, beneficiario, valor) {
    const tbody = document.querySelector(".tbody") || criarTbody(); // cria tbody se não existir
    const tr = document.createElement("tr");
    tr.className = "table-row";
    tr.innerHTML = `
        <td>${descricao}</td>
        <td>${beneficiario}</td>
        <td> R$ ${valor.toFixed(2)}</td>
    `;
    tbody.appendChild(tr);
}

function addTotal(){
  console.log("testando classe addTotal")
  const tfoot = document.querySelector("tfoot")
  const tr = document.createElement("tr")
  tr.className ="table-foot";
  
  tr.innerHTML=`
    <td> &nbsp; </td>
    <td> Valor Total</td>
    <td class="total" > </td>
  `

  tfoot.appendChild(tr)
}

function criarTbody(){
  const tabela = document.querySelector(".tabela")
  const tbody = document.createElement("tbody");
  tbody.className = "tbody";
  tabela.insertBefore(tbody, tabela.querySelector("tfoot"))
  return tbody;
}

function criarTfoot(){
  const tabela = document.querySelector(".tabela")
  const tfoot = document.createElement("tfoot");
  tfoot.className = "tfoot";
  tabela.insertBefore(tfoot, tabela.querySelector("tfoot"))
  return tfoot;
}