import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [snippet, setSnippet] = useState([]);
  const [itemToSearch, SetItemToSearch] = useState('');
  const [searchedResult, setSearchResult] = useState(null);

  useEffect(()=>{
    const BASE_URL = 'https://mocki.io/v1/f9e16211-d239-48a4-a1dd-4de8cf4bfa15';
    
    const fetchData = async ()=>{
      try {
        const response = await fetch(BASE_URL);
        const json = await response.json();
        // console.log(json);
        setSnippet(json.results);
        // console.log(snippet);
        setSearchResult(json.results);
      }catch(err){
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const filterOut = (e)=>{
    const keyWords = (e.target.value);

    if(keyWords !== ''){
      const results = searchedResult.filter((item)=> {
        return item.title.toLowerCase().startsWith(keyWords.toLowerCase());
      });
      setSearchResult(results);
    } else {
      setSearchResult(snippet);
    }
    SetItemToSearch(keyWords);
  }
  

  return (
    <>
    <form >
    <input type='search' value={itemToSearch} placeholder='search here' onChange={filterOut} />
    </form>
    
    <div>
      {searchedResult && searchedResult.length > 0 ? (
        searchedResult.map((item)=>(
          <li>{item.title} {`-->`}{item.subtitle}</li>
        ))
      ):(<h2 style={{color:'red'}}>No results found</h2>)}
    </div>
    </>
  );
}

export default App;
