import React, { useState } from "react";
import { Divider, Placeholder } from "semantic-ui-react";
import { Row, Col, Button } from "reactstrap";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import AppInput from "../../components/Forms/AppInput";
import FormikImage from "../../components/Forms/FormikImage";
import Thumb from "../../components/Forms/Thumb";
import { addBrand } from "../../store/brands";
import { useDispatch } from "react-redux";
import AppModal from "../../components/common/AppModal";
const initialValues = {
  en_name: "",
  fa_name: "",
  description: "",
  brandImage: "",
};
const validationSchema = Yup.object().shape({
  en_name: Yup.string().required("لطفا نام پارسی ه برند را وارد کنید"),
  fa_name: Yup.string().required("لطفا نام انگلیسی برند را وارد کنید"),
  description: Yup.string(),
  brandImage: Yup.mixed().required(
    "لطفا لوگوی برند را بدون بک گراند انتخاب کنید"
  ),
});
const BrandNew = () => {
  const [modal, setModal] = useState(false);
  const [modalProps, setModalProps] = useState({
    modalTitle: "",
    modalBody: "",
    modalOnSubmit: null,
  });
  const dispatch = useDispatch();

  const toggle = () => setModal(!modal);

  let newValues;
  const onSubmit = (values) => {
    setModalProps({
      modalTitle: "توجه",
      modalBody: "مایل به اضافه کردن برند هستید؟؟؟",
      modalOnSubmit: doSubmit,
    });
    newValues = values;
    toggle();
    return;
  };
  const doSubmit = () => {
    dispatch(addBrand(newValues));
    newValues = {};
    setModalProps({
      modalTitle: "",
      modalBody: "",
      modalOnSubmit: null,
    });
  };

  return (
    <div className="animated fadeIn custom-continer">
      <div className="title-custom"> اضافه کردن برند</div>
      <Divider />

      <Col>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form>
              <Row>
                <Col>
                  <AppInput
                    name="fa_name"
                    label="نام فارسی برند"
                    placeholder="فارسی"
                  />
                </Col>
                <Col>
                  <AppInput
                    name="en_name"
                    label="نام انگلیسی برند"
                    placeholder="انگلیسی"
                  />
                </Col>
              </Row>
              <AppInput
                type="textarea"
                rows="4"
                name="description"
                label="توضیحات"
                placeholder="توضیحات"
              />
              <Row>
                <Col>
                  {" "}
                  <FormikImage
                    name="brandImage"
                    label="انتخاب لوگوی برند"
                    type="file"
                  />
                </Col>
                <Col>
                  {!formik.values.brandImage ? (
                    <Placeholder className="brand-image-placeholder">
                      <Placeholder.Image square />
                    </Placeholder>
                  ) : (
                    <Thumb file={formik.values.brandImage} />
                  )}
                </Col>
              </Row>
              <Button type="submit" color="primary" size="lg" block>
                {" "}
                تایید
              </Button>
              <AppModal
                toggle={toggle}
                modal={modal}
                title={modalProps.modalTitle}
                body={modalProps.modalBody}
                handleSubmit={modalProps.modalOnSubmit}
              />
            </Form>
          )}
        </Formik>
      </Col>
    </div>
  );
};

export default BrandNew;
