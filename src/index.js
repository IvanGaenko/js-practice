/* eslint-disable no-restricted-globals */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
import './style.css';
import './reset.css';
import { addDescription, addValue } from './domVariables';

let earnId = 0;
let spendId = 0;
const earnMap = new Map();
const spendMap = new Map();

class CashTracker {
  constructor() {
    this.earnId = earnId;
    this.spendId = spendId;
    this.note = document.createElement('div');
    this.description = document.createElement('span');
    this.moneySpend = document.createElement('span');
    this.moneyEarn = document.createElement('span');
    this.deleteButton = document.createElement('button');
    this.spendPercent = document.createElement('div');
    this.jsPlusMinus = document.getElementById('jsPlusMinus');
    this.incomeColumnInput = document.getElementById('incomeColumnInput');
    this.expensesColumnInput = document.getElementById('expensesColumnInput');
    this.jsHeaderSumIncome = document.getElementById('jsHeaderSumIncome');
    this.jsHeaderSumExpenses = document.getElementById('jsHeaderSumExpenses');
    this.jsMoney = document.getElementById('jsMoney');
    this.headerPercent = document.getElementById('headerPercent');
    this.jsPlusMinus = document.getElementById('jsPlusMinus');
    this.descValue = addDescription.value;

    if (!(Number.isNaN(Number(addValue.value)))) {
      this.valValue = Number(addValue.value);
    } else {
      this.valValue = '0'; // add validation
    }
  }

  submit() {
    if (jsPlusMinus.value === '+') {
      earnMap.set(`earnNote-${this.earnId}`, Math.abs(this.valValue));
      this.earnId = earnId++;
      addDescription.value = '';
      addValue.value = '';
      this.earnSum();
      this.balance();
      this.render();
    } else {
      spendMap.set(`spendNote-${this.spendId}`, Math.abs(this.valValue));
      this.spendId = spendId++;
      addDescription.value = '';
      addValue.value = '';
      this.spendSum();
      this.balance();
      this.render();
    }
  }

  earnSum() {
    const earnSumArr = [];
    let signPlus = '+';

    for (const value of earnMap.values()) {
      earnSumArr.push(Number(value));
    }

    const sumEarn = earnSumArr.reduce((first, second) => first + second, 0);

    if (sumEarn === 0) {
      signPlus = '';
    }
    this.jsHeaderSumIncome.innerHTML = `${signPlus + sumEarn}`;

    return sumEarn;
  }

  spendSum() {
    const spendSumArr = [];
    let signMinus = '-';

    for (const value of spendMap.values()) {
      spendSumArr.push(Number(value));
    }

    const sumSpend = spendSumArr.reduce((first, second) => first + second, 0);

    if (sumSpend === 0) {
      signMinus = '';
    }

    this.jsHeaderSumExpenses.innerHTML = `${signMinus + sumSpend}`;
    return sumSpend;
  }

  balance() {
    let earnSum = this.earnSum();
    let spendSum = this.spendSum();

    const balanceTotal = earnSum - spendSum;
    let balanceSign = '';

    if (balanceTotal > 0) {
      balanceSign = '+';
    }
    this.jsMoney.innerHTML = `${balanceSign + balanceTotal}`;

    if (earnSum === 0) {
      earnSum = spendSum;
    }

    if (spendSum === 0) {
      spendSum = earnSum;
    }

    const percentTotal = (100 * spendSum / earnSum).toFixed(1);
    if (!(isNaN(percentTotal))) {
      this.headerPercent.innerHTML = `${percentTotal}%`;
    } else {
      this.headerPercent.innerHTML = '0.0%';
    }
  }

  render() {
    if (jsPlusMinus.value === '+') {
      this.renderEarn();
    } else {
      this.renderSpend();
    }
  }

  renderEarn() {
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
  }

  renderSpend() {
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
    this.spendPercent.innerHTML = '0.0%';
    this.note.appendChild(this.description);
    this.note.appendChild(this.moneySpend);
    this.note.appendChild(this.deleteButton);
    this.note.appendChild(this.spendPercent);
    return this.expensesColumnInput.appendChild(this.note);
  }

  deleteEarn(delEarnValue) {
    const remId = document.getElementById(delEarnValue);
    remId.remove();
    earnMap.delete(delEarnValue);
    this.earnSum();
    this.balance();
  }

  deleteSpend(delSpendValue) {
    const remId = document.getElementById(delSpendValue);
    remId.remove();
    spendMap.delete(delSpendValue);
    this.spendSum();
    this.balance();
  }
}

submitButton.addEventListener('click', (e) => {
  if (e.target.classList[0] === 'submit-button') {
    const cash = new CashTracker();
    cash.submit();
  }
});

incomeColumn.addEventListener('click', (e) => {
  if (e.target.classList[1] === 'note-earn-delete-button') {
    const delValue = e.target.id.split('-');
    const delEarnValue = `earnNote-${delValue[2]}`;
    const cash = new CashTracker();
    cash.deleteEarn(delEarnValue);
  }
});

expensesColumn.addEventListener('click', (e) => {
  if (e.target.classList[1] === 'note-spend-delete-button') {
    const delValue = e.target.id.split('-');
    const delSpendValue = `spendNote-${delValue[2]}`;
    const cash = new CashTracker();
    cash.deleteSpend(delSpendValue);
  }
});
