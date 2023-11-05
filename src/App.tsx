import { ToastContainer } from 'react-toastify';
import './App.css';
import RouterDom from './Router';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <RouterDom />
      <ToastContainer />
    </>
  );
}

export default App;
