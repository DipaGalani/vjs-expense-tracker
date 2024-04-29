const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// const dummyTransactions = [
//   { id: 1, text: "Flower", amount: -20 },
//   { id: 2, text: "Salary", amount: 300 },
//   { id: 3, text: "Book", amount: -10 },
//   { id: 4, text: "Camera", amount: 150 },
//   { id: 5, text: "Freelance", amount: 250 },
// ];

const localStorageData = JSON.parse(localStorage.getItem("transactions"));

let transactions = !localStorageData ? [] : localStorageData;

// Generate random ID
const generateID = () => {
  return Math.floor(Math.random() * 100000000);
};

// Add transaction
const addTransaction = (e) => {
  e.preventDefault();

  if (!text.value.trim() || !amount.value.trim()) {
    alert("Please add a text and amount");
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };

    transactions.push(transaction);
    addTransactionToDOM(transaction);
    updateValues();

    updateLocalStorage();

    text.value = "";
    amount.value = "";
  }
};

// Add transactions to DOM List
const addTransactionToDOM = (transaction) => {
  // get sign
  const sign = transaction.amount < 0 ? "-" : "+";

  const item = document.createElement("li");

  // add class based on value
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class='delete-btn' onclick="removeTransaction(${
    transaction.id
  })">x</button>`;

  list.appendChild(item);
};

// Update the balance income and expense
const updateValues = () => {
  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts.reduce((acc, amount) => {
    return (acc += amount);
  }, 0);

  const income = amounts
    .filter((amount) => amount > 0)
    .reduce((acc, amount) => (acc += amount), 0);

  const expense = amounts
    .filter((amount) => amount < 0)
    .reduce((acc, amount) => (acc += amount), 0);

  balance.textContent = `$${total}.00`;
  money_plus.textContent = `$${income}.00`;
  money_minus.textContent = `$${expense}.00`;
};

// Remove transaction
const removeTransaction = (transactionID) => {
  transactions = transactions.filter(
    (transaction) => transaction.id !== transactionID
  );

  updateLocalStorage();

  init();
};

// Update localStorageData
const updateLocalStorage = () => {
  localStorage.setItem("transactions", JSON.stringify(transactions));
};

// Init
const init = () => {
  list.innerHTML = "";

  transactions.forEach(addTransactionToDOM);
  updateValues();
};

init();

// Event Listeners
form.addEventListener("submit", addTransaction);
