import React from "react";
import { Input, FormText } from "reactstrap";
const CategoryDropDown = ({ categories }) => {
  return (
    <>
      <Input type="select" name="select" id="select">
        <option value="0">انتخاب دسته بندی</option>
        <option value="1">Option #1</option>
        <option value="2">Option #2</option>
        <option value="3">Option #3</option>
      </Input>
      <FormText color="muted">انتخاب دسته بندی</FormText>
    </>
  );
};

export default CategoryDropDown;
