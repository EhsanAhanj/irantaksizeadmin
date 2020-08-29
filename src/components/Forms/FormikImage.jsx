import React from "react";
import { Field } from "formik";
import { FormGroup, Label, FormText, CustomInput } from "reactstrap";

function AppInput(props) {
  const { label, name } = props;
  return (
    <Field name={name}>
      {({ field, form }) => (
        <FormGroup style={{ marginTop: "30px" }}>
          <Label htmlFor={name}>{label}</Label>
          <CustomInput
            type="file"
            id={name}
            name={name}
            invalid={form.errors[name] ? true : false}
            onChange={(event) => {
              form.setFieldValue(name, event.currentTarget.files[0]);
            }}
          />
          {form.errors[name] && (
            <FormText color="danger">{form.errors[name]}</FormText>
          )}
        </FormGroup>
      )}
    </Field>
  );
}

export default AppInput;
