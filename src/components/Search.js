import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'


const Search = ()=>{
   const [query,setQuery] = useState('')
   const history = useHistory()
    const handleSubmit=e=>{
      e.preventDefault()
      history.push(`/search/${query}`)
    }

  return (
    <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
      <input
        className="form-control mr-sm-2"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        type="search"
        placeholder="Enter word to search .."
        aria-label="Search"
      />
      <button
        className="btn btn-outline-success my-2 my-sm-0"
        type="submit"
        disabled={!query}
      >Search</button>
    </form>
  );
}

export default Search;