import React from "react";
import { Field } from "formik";
import {
  FormGroup,
  Label,
  Input,
  FormFeedback,
  FormText,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from "reactstrap";

function AppInput(props) {
  const { label, name, formtext, addon = null, ...rest } = props;
  return (
    <Field name={name}>
      {({ field, form }) => (
        <FormGroup>
          <Label htmlFor={name}>{label}</Label>
          <InputGroup>
            {" "}
            {addon && addon.side === "perpend" && (
              <InputGroupAddon addonType={addon.side}>
                <InputGroupText>
                  <i className={addon.icon}></i>
                </InputGroupText>
              </InputGroupAddon>
            )}
            <Input
              id={name}
              {...rest}
              {...field}
              invalid={form.errors[name] && form.touched[name]}
              autoComplete="off"
              spellCheck="false"
            />
            {addon && addon.side === "append" && (
              <InputGroupAddon addonType={addon.side}>
                <InputGroupText>
                  <i className={addon.icon}></i>
                </InputGroupText>
              </InputGroupAddon>
            )}
            {formtext && <FormText color="muted">{formtext}</FormText>}
            <FormFeedback>{form.errors[name]}</FormFeedback>
          </InputGroup>
        </FormGroup>
      )}
    </Field>
  );
}

export default AppInput;
