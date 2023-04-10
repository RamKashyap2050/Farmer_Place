import { useState, useEffect } from 'react';
import Axios from 'axios';
import { Navbar, Form, FormControl, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

function SearchBar() {
  const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    Axios.get("http://localhost:3002/Feed/getallposts")
      .then((response) => {
        const populatedData = response.data.map((post) => ({
          ...post,
          user_name: post.user.user_name,
        }));
        setResults(populatedData);
        console.log(populatedData);
      })
      .catch((error) => console.log(error));
  }, []);


  // Filter the results based on the search text
  const filteredResults = results.filter((val) => {
    const searchValue = searchText.toLowerCase();
    const title = val.title.toLowerCase();
    const content = val.content.toLowerCase();
    const user_name = val.user_name.toLowerCase();
    return title.includes(searchValue) || content.includes(searchValue) || user_name.includes(searchValue);
  });

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center', maxWidth: '350px', margin: '0 auto' }}>
      <Navbar>
        <Form>
          <div style={{ display: 'flex', alignItems: 'center'}} className='SearchGroup'>
            <FormControl type="text" placeholder="Search" style={{ width: '350px' }}  onChange={handleSearchChange} value={searchText} />
            <Button variant="outline-secondary" type="submit" style={{ height: '35px', width: '35px' }}><FaSearch /></Button>
          </div>
        </Form>
      </Navbar>
    </div>
  );
}

export default SearchBar;

