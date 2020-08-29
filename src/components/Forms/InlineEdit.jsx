import React, { useState, useEffect, useRef, useCallback } from "react";
import useKeypress from "../../hooks/useKeypress";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import DOMPurify from "dompurify";
import { FormText, Input, FormGroup } from "reactstrap";

function InlineEdit(props) {
  const [isInputActive, setIsInputActive] = useState(false);
  const [inputValue, setInputValue] = useState(props.text);

  const wrapperRef = useRef(null);
  const textRef = useRef(null);
  const inputRef = useRef(null);

  const enter = useKeypress("Enter");
  const esc = useKeypress("Escape");

  const { onSetText, inputType = "text", rows = null, errors } = props;

  // check to see if the user clicked outside of this component
  useOnClickOutside(wrapperRef, () => {
    if (isInputActive) {
      onSetText(inputValue);
      setIsInputActive(false);
    }
  });

  const onEnter = useCallback(() => {
    if (enter) {
      onSetText(inputValue);
      setIsInputActive(false);
    }
  }, [enter, inputValue, onSetText]);

  const onEsc = useCallback(() => {
    if (esc) {
      setInputValue(props.text);
      setIsInputActive(false);
    }
  }, [esc, props.text]);

  // focus the cursor in the input field on edit start
  useEffect(() => {
    if (isInputActive) {
      inputRef.current.focus();
    }
  }, [isInputActive]);

  useEffect(() => {
    if (isInputActive) {
      // if Enter is pressed, save the text and close the editor
      onEnter();
      // if Escape is pressed, revert the text and close the editor
      onEsc();
    }
  }, [onEnter, onEsc, isInputActive]); // watch the Enter and Escape key presses

  const handleInputChange = useCallback(
    (event) => {
      // sanitize the input a little
      setInputValue(DOMPurify.sanitize(event.target.value));
    },
    [setInputValue]
  );

  const handleSpanClick = useCallback(() => setIsInputActive(true), [
    setIsInputActive,
  ]);

  return (
    <span
      className="inline-text-edit-conteiner custom-etext-app"
      ref={wrapperRef}
    >
      {isInputActive ? (
        <FormGroup>
          <Input
            ref={inputRef}
            type={inputType}
            value={inputValue}
            rows={rows}
            onChange={handleInputChange}
          />
          {errors && <FormText color="danger">{errors}</FormText>}
        </FormGroup>
      ) : (
        <>
          <span ref={textRef} onClick={handleSpanClick}>
            {props.text || (
              <FormText color="info">توضیحات را وارد کنید</FormText>
            )}
          </span>
          {errors && (
            <FormText color="danger" onClick={handleSpanClick}>
              {errors}
            </FormText>
          )}
        </>
      )}
    </span>
  );
}

export default InlineEdit;
