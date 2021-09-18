import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";

import axios from "axios";
import { useEffect } from "react";

import search from "../assets/search.svg";

function Search({ setResults, searchVal, setSearchVal, setToast }) {

  useEffect(() => {
    if (searchVal === "") {
      setResults([]);
    }
  }, [searchVal]);

  const handleSearchChange = (e) => setSearchVal(e.target.value);

  const handleSearch = (e) => {
    e.preventDefault();
    const hits = [];
    
    axios
      .get(`https://api.quran.com/api/v4/search?q=${searchVal}&s=10&p=1&language=ur`)
      .then((res) => {

        if (res.data.search.total_results === 0 ){
          setSearchVal('')
          setToast({
            show: true,
            message: 'No results found.',
            bg: 'danger'
          })
          return null
        }
        
        const verses = res.data.search.results;
        verses.forEach((verse) => {
          const verseObj = {
            text: verse.highlighted? verse.highlighted : verse.text,
            textToCopy: verse.text,
            verseKey: verse.verse_key,
            chapterKey: verse.verse_key.split(":")[0],
            verseId: verse.verse_id,
          };

          hits.push(verseObj);
        });

        setResults(hits)
      })  

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
            className=" rounded-pill py-2 px-3"
          >
            <img src={search} width="20px" alt="search icon" />
          </Button>
        </InputGroup>
      </Form>
    </Container>
  );
}

export default Search;
