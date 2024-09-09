// Create a SearchBar component that allows the user to search for ads by campaign name

import "./SearchBar.css";

function SearchBar({ searchFor, setSearchFor }) {
  // Handle the change event for the search input, updating the searchFor state
  function onSearch(e) {
    setSearchFor(e.target.value);
  }

  // Handle the click event for the clear button, clearing the searchFor state
  function clearSearch() {
    setSearchFor("");
  }

  // Render the SearchBar component, including the search input and clear button
  return (
    <div className="search-bar">
      <strong>Search By: </strong>
      {/* Display the search input and clear button, with the searchFor state as the value */}
      <input type="text" value={searchFor} onChange={onSearch} />
      <button onClick={clearSearch}>Clear</button>
    </div>
  );
}

export default SearchBar;
