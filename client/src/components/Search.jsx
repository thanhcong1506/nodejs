import React, { useRef, useState } from "react";

const Search = () => {
  const [search, setSearch] = useState("");
  console.log(search);

  return (
    <div className="col-lg-4">
      <input
        type="text"
        placeholder="Enter Search Here!"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
    </div>
  );
};

export default Search;
