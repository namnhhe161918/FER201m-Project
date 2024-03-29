import { BrowserRouter } from 'react-router-dom'
import './App.css';
import '../src/styles/style.default.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import ListRoutes from './routes/routes'
import { ToastContainer } from 'react-toastify';



function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <ListRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
