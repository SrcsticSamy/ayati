import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Spinner from "react-bootstrap/Spinner";

import axios from "axios";
import { useEffect, useState } from "react";

import search from "../assets/search.svg";

function Search({
  setResults,
  searchVal,
  setSearchVal,
  setAlert,
  getChapterName,
  loaded,
  setLoaded,
}) {
  const [loading, setloading] = useState(false);

  useEffect(() => {
    if (searchVal === "") {
      setResults([]);
      setLoaded(0);
      setAlert({ show: false, message: "", bg: "light" });
    }
  }, [searchVal]);

  const handleSearchChange = (e) => setSearchVal(e.target.value);

  const handleSearch = (e) => {
    setloading(true);
    e.preventDefault();
    const hits = [];

    axios
      .get(
        `https://api.quran.com/api/v4/search?q=${searchVal}&s=10&p=1&language=ur`
      )
      .then((res) => {
        if (res.data.search.total_results === 0) {
          setAlert({
            show: true,
            message: "No results found, check your spelling and try again.",
            bg: "danger",
          });
          return null;
        }

        const verses = res.data.search.results;
        setAlert({
          show: false,
          message: "No more results were found.",
          bg: "warning",
        });
        verses.forEach((verse) => {
          getChapterName(verse.verse_key.split(":")[0]).then((d) => {
            const verseObj = {
              text: verse.highlighted ? verse.highlighted : verse.text,
              textToCopy: verse.text,
              verseKey: verse.verse_key,
              chapterKey: verse.verse_key.split(":")[0],
              verseId: verse.verse_id,
              chapterName: d,
            };

            hits.push(verseObj);
          });
        });
        setResults(hits);
        setTimeout(() => {
          setLoaded(loaded + 1);
          console.log(loaded);
        }, 500);
      });
  };

  return (
    <Container
      id="search-bar"
      className="py-3 px-3 text-start shadow bg-primary shadow-lg my-3 rounded-pill start-50 top-0 translate-middle-x position-fixed"
    >
      <Form onSubmit={handleSearch}>
        <InputGroup className="mx-auto">
          <FormControl
            value={searchVal}
            onChange={handleSearchChange}
            className="mx-2 border border-info"
            placeholder="قل هو الله احد"
          />
          <Button
            variant="info"
            type="submit"
            className=" rounded-circle p-3"
            onClick={() => {
              setTimeout(() => {
                setloading(false);
              }, 500);
            }}
          >
            {loading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              <img src={search} width="20px" alt="search icon" />
            )}
          </Button>
        </InputGroup>
      </Form>
    </Container>
  );
}

export default Search;
