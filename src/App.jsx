import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import AddTransaction from "./components/AddTransactions";
import TransactionList from "./components/TransactionList";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from 'react-bootstrap';
import WelcomePage from "./components/Home";


function App() {
  return (
    <> <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
    <Container>
      <Navbar.Brand href="/">Cashzen</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
        <Nav.Link as={Link} to={`/transactions/${userId}`}>Dashboard</Nav.Link>
        <Nav.Link as={Link} to="/add-transaction">Transactions</Nav.Link>
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
