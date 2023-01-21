const budgetStatusDesc = document.getElementById("budgetStatusDesc");
const totalIncomes = document.getElementById("incomesValue");
const totalExpenses = document.getElementById("expensesValue");
const incomeTitleInput = document.getElementById("incomeTitle");
const incomeValueInput = document.getElementById("incomeValue");
const expenseTitleInput = document.getElementById("expenseTitle");
const expenseValueInput = document.getElementById("expenseValue");
const incomeList = document.getElementById("incomesList");
const expenseList = document.getElementById("expensesList");
const spendDescBalance = "Your balance is:";
const spendDescPositive = "You can still spend:";
const spendDescNegative = "Your balance is negative:";
const spendStatus = document.querySelector("#spendStatus");
const budgetDiffrence = document.querySelector("#budgetValue");
const expenseTotal = document.querySelector("#expensesValue");
const incomeTotal = document.querySelector("#incomesValue");
const income = "income";
const expense = "expense";
let incomeTotalValue = 0;
let expenseTotalValue = 0;
let budgetValue = 0;
function sanitizeString(str) {
  str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "");
  return str.trim();
}
const addIncome = (event) => {
  event.preventDefault();
  const incomeTitle = sanitizeString(incomeTitleInput.value);
  const incomeValue = Number(incomeValueInput.value);
  const incomeElement = createBudgetElement(incomeTitle, incomeValue, income);

  incomeList.appendChild(incomeElement);
  modifyTotalIncome(incomeValue);
};
const modifyTotalIncome = (value) => {
  incomeTotalValue = incomeTotalValue + value;
  incomeTotal.innerText = incomeTotalValue;
  addDiffrence(incomeTotalValue);
};
const addExpense = (event) => {
  event.preventDefault();
  const expenseTitle = sanitizeString(expenseTitleInput.value);
  const expenseValue = Number(expenseValueInput.value);
  const expenseElement = createBudgetElement(
    expenseTitle,
    expenseValue,
    expense
  );
  expenseList.appendChild(expenseElement);
  modifyTotalExpense(expenseValue);
};

const modifyTotalExpense = (value) => {
  expenseTotalValue = expenseTotalValue + value;
  expenseTotal.innerText = expenseTotalValue;
  addDiffrence(expenseTotalValue);
};
const addDiffrence = () => {
  budgetValue = incomeTotalValue - expenseTotalValue;
  budgetDiffrence.innerText = budgetValue;
  budgetStatus(budgetValue);
};

const budgetStatus = (budgetValue) => {
  if (budgetValue < 0) {
    budgetStatusDesc.innerText = spendDescNegative;
  } else if (budgetValue > 0) {
    budgetStatusDesc.innerText = spendDescPositive;
  } else {
    budgetStatusDesc.innerText = spendDescBalance;
  }
};
function createBudgetText(title, value) {
  const budgetText = document.createElement("p");
  budgetText.innerHTML = `<span class="title">${title}</span>: <span class="value">${value}</span> PLN`;
  return budgetText;
}
function modifyBudgetElement(budgetElement, budgetValueType) {
  const budgetTitle = window.prompt("Title:");
  const budgetAmount = window.prompt("Amount:");
  const budgetTitleElement = budgetElement.querySelector(".title");
  const budgetValueElement = budgetElement.querySelector(".value");
  const oldBudgetValue = Number(budgetValueElement.innerText);
  if (budgetValueType === income) {
    modifyTotalIncome(budgetAmount - oldBudgetValue);
  } else if (budgetValueType === expense) {
    modifyTotalExpense(budgetAmount - oldBudgetValue);
  }
  budgetTitleElement.innerText = budgetTitle;
  budgetValueElement.innerText = budgetAmount;
}
function removeBudgetElement(budgetElement, budgetValueType, value) {
  if (budgetValueType === income) {
    modifyTotalIncome(value * -1);
  } else if (budgetValueType === expense) {
    modifyTotalExpense(value * -1);
  }
  budgetElement.remove();
}

const createBudgetElement = (title, value, budgetValueType) => {
  const budgetElement = document.createElement("div");
  budgetElement.className = "budgetElement";
  budgetElement.appendChild(createBudgetText(title, value));
  const editButton = document.createElement("button");
  editButton.innerText = "edit";
  editButton.addEventListener("click", () => {
    modifyBudgetElement(budgetElement, budgetValueType);
  });
  const removeButton = document.createElement("button");
  removeButton.innerText = "remove";
  removeButton.addEventListener("click", () => {
    removeBudgetElement(budgetElement, budgetValueType, value);
  });
  budgetElement.appendChild(editButton);
  budgetElement.appendChild(removeButton);
  return budgetElement;
};
