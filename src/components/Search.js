// All imports
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Spinner from "react-bootstrap/Spinner";

import axios from "axios";
import { useEffect, useState } from "react";

import search from "../assets/search.svg";

// Search component function
function Search({
  setResults,
  setSearchWord,
  setAlert,
  getChapterName,
  loaded,
  setLoaded,
}) {
  const [searchVal, setSearchVal] = useState(""); //what the user types in the searrch bar
  const [loading, setloading] = useState(false); //to set the spinner on the search icon

  useEffect(() => {
    //useEffect hook to check is the search bar was emptied and resets the states
    if (searchVal === "") {
      setResults([]);
      setLoaded(0);
      setAlert({ show: false, message: "", bg: "light" });
    }
  }, [searchVal]);

  const handleSearchChange = (e) => setSearchVal(e.target.value); //onChange function for the input

  const handleSearch = (e) => {
    //search form submit handler function
    e.preventDefault();
    setloading(true);
    setSearchWord(searchVal);
    const hits = [];

    axios
      .get(`https://api.quran.com/api/v4/search?q=${searchVal}&s=10&p=1`)
      .then((res) => {
        if (res.data.search.total_results === 0) {
          //check if no results are found
          setResults([]);
          setloading(false);
          setAlert({
            show: true,
            message: "No results found, check your spelling and try again.",
            bg: "danger",
          });
          return null;
        }

        //if results are found, save them in the verses const, and remove alert
        const verses = res.data.search.results;
        setloading(true);
        setAlert({
          show: false,
          message: "",
          bg: "primary",
        });

        //loop every result and get the needed data
        verses.forEach((verse) => {
          getChapterName(verse.verse_key.split(":")[0]).then((d) => {
            const verseObj = {
              ayahText: verse.highlighted ? verse.highlighted : verse.text,
              ayahTextToCopy: verse.text,
              verseKey: verse.verse_key,
              verseId: verse.verse_id,
              chapterName: d,
              translate: verse.translations[0],
            };

            hits.push(verseObj);
          });
        });
        //react doesn't wait for the data so I had to update the results component after the data is fetched
        //it's not a bug it's a feature™
        setResults(hits);
        setTimeout(() => {
          setLoaded(loaded + 1);
          setloading(false);
        }, 400);
      });
  };

  return (
    <Container
      dir="rtl"
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
          <Button variant="info" type="submit" className=" rounded-pill py-2">
            {loading ? 
              ( <Spinner
                as="span"
                animation="border"
                size="sm"
              /> )
              :
              ( <img src={search} width="20px" alt="search icon" /> )
            }
          </Button>
        </InputGroup>
      </Form>
    </Container>
  );
}

export default Search;
