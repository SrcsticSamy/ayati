import Search from "./components/Search";
import Footer from "./components/Footer";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Results from "./components/Results";
import Popup from "./components/Popup";
import AlertNotification from "./components/AlertNotification";
import axios from "axios";
import { useEffect, useState } from "react";

import "./App.css";
import Logo from "./assets/verse-icon.png";

function App() {
  const [results, setResults] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [loaded, setLoaded] = useState(0);
  const [ayaInfo, setAyaInfo] = useState({});
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(2);
  const [alert, setAlert] = useState({ show: false, message: "", bg: "light" });

  const getChapterName = async (id) => {
    const res = await axios.get(`https://api.quran.com/api/v4/chapters/${id}`);
    return res.data.chapter.name_arabic;
  };

  const showMore = () => {
    setPage(page + 1);
    const hits = [];

    axios
      .get(
        `https://api.quran.com/api/v4/search?q=${searchVal}&s=10&p=${page}&language=ur`
      )
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
                text: verse.highlighted ? verse.highlighted : verse.text,
                textToCopy: verse.text,
                verseKey: verse.verse_key,
                chapterKey: verse.verse_key.split(":")[0],
                verseId: verse.verse_id,
                chapterName: d,
              };

              return verseObj;
            })
            .then((d) => {
              hits.push(d);
            })
            .then((d) => {
              setResults(results.concat(hits));
            });
        });
      });
  };

  return (
    <div>
      <Search
        results={results}
        setResults={setResults}
        searchVal={searchVal}
        setSearchVal={setSearchVal}
        setAlert={setAlert}
        getChapterName={getChapterName}
        loaded={loaded}
        setLoaded={setLoaded}
      />

      <Container fluid id="my-container" className="min-vh-100">
        {results.length === 0 ? (
          <Container className="text-center h-25">
            <h3>Search for a specific ayah above.</h3>

            <img src={Logo} alt="Quran verse icon" width="100px" />
            <AlertNotification setAlert={setAlert} alert={alert} />
          </Container>
        ) : (
          <Container data-state={loaded} className="text-center">
            {results.map((result) => {
              return (
                <Results
                  key={result.verseId}
                  setShow={setShow}
                  setAyaInfo={setAyaInfo}
                  verseKey={result.verseKey}
                  chapterKey={result.chapterKey}
                  ayah={result.text}
                  ayahCopy={result.textToCopy}
                  chapterName={result.chapterName}
                />
              );
            })}
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
