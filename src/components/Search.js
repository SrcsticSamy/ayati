import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";

import search from '../assets/search.svg'

import axios from "axios";
import { useEffect, useState } from "react";

function Search({results, setResults}) {

  const [searchVal, setSearchVal] = useState('')

  useEffect(()=>{
    if (searchVal===''){
      setResults([])
    }
  }, [searchVal, setResults])

  const handleSearchChange = e => setSearchVal(e.target.value)

  const handleSearch = (e) => {
    e.preventDefault()
    setResults([])
    const hits = []

    axios.get(`https://api.quran.com/api/v4/search?q=${searchVal}`)
    .then( res => {
      const verses = res.data.search.results
      verses.forEach( verse => {
        const verseObj ={
          text : verse.text,
          chapterKey : verse.verse_key.split(':')[0],
          verseId : verse.verse_id
        }
        
        hits.push(verseObj)
      })

      hits.forEach(hit => {
        axios.get(`https://api.quran.com/api/v4/chapters/${hit.chapterKey}`)
        .then( res => {
            console.log(res.data.chapter.name_arabic, hit.chapterKey);
            hit.chapter = res.data.chapter.name_arabic
            setResults(results.concat(hits))

        })

      })
      
        
      })

  }

  return (
    <Container id="search-bar" className="py-3 px-4 bg-primary shadow-lg my-3 mx-1 rounded-2 start-50 top-0 translate-middle-x position-fixed">
      <Form onSubmit={handleSearch}>
        <InputGroup className=" mx-auto">
        <FormControl value={searchVal} onChange={handleSearchChange} className="border border-info" placeholder="قل هو الله احد"/>
          <Button variant="info" type="submit" className="py-2 px-3"><img src={search} width="20px" alt="search icon"/></Button>
        </InputGroup>
      </Form>
    </Container>
  );
}

export default Search;
