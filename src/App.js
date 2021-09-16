import Search from './components/Search'
import Footer from './components/Footer';
import Container from "react-bootstrap/Container";
import Results from './components/Results';
import './App.css'
import { useState } from 'react';

function App() {

  const [results, setResults] = useState([])


  return (
    <div>
      <Search results={results} setResults={setResults}/>

      <Container fluid id="my-container" className="min-vh-100">
        <Container>

          {results.map(result => {
            console.log(result);
            return <Results key={result.verseId} sura={result.chapter} ayah={result.text}/>
          })}

        </Container>
        
      </Container>

      <Footer/>
    </div>
  );
}

export default App;
