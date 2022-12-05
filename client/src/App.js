import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import {Routes,Route} from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';


function App() {
  return (
    <>
      <Header/>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;
