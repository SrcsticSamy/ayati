import Search from './components/Search'
import Footer from './components/Footer';
import Container from "react-bootstrap/Container";
import Results from './components/Results';
import Popup from './components/Popup';
import { useState } from 'react';

import './App.css'

function App() {

  const [results, setResults] = useState([])
  const [ayaInfo, setAyaInfo] = useState({})
  const [show, setShow] = useState(false);

  return (
    <div>
      <Search results={results} setResults={setResults}/>

      <Container fluid id="my-container" className="min-vh-100">
        <Container>

          {results.map(result => {
            return <Results key={result.verseId} setShow={setShow} setAyaInfo={setAyaInfo} verseKey={result.verseKey} chapterKey={result.chapterKey} ayah={result.text}/>
          })}

        </Container>
        
      </Container>

      <Popup show={show} setShow={setShow} ayahObj={ayaInfo}/>

      <Footer/>
    </div>
  );
}

export default App;
