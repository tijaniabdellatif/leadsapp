import {Landing,Error,Dashboard,Register} from "./pages";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (

    <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<Dashboard />} />
      <Route exact path='/home' element={<Landing />} />
      <Route exact path='/register' element={<Register />}></Route>
      <Route path='*' element={<Error />} />
    </Routes>
    <ToastContainer  />
    </BrowserRouter>
  
  );
}

export default App;
