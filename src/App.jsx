import './App.css';
import StudentList from './StudentList';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<StudentList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
