import React from "react";
import { Field } from "formik";
import Autosuggest from "react-autosuggest";
import { FormGroup, Label, Input, FormFeedback } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

import { loadSuggestions } from "../../store/instasearch";
import Spiner from "../../components/common/Spiner";

function FormikAutoSuggest(props) {
  const { list, loading } = useSelector((state) => state.instasearch);

  const [merchantPage, setMerchantPage] = React.useState("");
  const dispatch = useDispatch();

  const { label, name, setcard, ...rest } = props;
  return (
    <Field name={name}>
      {({ field, form }) => (
        <FormGroup>
          <Label htmlFor={name}>{label}</Label>
          <Autosuggest
            renderInputComponent={(inputProps) => (
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ flex: "1", flexDirection: "column" }}>
                  <Input {...inputProps} />
                  <FormFeedback>{form.errors.merchantPage}</FormFeedback>
                  <FormFeedback valid>پیج قابل قبول است</FormFeedback>
                </div>
                {loading && (
                  <div
                    style={{
                      position: "absolute",
                      left: "5%",
                      marginTop: "10px",
                    }}
                  >
                    <Spiner />
                  </div>
                )}
              </div>
            )}
            suggestions={list}
            onSuggestionsFetchRequested={({ value }) => {
              if (!value || value.length < 3) {
                return;
              }
              dispatch(loadSuggestions(value));
            }}
            onSuggestionsClearRequested={() => {}}
            getSuggestionValue={(suggestion) => suggestion.username}
            renderSuggestion={(suggestion) => (
              <div className="autocomplete-option option">
                <span>{suggestion.username}</span>
                <img
                  className="autocomplete-image"
                  src={suggestion.profile_pic_url}
                  alt="user"
                />
              </div>
            )}
            onSuggestionSelected={(event, { suggestion, method }) => {
              if (method === "enter") {
                event.preventDefault();
              }
              setMerchantPage(suggestion.username);
              form.setFieldValue("merchantPage", suggestion.username);
              setcard(suggestion);
            }}
            inputProps={{
              placeholder: props.placeholder,
              autoComplete: "off",
              value: merchantPage,
              name,
              invalid:
                form.errors.merchantPage && form.touched.merchantPage
                  ? true
                  : false,
              valid: props.valid,
              onChange: (_event, { newValue }) => {
                form.setFieldValue("merchantPage", newValue);
                setMerchantPage(newValue);
              },
            }}
          />
        </FormGroup>
      )}
    </Field>
  );
}

export default FormikAutoSuggest;
