import Search from "./components/Search";
import Footer from "./components/Footer";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Results from "./components/Results";
import Popup from "./components/Popup";
import AlertNotification from "./components/AlertNotification";
import axios from "axios";
import { useState } from "react";

import "./App.css";
import Logo from "./assets/verse-icon.png";

function App() {

  const [results, setResults] = useState([]);       //fetch data from search component and store it in results
  const [searchWord, setSearchWord] = useState()    //save the search word from search component here for the show more func 
  const [loaded, setLoaded] = useState(0);          //used to update the results component because react is a bitch
  const [ayaInfo, setAyaInfo] = useState({});       //when tafsir btn is clicked, the info for that ayah is stored here to be shown in the modal
  const [show, setShow] = useState(false);          //modal trigger
  const [page, setPage] = useState(2);              //page counter for pagintation
  const [alert, setAlert] = useState({ show: false, message: "", bg: "light" });  //I mean this is obvious lol


  const getChapterName = async (id) => {  //declared here because it's used in the search component as well as the show more
    const res = await axios.get(`https://api.quran.com/api/v4/chapters/${id}`);
    return res.data.chapter.name_arabic;
  };

  const showMore = () => {  //same as the search submit handler but with diffrent url parameters and setResults with concat rather than direct set
    setPage(page + 1);
    const hits = [];

    axios.get(`https://api.quran.com/api/v4/search?q=${searchWord}&s=10&p=${page}`)
      .then((res) => {
        if (res.data.search.current_page === res.data.search.total_pages) {
          setAlert({
            show: true,
            message: "No more results were found.",
            bg: "warning",
          });
          return;
        }

        setAlert({ show: false, message: "", bg: "light" });
        const verses = res.data.search.results;
        verses.forEach((verse) => {
          getChapterName(verse.verse_key.split(":")[0])
            .then((d) => {
              const verseObj = {
                ayahText: verse.highlighted ? verse.highlighted : verse.text,
                ayahTextToCopy: verse.text,
                verseKey: verse.verse_key,
                verseId: verse.verse_id,
                chapterName: d,
                translate: verse.translations[0],
              };

              hits.push(verseObj);
            })
            .then(() => setResults(results.concat(hits)));
        });
      });
  };

  return (
    <div>
      <Search
        results={results}
        setResults={setResults}
        setSearchWord={setSearchWord}
        setAlert={setAlert}
        getChapterName={getChapterName}
        loaded={loaded}
        setLoaded={setLoaded}
      />

      <Container fluid id="my-container" className="min-vh-100">

        {results.length === 0 ? 
        
        ( <Container className="text-center h-25">
            <h3>Search for a specific ayah above.</h3>

            <img src={Logo} alt="Quran verse icon" width="100px" />
            <AlertNotification setAlert={setAlert} alert={alert} />
          </Container>
        ) 
          :
          
        ( <Container data-state={loaded} className="text-center">

          { results.map((result) => {

              return (
                <Results
                  key={result.verseId}
                  setShow={setShow}
                  setAyaInfo={setAyaInfo}
                  verseKey={result.verseKey}
                  ayahText={result.ayahText}
                  ayahTextToCopy={result.ayahTextToCopy}
                  chapterName={result.chapterName}
                />
              );
            })
          }
            
            <AlertNotification setAlert={setAlert} alert={alert} />

            <Button variant="info" className="mx-auto" onClick={showMore}>
              Show More
            </Button>

          </Container>
        )}
      </Container>

      <Popup show={show} setShow={setShow} ayahObj={ayaInfo} />
      <Footer />
    </div>
  );
}

export default App;
