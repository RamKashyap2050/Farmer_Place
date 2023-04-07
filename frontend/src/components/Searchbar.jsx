import { useState } from 'react';
import { Navbar, Form, FormControl, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

function SearchBar() {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    // handle search functionality here
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', maxWidth: '350px', margin: '0 auto' }}>
      <Navbar>
        <Form inline onSubmit={handleSearch}>
          <div style={{ display: 'flex', alignItems: 'center'}} className='SearchGroup'>
            <FormControl type="text" placeholder="Search" style={{ width: '350px' }} value={searchText} onChange={handleInputChange} />
            <Button variant="outline-secondary" type="submit" style={{ height: '35px', width: '35px' }}><FaSearch /></Button>
          </div>
        </Form>
      </Navbar>
    </div>
  );
}

export default SearchBar;

