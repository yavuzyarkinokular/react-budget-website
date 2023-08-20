import React, { useState } from "react";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);

  const addTransaction = () => {
    if (text.trim() === "" || amount === 0) {
      alert("Lütfen geçerli bir işlem girin.");
      return;
    }

    const newTransaction = {
      id: Math.random(),
      text,
      amount: +amount,
    };

    setTransactions([...transactions, newTransaction]);
    setText("");
    setAmount(0);
  };

  const deleteTransaction = (id) => {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    );
    setTransactions(updatedTransactions);
  };

  const income = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((total, transaction) => total + transaction.amount, 0);

  const expense = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((total, transaction) => total + transaction.amount, 0);

  return (
    <div className="App">
      <h1>Bütçe Takip Uygulaması</h1>
      <div className="balance">Bakiye: {income + expense}₺</div>
      <div className="income-expense">
        Gelir: {income}₺ Harcama: {expense}₺
      </div>
      <div className="transaction-list">
        <h3>İşlemler</h3>
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              {transaction.text} ({transaction.amount}₺)
              <button onClick={() => deleteTransaction(transaction.id)}>
                Sil
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="add-transaction">
        <h3>İşlem Ekle</h3>
        <input
          type="text"
          placeholder="İşlem adı..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="number"
          placeholder="Miktar..."
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={addTransaction}>Ekle</button>
      </div>
    </div>
  );
}

export default App;
