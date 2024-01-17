import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Layout from './components/Layout';
import { Route, Routes } from 'react-router-dom';
import AdminLayout from './components/admin/AdminLayout';

function App() {
  return (
    <BrowserRouter>
     <Routes>
          <Route path='/*' element={<Layout/>}></Route>
          <Route path='/admin/*' element={<AdminLayout/>}></Route>
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
