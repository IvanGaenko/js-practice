import _ from 'lodash';
import './style.css';
import './reset.css';

const addDescription = document.getElementById("addDescription");
const addValue = document.getElementById("addValue");
const submitButton = document.getElementById("submitButton");
// const incomeColumnInput = document.getElementById("incomeColumnInput");
// const expensesColumnInput = document.getElementById("expensesColumnInput");

// let id = 0;
// const config = new Map();

// class CashTracker {
//   constructor() {
//     this.state = { money: config };
//     this.is = id++;
//     this.body = document.createElement('div');
//     this.description = document.createElement('span');
//     this.moneySpend = document.createElement('span');
//     this.moneyEarn = document.createElement('span');
//     this.deleteButton = document.createElement('button');
//   }

//   render() {
//     config.forEach((cash) => {
//       this.body.id = `item-${this.id}`;
//       this.deleteButton.type = 'button';
//       this.deleteButton.innerText = 'Delete';
//       this.deleteButton.id = `button-remove-${this.id}`;
//       this.body.appendChild(this.description);
//       this.body.appendChild(this.deleteButton);
//     });
//   }
// };

// // class Income extends CashTracker {
// //   constructor() {
// //     super();
// //     this.state = { title };
// //   }


// // }

// const cash = new CashTracker();
// cash.render();

const jsPlusMinus = document.getElementById("jsPlusMinus");

submitButton.addEventListener("click", () => {
  if (jsPlusMinus.value == '+') {
    console.log("Income")
  } else {
    console.log("Expenses")
  }
  // console.log(jsPlusMinus.value == '+');
  console.log(addDescription.value);
  console.log(addValue.value);
});

