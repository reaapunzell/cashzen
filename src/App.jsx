import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import AddTransaction from "./components/AddTransactions";
import TransactionList from "./components/TransactionList";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from 'react-bootstrap';
import WelcomePage from "./components/Home";
import { useNavigate } from "react-router-dom"

const MyNavbar = ({ userId }) => {
    const navigate = useNavigate(); 
  
    const handleDashboardClick = () => {
      navigate(`/transactions/${userId}`); 
    };
  
    const handleAddTransactionClick = () => {
      navigate("/add-transaction"); 
    };
};

function App() {
  return (
    <> <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
    <Container>
      <Navbar.Brand href="/">Cashzen</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
        <Nav.Link onClick={handleDashboardClick}>Dashboard</Nav.Link>
        <Nav.Link onClick={handleAddTransactionClick}>Transactions</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  
    <Router>
       
      <div>
        <Routes>
            <Route path="/" element={<WelcomePage/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-transaction" element={<AddTransaction />} />
          <Route path="/transactions/:userId" element={<TransactionList />} />
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;
