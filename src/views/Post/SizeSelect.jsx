import React from "react";
import { FormGroup, Label, Input, Col } from "reactstrap";

const SizeSelect = ({ sizes }) => {
  return (
    <FormGroup row>
      <Col md="3">
        <Label htmlFor="multiple-select">سایز</Label>
      </Col>
      <Col md="9">
        <Input
          type="select"
          name="multiple-select"
          id="multiple-select"
          multiple
        >
          {sizes.map((size) => (
            <option
              key={`${size}-checkbox`}
              name={`${size}-select`}
              value={size}
            >{`سایز ${size}`}</option>
          ))}
        </Input>
      </Col>
    </FormGroup>
  );
};

export default SizeSelect;
