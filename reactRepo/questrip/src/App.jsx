import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Layout from './components/Layout';
import { Route, Routes } from 'react-router-dom';
import AdminLayout from './components/admin/AdminLayout';

function App() {
  return (
    <BrowserRouter>
      
      <Layout/>
    </BrowserRouter>
  );
}

export default App;
