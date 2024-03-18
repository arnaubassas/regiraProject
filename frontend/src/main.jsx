import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from './App.jsx'
import Inici from './pages/Inici.jsx';
import Login from './pages/Login.jsx';
import Project from './pages/Project.jsx';
import './index.css'
import Register from './pages/Register.jsx';
import NewProject from './pages/NewProject.jsx';
import Kanban from './pages/Kanban.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>

        <Route index element={<Inici />} />
        <Route path="/login" element={<Login />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/register" element={<Register />} />
        <Route path="/project/new" element={<NewProject />} />
        <Route path="/kanban/:id" element={<Kanban />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
