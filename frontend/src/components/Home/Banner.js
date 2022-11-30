import React, { useState } from "react";
import logo from "../../imgs/logo.png";
import agent from "../../agent";

const Banner = (props) => {
  const { onSearch } = props;
  let [searchTerm, setSearchTerm] = useState("");
  if (searchTerm.length > 3) {
    onSearch(searchTerm, agent.Items.bySearch(searchTerm));
  }
  return (
    <div className="banner text-white">
      <div className="container p-4 text-center">
        <img src={logo} alt="banner" />
        <div>
          <span>A place to </span>
          <span id="get-part">get</span>
          <span>
            <input
              type="text"
              id="search-box"
              placeholder="what is it that you truly desire?"
              className="m-1 p-1 pl-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </span>
          <span> the cool stuff.</span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
