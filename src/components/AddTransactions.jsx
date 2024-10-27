import React, { useState, useEffect } from "react";
import api from "../api";

function AddTransaction() {
  const [form, setForm] = useState({
    amount: "",
    description: "",
    category: "income",

  });

  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      setError("User not authenticated.");
      return;
    }
 
    console.log("form data: ", form);

    
    try {
      await api.post(`/transactions/`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Transaction added successfully!");
      setForm({ amount: "", description: "", category: "income" });
      fetchTransactions();
    } catch (err) {
      console.error("Error adding transaction:", err);
      if (err.response) {
         console.error("Response data:", err.response.data);
         console.error("Status code:", err.response.status);
         console.error("Headers:", err.response.headers);
         setError(err.response.data.message || "Failed to add transaction.");
      } else {
         setError("Failed to add transaction. Please try again.");
      }
   }
  };


  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const token = localStorage.getItem("token");

    const userId = response.data._id

    if (!token) {
      setError("User not authenticated.");
      return;
    }

    try {
      const response = await api.get(`/transactions/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(response.data);
      console.log('updated transactions:' , transactions);
    } catch (err) {
      console.error("error fetching transactions", err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <select name="category" value={form.category} onChange={handleChange}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <button type="submit">Add Transaction</button>
      </form>

      <h3>Your Transactions</h3>
      <ul>
        {transactions.map((transaction) => (
          <li >
            <strong>Amount:</strong> {transaction.amount} |{" "}
            <strong>Description:</strong> {transaction.description} |{" "}
            <strong>Category:</strong> {transaction.category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddTransaction;
