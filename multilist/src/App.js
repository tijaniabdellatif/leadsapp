import {
  Landing,Error,Register,
  SharedLayout,Stats,AddLeads,AllLeads,Profile,
  ProtectedRoutes

} from "./pages";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (

    <BrowserRouter>
    <Routes>

      <Route  path='/' element={

         <ProtectedRoutes>
          <SharedLayout />
         </ProtectedRoutes>
      }>

          <Route index element={<Stats />} />
          <Route path='all-leads' element={<AllLeads />} />
          <Route path='add-lead' element={<AddLeads />} />
          <Route path='profile' element={<Profile />} />

      </Route>
      <Route  path='/home' element={<Landing />} />
      <Route  path='/register' element={<Register />}></Route>
      <Route path='*' element={<Error />} />
    </Routes>
    <ToastContainer  />
    </BrowserRouter>
  
  );
}

export default App;
