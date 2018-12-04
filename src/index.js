import _ from 'lodash';
import './style.css';
import './reset.css';

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
    this.jsPlusMinus = document.getElementById('jsPlusMinus');
    this.incomeColumnInput = document.getElementById("incomeColumnInput");
    this.expensesColumnInput = document.getElementById("expensesColumnInput");
    this.jsHeaderSumIncome = document.getElementById('jsHeaderSumIncome');
    this.jsHeaderSumExpenses = document.getElementById('jsHeaderSumExpenses');
    this.jsMoney = document.getElementById('jsMoney');
    this.descValue = addDescription.value;
    // if (Number.isInteger(addValue.value) || !(addValue.value === "")) {
    //   this.valValue = addValue.value;
    // } else {
    //   this.valValue = 0;
    // };
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
      console.log(spendConfig);
      this.spendSum();
      this.balance();
      this.render();
    }
  }

  earnSum() {
    let esum = [];
    for (let val of earnConfig.values()) { esum.push(Number(val)) };
    let sumE = esum.reduce((first, second) => first + second, 0);
    this.jsHeaderSumIncome.innerHTML = `+${sumE}`;
    console.log(sumE);
    return sumE;
  }

  spendSum() {
    let spSum = [];
    for (let val of spendConfig.values()) { spSum.push(Number(val)) };
    let sumS = spSum.reduce((first, second) => first + second, 0);
    this.jsHeaderSumExpenses.innerHTML = `-${sumS}`;
    console.log(sumS);
    return sumS;
  }

  balance() {
    let bal = this.earnSum() - this.spendSum();
    this.jsMoney.innerHTML = `${bal}`;
    console.log("Balance"+bal);
  }

  render() {
    if (jsPlusMinus.value == '+') {
    earnConfig.forEach((earnId) => {
      this.note.id = `earnNote-${this.earnId}`;
      this.note.classList.add('note', 'earn-note');
      this.description.innerHTML = this.descValue;
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
        this.description.innerHTML = this.descValue;
        this.moneySpend.innerHTML = this.valValue;
        this.deleteButton.innerText = 'Delete';
        this.deleteButton.type = 'button';
        this.deleteButton.id = `button-remove-${this.spendId}`;
        this.deleteButton.classList.add('btn', 'note-spend-delete-button');
        this.note.appendChild(this.description);
        this.note.appendChild(this.moneySpend);
        this.note.appendChild(this.deleteButton);
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

submitButton.addEventListener('click', () => {
  const cash = new CashTracker();
  cash.submit();
  return cash;
});

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