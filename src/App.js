// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import UsersList from './components/UsersList';
import EditUser from './components/EditUser';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/users" 
            element={
              <PrivateRoute>
                <UsersList />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/edit/:id" 
            element={
              <PrivateRoute>
                <EditUser />
              </PrivateRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
