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
const incomeTotalMap = {};
const expenseTotalMap = {};
let budgetValue = 0;
let incomeTotalValue = 0;
let expenseTotalValue = 0;
function sanitizeString(str) {
  str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "");
  return str.trim();
}
let guid = () => {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  return s4() + "-" + s4();
};
const addIncome = (event) => {
  event.preventDefault();
  const incomeTitle = sanitizeString(incomeTitleInput.value);
  const incomeValue = Number(incomeValueInput.value);
  const budgetId = guid();
  const incomeElement = createBudgetElement(
    incomeTitle,
    incomeValue,
    income,
    budgetId
  );

  incomeList.appendChild(incomeElement);
  incomeTotalMap[budgetId] = incomeValue;
  updateTotalIncome();
};
const updateTotalIncome = () => {
  incomeTotalValue = 0;
  for (const incomeKey in incomeTotalMap) {
    incomeTotalValue = incomeTotalValue + incomeTotalMap[incomeKey];
  }
  incomeTotal.innerText = incomeTotalValue;
  updateDiffrence();
};
const addExpense = (event) => {
  event.preventDefault();
  const expenseTitle = sanitizeString(expenseTitleInput.value);
  const expenseValue = Number(expenseValueInput.value);
  const budgetId = guid();
  const expenseElement = createBudgetElement(
    expenseTitle,
    expenseValue,
    expense,
    budgetId
  );
  expenseList.appendChild(expenseElement);
  expenseTotalMap[budgetId] = expenseValue;
  updateTotalExpense();
};

const updateTotalExpense = () => {
  expenseTotalValue = 0;
  for (const expenseKey in expenseTotalMap) {
    expenseTotalValue = expenseTotalValue + expenseTotalMap[expenseKey];
  }
  expenseTotal.innerText = expenseTotalValue;
  updateDiffrence();
};
const updateDiffrence = () => {
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
function modifyBudgetElement(budgetElement, budgetValueType, budgetId) {
  const budgetTitle = window.prompt("Title:");
  const budgetAmount = Number(window.prompt("Amount:"));
  const budgetTitleElement = budgetElement.querySelector(".title");
  const budgetValueElement = budgetElement.querySelector(".value");

  if (budgetValueType === income) {
    incomeTotalMap[budgetId] = budgetAmount;
    updateTotalIncome();
  } else if (budgetValueType === expense) {
    expenseTotalMap[budgetId] = budgetAmount;
    updateTotalExpense();
  }
  budgetTitleElement.innerText = budgetTitle;
  budgetValueElement.innerText = budgetAmount;
}
function removeBudgetElement(budgetElement, budgetValueType, budgetId) {
  if (budgetValueType === income) {
    delete incomeTotalMap[budgetId];
    updateTotalIncome();
  } else if (budgetValueType === expense) {
    delete expenseTotalMap[budgetId];
    updateTotalExpense();
  }
  budgetElement.remove();
}

const createBudgetElement = (title, value, budgetValueType, budgetId) => {
  const budgetElement = document.createElement("div");
  budgetElement.className = "budgetElement";
  budgetElement.appendChild(createBudgetText(title, value));
  const editButton = document.createElement("button");
  editButton.innerText = "edit";
  editButton.addEventListener("click", () => {
    modifyBudgetElement(budgetElement, budgetValueType, budgetId);
  });
  const removeButton = document.createElement("button");
  removeButton.innerText = "remove";
  removeButton.addEventListener("click", () => {
    removeBudgetElement(budgetElement, budgetValueType, budgetId);
  });
  budgetElement.appendChild(editButton);
  budgetElement.appendChild(removeButton);
  return budgetElement;
};
