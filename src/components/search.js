import React from "react";
import "./search.css";
const Search = ({searchData,handelSearch}) =>{

    return(
        <div>
           <input
           className="inputfield"
           type="text"
           placeholder="search by name,email or role"
           value={searchData}
           onChange={handelSearch}
            / >

        </div>
    );
}

export default Search;