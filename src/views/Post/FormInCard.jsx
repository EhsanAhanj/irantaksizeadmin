import React from "react";
import { Button, Card, CardBody, CardFooter } from "reactstrap";
import TabsInForm from "./TabsInForm";

import { Formik, Form } from "formik";
import * as Yup from "yup";

const initialValues = {
  merchantPage: "",
  price: "",
};
const validationSchema = Yup.object().shape({
  // merchantPage: Yup.string().required("لطفا یک پیج انتخاب کنید"),
});
const onSubmit = (values) => console.log(values, "VALUES");

const FormInCard = ({ item }) => {
  const [state, setState] = React.useState({
    merchant: "",
    lastName: "",
    date: "",
    sizes: [
      37,
      37.5,
      38,
      38.5,
      39,
      39.5,
      40,
      40.5,
      41,
      41.5,
      42,
      42.5,
      43,
      43.5,
      44,
      44.5,
      45,
      45.5,
      46,
      46.5,
      47,
    ],
  });

  return (
    <Card style={{ margin: 0 }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <CardBody style={{ padding: 5, direction: "rtl" }}>
              <div className="form-horizontal">
                <TabsInForm style={{ flex: "1" }} item={state} />
              </div>
            </CardBody>
            <CardFooter>
              <Button
                type="submit"
                onSubmit={(e) => {
                  e.preventDefault();
                  formik.handleSubmit();
                }}
                size="sm"
                color="primary"
              >
                <i className="fa fa-dot-circle-o"></i> پدیرش
              </Button>
              <Button type="reject" size="sm" color="danger">
                <i className="fa fa-ban"></i> رد کردن
              </Button>
              <Button type="reset" size="sm" color="warning">
                {" "}
                ریست فرم
              </Button>
            </CardFooter>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default FormInCard;
