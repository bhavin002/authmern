import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import {Routes,Route} from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';
import Dashboard from './components/Dashboard'
import Error from "./components/Error";
function App() {

  return (
    <>
      <BrowserRouter>
      <Header/>
        <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dash" element={<Dashboard/>}/>
        <Route path="*" element={<Error/>}/>
      </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;
