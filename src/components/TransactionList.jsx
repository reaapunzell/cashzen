import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import { CChart } from "@coreui/react-chartjs";
import api from "../api";
import "../App.css";

function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");
  const [monthlyData, setMonthlyData] = useState({ labels: [], datasets: [] });
  const [currentMonthData, setCurrentMonthData] = useState({
    labels: [],
    datasets: [],
  });
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) {
        setError("User not authenticated.");
        return;
      }

      try {
        const response = await api.get(`/transactions/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(response.data);
        processMonthlyData(response.data);
        processCurrentMonthData(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setError("Failed to fetch transactions. Please try again later.");
      }
    };

    fetchTransactions();
  }, []);

  //Bar Graph
  useEffect(() => {
    // Calculate totals for income and expenses
    const totalIncome = transactions
      .filter((t) => t.category === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
      .filter((t) => t.category === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    // Initialize the chart
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      // Destroy previous chart instance if it exists
      if (window.myChart) {
        window.myChart.destroy();
      }

      // Create a new chart instance
      window.myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Income", "Expenses"],
          datasets: [
            {
              label: "Amount (R)",
              data: [totalIncome, totalExpense],
              backgroundColor: ["#a8d5ba", "#f5baba"],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [transactions]); // Re-render chart when transactions data changes

  // line graph
  const processMonthlyData = (transactions) => {
    const incomeData = new Array(12).fill(0);
    const expenseData = new Array(12).fill(0);

    transactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      const month = date.getMonth(); // Get month (0-11)

      if (transaction.category === "income") {
        incomeData[month] += transaction.amount;
      } else if (transaction.category === "expense") {
        expenseData[month] += transaction.amount;
      }
    });

    const labels = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    setMonthlyData({
      labels: labels,
      datasets: [
        {
          label: "Income",
          backgroundColor: "rgba(220, 220, 220, 0.2)",
          borderColor: "rgba(220, 220, 220, 1)",
          data: incomeData,
          fill: true, // Fill the area under the line
        },
        {
          label: "Expenses",
          backgroundColor: "rgba(151, 187, 205, 0.2)",
          borderColor: "rgba(151, 187, 205, 1)",
          data: expenseData,
          fill: true,
        },
      ],
    });
  };
  const processCurrentMonthData = (transactions) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const transactionCount = new Array(31).fill(0); // Assuming max days in a month
    const labels = Array.from({ length: 31 }, (_, i) => i + 1);

    transactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      if (
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
      ) {
        transactionCount[date.getDate() - 1] += 1; // Increment count for that day
      }
    });

    setCurrentMonthData({
      labels: labels,
      datasets: [
        {
          label: "Transactions This Month",
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          data: transactionCount,
          fill: true,
        },
      ],
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", padding: "20px" }}>
    {/* Container for the transactions table and bar chart */}
    <div style={{ display: "flex", justifyContent: "space-between", width: "100%", maxWidth: "800px", marginBottom: "20px" }}>
      
      {/* Transaction list */}
      <div style={{ width: "300px", padding: "10px" }}>
        <h2>Your Transactions</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {transactions.map((transaction) => (
            <li key={transaction._id} style={{ padding: "8px 0", borderBottom: "1px solid #ddd" }}>
              {new Date(transaction.date).toLocaleDateString()} -{" "}
              {transaction.description}: R{transaction.amount} ({transaction.category})
            </li>
          ))}
        </ul>
      </div>
  
      {/* Bar chart container */}
      <div style={{ width: "300px", height: "300px", padding: "10px" }}>
        <h3>Income vs Expenses</h3>
        <canvas ref={chartRef} style={{ width: "100%", height: "100%" }} />
      </div>
    </div>
  
    {/* Line chart container for yearly data */}
    <div style={{ width: "100%", maxWidth: "800px", padding: "10px" }}>
      <h3>Monthly Income vs Expenses (Yearly)</h3>
      <CChart
        type="line"
        data={{
          labels: monthlyData.labels,
          datasets: monthlyData.datasets,
        }}
        options={{
          plugins: {
            legend: {
              labels: {
                color: 'black', // Set the color for legend text
              },
            },
          },
          scales: {
            x: {
              grid: {
                color: 'rgba(0, 0, 0, 0.1)', // Set x-axis grid color
              },
              ticks: {
                color: 'black', // Set x-axis ticks color
              },
            },
            y: {
              grid: {
                color: 'rgba(0, 0, 0, 0.1)', // Set y-axis grid color
              },
              ticks: {
                color: 'black', // Set y-axis ticks color
              },
            },
          },
        }}
      />
    </div>
  </div>
  
  );
}

export default TransactionList;
