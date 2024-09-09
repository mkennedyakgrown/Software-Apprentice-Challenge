// Create a SortMenu component that allows the user to sort the ads by spend in ascending or descending order

function SortMenu({ sortBy, setSortBy }) {
  // Handle the click event for the sort button, rotating between the "", "spend-asc" and "spend-desc" sort options
  function handleClick(e) {
    if (sortBy == "") {
      setSortBy("spend-asc");
    } else if (sortBy == "spend-asc") {
      setSortBy("spend-desc");
    } else {
      setSortBy("");
    }
  }

  // Render the SortMenu component, including the sort button
  return (
    <div className="sort-menu">
      <button className="sort-button" onClick={handleClick}>
        {/* Display the sort button with the appropriate text and rotation, based on the sortBy state */}
        {"Sort By Spend" +
          (sortBy !== "" ? (sortBy == "spend-asc" ? " ▲" : " ▼") : "")}
      </button>
    </div>
  );
}

export default SortMenu;
