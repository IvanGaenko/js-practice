import _ from 'lodash';
import './style.css';
import './reset.css';

// import Background from '/background,jpg';

// let myBackground = new Image();
// myBackground.src = Background;
// const header = document.getElementById('header');
// header.appendChild(myBackground);

const addDescription = document.getElementById("addDescription");
const addValue = document.getElementById("addValue");
const submitButton = document.getElementById("submitButton");
const incomeColumn = document.getElementById('incomeColumn');
const expensesColumn = document.getElementById('expensesColumn');

let earnId = 0;
let spendId = 0;
const earnConfig = new Map();
const spendConfig = new Map();

class CashTracker {
  constructor() {
    this.earnState = { money: earnConfig };
    this.spendState = { money: spendConfig };
    this.earnId = earnId;
    this.spendId = spendId;
    this.note = document.createElement('div');
    this.description = document.createElement('span');
    this.moneySpend = document.createElement('span');
    this.moneyEarn = document.createElement('span');
    this.deleteButton = document.createElement('button');
    this.spendPercent = document.createElement('div');
    this.jsPlusMinus = document.getElementById('jsPlusMinus');
    this.incomeColumnInput = document.getElementById("incomeColumnInput");
    this.expensesColumnInput = document.getElementById("expensesColumnInput");
    this.jsHeaderSumIncome = document.getElementById('jsHeaderSumIncome');
    this.jsHeaderSumExpenses = document.getElementById('jsHeaderSumExpenses');
    this.jsMoney = document.getElementById('jsMoney');
    this.headerPercent = document.getElementById('headerPercent');
    this.descValue = addDescription.value;
    if (!(Number.isNaN(Number(addValue.value)))) {
      this.valValue = Math.abs(Number(addValue.value));
    } else {
      this.valValue = "0";
    }; 
  }
  
  submit() {
    if (jsPlusMinus.value == '+') {
      earnConfig.set(`earnNote-${this.earnId}`, this.valValue);
      this.earnId = earnId++;
      this.earnSum();
      this.balance();
      this.render();
    } else {
      spendConfig.set(`spendNote-${this.spendId}`, this.valValue);
      this.spendId = spendId++;
      this.spendSum();
      this.balance();
      this.render(); 
    }
  }

  earnSum() {
    let esum = [];
    let signPlus = "+";
    for (let val of earnConfig.values()) { esum.push(Number(val)) };
    let sumE = esum.reduce((first, second) => first + second, 0);
    if (sumE === 0) { signPlus = "" } ;
    this.jsHeaderSumIncome.innerHTML = `${signPlus + sumE}`;
    return sumE;
  }

  spendSum() {
    let spSum = [];
    let signMinus = "-";
    for (let val of spendConfig.values()) { spSum.push(Number(val)) };
    let sumS = spSum.reduce((first, second) => first + second, 0);
    if (sumS === 0) { signMinus = "" };
    this.jsHeaderSumExpenses.innerHTML = `${signMinus + sumS}`;
    return sumS;
  }

  balance() {
    let balanceTotal = this.earnSum() - this.spendSum();
    let balanceSign = "";
    if (balanceTotal > 0) { balanceSign = "+"; };
    this.jsMoney.innerHTML = `${balanceSign + balanceTotal}`;
    let earnSum = this.earnSum();
    let spendSum = this.spendSum();
    if (earnSum === 0) { earnSum = spendSum };
    let percentTotal = (100 * spendSum / earnSum).toFixed(1);
    if (!(isNaN(percentTotal))) {
      this.headerPercent.innerHTML = `${percentTotal}%`;
    } else {
      this.headerPercent.innerHTML = "0.0%";
    }
  }

  render() {
    if (jsPlusMinus.value == '+') {
    earnConfig.forEach((earnId) => {
      this.note.id = `earnNote-${this.earnId}`;
      this.note.classList.add('note', 'earn-note');
      this.description.classList.add('description');
      this.description.innerHTML = this.descValue;
      this.moneyEarn.classList.add('money-value');
      this.moneyEarn.innerHTML = this.valValue;
      this.deleteButton.innerText = 'Delete';
      this.deleteButton.type = 'button';
      this.deleteButton.id = `button-remove-${this.earnId}`;
      this.deleteButton.classList.add('btn', 'note-earn-delete-button');
      this.note.appendChild(this.description);
      this.note.appendChild(this.moneyEarn);
      this.note.appendChild(this.deleteButton);
      return this.incomeColumnInput.appendChild(this.note);
    });
    } else {
      spendConfig.forEach((spendId) => {
        this.note.id = `spendNote-${this.spendId}`;
        this.note.classList.add('note', 'spend-note');
        this.description.classList.add('description');
        this.description.innerHTML = this.descValue;
        this.moneySpend.classList.add('money-value');
        this.moneySpend.innerHTML = this.valValue;
        this.deleteButton.innerText = 'Delete';
        this.deleteButton.type = 'button';
        this.deleteButton.id = `button-remove-${this.spendId}`;
        this.deleteButton.classList.add('btn', 'note-spend-delete-button');
        this.spendPercent.id = `spendPercent-${this.spendId}`;
        this.spendPercent.classList.add('spend-btn');
        this.spendPercent.innerHTML = "0.0%";
        this.note.appendChild(this.description);
        this.note.appendChild(this.moneySpend);
        this.note.appendChild(this.deleteButton);
        this.note.appendChild(this.spendPercent);
        return this.expensesColumnInput.appendChild(this.note);
        });
      }
    };

  deleteEarn(delEarnValue) {
    let remId = document.getElementById(delEarnValue);
    remId.remove();
    earnConfig.delete(delEarnValue);
    this.earnSum();
    this.balance();
  };

  deleteSpend(delSpendValue) {
    let remId = document.getElementById(delSpendValue);
    remId.remove();
    spendConfig.delete(delSpendValue);
    this.spendSum();
    this.balance();
  }
};

submitButton.addEventListener('click', (e) => {
  if (e.target.classList[0] === 'submit-button') {
  const cash = new CashTracker();
  cash.submit();
}});

incomeColumn.addEventListener('click', (e) => {
  if (e.target.classList[1] === 'note-earn-delete-button') {
    const delValue = e.target.id.split('-');
    const delEarnValue = `earnNote-${delValue[2]}`;
    const cash = new CashTracker();
    cash.deleteEarn(delEarnValue);
}});

expensesColumn.addEventListener('click', (e) => {
  if (e.target.classList[1] === 'note-spend-delete-button') {
    const delValue = e.target.id.split('-');
    const delSpendValue = `spendNote-${delValue[2]}`;
    const cash = new CashTracker();
    cash.deleteSpend(delSpendValue);
}});