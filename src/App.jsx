import React from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import AddTransaction from "./components/AddTransactions";
import TransactionList from "./components/TransactionList";
import WelcomePage from "./components/Home";
import { Navbar, Nav, Container } from 'react-bootstrap';

// Navbar Component
const MyNavbar = ({ userId }) => {
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    navigate(`/transactions/${userId}`); 
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Cashzen</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={handleDashboardClick}>Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/add-transaction">Add Transactions</Nav.Link>
            <Nav.Link as={Link} to="/register">Register</Nav.Link>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

function App() {
 
  const userId = localStorage.getItem("userId");

  return (
    <Router>
      <MyNavbar userId={userId} /> {}
      <div>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-transaction" element={<AddTransaction />} />
          <Route path="/transactions/:userId" element={<TransactionList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
