import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  const [selectedStudent, setSelectedStudent] = useState(null);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Student Directory</h1>
        <p>Find student details instantly</p>
      </header>

      <main className="main-content">
        <div className="search-section">
          <SearchBar onSelectStudent={setSelectedStudent} />
        </div>

        {selectedStudent && (
          <div className="student-card visible">
            <div className="card-header">
              <h2>Student Profile</h2>
            </div>
            <div className="card-body">
              <div className="info-row">
                <span className="info-label">Full Name</span>
                <span className="info-value">{selectedStudent.Name}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Class</span>
                <span className="info-value">{selectedStudent.Class}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Roll Number</span>
                <span className="info-value">{selectedStudent["Roll Number"]}</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
