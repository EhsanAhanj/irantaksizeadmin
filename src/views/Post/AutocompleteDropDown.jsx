import React, { useEffect, useState, useRef } from "react";
import Spiner from "../../components/common/Spiner";

import { loadSuggestions } from "../../store/instasearch";
import { useDispatch, useSelector } from "react-redux";

const Auto = ({ selected }) => {
  const { list, loading } = useSelector((state) => state.instasearch);
  const dispatch = useDispatch();
  const [display, setDisplay] = useState(false);
  const [search, setSearch] = useState("");
  const [isloading, setisloading] = useState(false);
  const [select, setSelect] = useState({});
  const wrapperRef = useRef(null);
  useEffect(() => {
    if (select.username && search === select.username) return;
    setisloading(true);
    dispatch(loadSuggestions(search));
    setisloading(loading);
  }, [search]);
  useEffect(() => {
    setisloading(loading);
  }, [loading]);
  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = (event) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  const handelSelectUser = (user) => {
    setSelect({ user });
    selected(user);
    setSearch(user.username);
    setDisplay(false);
  };
  return (
    <div ref={wrapperRef} className="flex-container flex-column pos-rel">
      <input
        id="auto"
        className="form-control"
        onClick={() => setDisplay(!display)}
        placeholder="نام کاربری اینستاگرام "
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      {isloading && <Spiner />}
      {display && search && (
        <div className="autoContainer col">
          {list.length >= 1 ? (
            list
              .filter(
                ({ username }) => username.indexOf(search.toLowerCase()) > -1
              )
              .map((value, i) => {
                return (
                  <div
                    onClick={() => handelSelectUser(value)}
                    className="autocomplete-option"
                    key={i}
                    tabIndex="0"
                  >
                    <span>{value.username}</span>
                    <img
                      className="autocomplete-image"
                      src={value.profile_pic_url}
                      alt="user"
                    />
                  </div>
                );
              })
          ) : (
            <div className="autoContainer ">nothing</div>
          )}
        </div>
      )}
    </div>
  );
};

function Autocomplete({ card }) {
  return (
    <div className="autocomplete-app">
      <div className="auto-container">
        <Auto selected={card} />
      </div>
    </div>
  );
}

export default Autocomplete;
