import Autosuggest from "react-autosuggest";
import React, { useState, useEffect } from "react";
import { Field } from "formik";
import { Input, FormFeedback, FormGroup, Label } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";

import { loadBrands } from "../../store/brands";
import Spiner from "../common/Spiner";

const getSuggestionValue = (suggestion) => suggestion.name;

const renderSuggestion = (suggestion) => (
  <div className="autocomplete-option option">
    <span style={{ listStyle: "none" }}>{suggestion.name}</span>
    <img className="autocomplete-image" src={suggestion.image} alt="user" />
  </div>
);

const FormikAutoSuggestSync = (props) => {
  const { list, loading } = useSelector((state) => state.brands);

  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!list[0]) dispatch(loadBrands());

    setSuggestions(list);
  }, []);

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };
  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };
  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : suggestions.filter(
          (sugg) => sugg.name.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions(list);
  };

  // Autosuggest will pass through all these props to the input.
  const inputProps = {
    value,
    placeholder: props.placeholder,
    onChange: onChange,
  };

  const { label, name, ...rest } = props;
  return (
    <Field name={name}>
      {({ field, form }) => (
        <FormGroup>
          <Label htmlFor={name}>{label}</Label>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderInputComponent={(inputProps) => (
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ flex: "1", flexDirection: "column" }}>
                  <Input {...inputProps} />
                  <FormFeedback>{form.errors.brand}</FormFeedback>
                  <FormFeedback valid>تایید</FormFeedback>
                </div>
                {loading && <Spiner />}
              </div>
            )}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
        </FormGroup>
      )}
    </Field>
  );
};

export default FormikAutoSuggestSync;
