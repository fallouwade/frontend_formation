import React, { useState } from 'react';
import NavBar from './components/navBar';
import AjouterFormation from './components/AjouterFormation';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Accuiel from './components/Accuiel';
import FormationDetails from './components/FormationDetails';




function App() {
  const [data, setdata]= useState([])
  const [id, setid]= useState()
  const [update, setupdate]= useState()
  const [test, settest]= useState(false)


  const share= (item)=>{
      setdata(item)
  }

  const identifiant=  (id) => {
    setid(id)
  }
  const edit = (id) =>{
    setupdate(id)
    settest(true)
  }
  const verification = (boleane)=>{
    settest(boleane)
  }


console.log(data);

  return (
   <div>
     <Router>
    <div>
      <Routes>
        
        <Route path="/" element={<Accuiel data={data} id={identifiant}/>} />
        <Route path="/ajout" element={<AjouterFormation share={share} edit={update} test={test} verification={verification}/>} />
        <Route path="/formation" element={<FormationDetails id={id} update={edit} />} />
        
      </Routes>
     
    </div>
  </Router>
   </div>
  );
}

export default App;
