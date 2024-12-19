import './App.css'
import OpenRoutes from './routes/OpenRoutes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

  function App() {
    return (
      <>
      <OpenRoutes />
      <ToastContainer />
      </>
    )
  }

  export default App