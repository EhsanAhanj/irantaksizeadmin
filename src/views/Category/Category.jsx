import React, { useState } from "react";
import { Placeholder } from "semantic-ui-react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  CardFooter,
  Button,
} from "reactstrap";
import { removeCategory, updateCategory } from "../../store/categories";
import InlineEdit from "../../components/Forms/InlineEdit";
import Thumb from "../../components/Forms/Thumb";
import FormikImage from "../../components/Forms/FormikImage";
import AppModal from "../../components/common/AppModal";

const validationSchema = Yup.object().shape({
  en_name: Yup.string().required("لطفا نام پارسی ه دسته بندی را وارد کنید"),
  fa_name: Yup.string().required("لطفا نام انگلیسی دسته بندی را وارد کنید"),
  description: Yup.string(),
  catIcon: Yup.mixed(),
  icon: Yup.string().nullable(),
});

const Category = (props) => {
  const [modal, setModal] = useState(false);
  const [modalProps, setModalProps] = useState({
    modalTitle: "",
    modalBody: "",
    modalOnSubmit: null,
  });
  const dispatch = useDispatch();

  const toggle = () => setModal(!modal);

  const { _id, en_name, fa_name, description = "", icon } = props.category;
  const doRemove = (newValues) => {
    dispatch(removeCategory(_id));
    setModalProps({
      modalTitle: "",
      modalBody: "",
      modalOnSubmit: null,
    });
  };

  const handleRemove = () => {
    setModalProps({
      modalTitle: "توجه",
      modalBody: " آیا مایل به حذف دسته بندی هستید ؟؟",
      modalOnSubmit: doRemove,
    });
    toggle();
    return;
  };
  let newValues = {};
  const onSubmit = (values) => {
    newValues = values;
    setModalProps({
      modalTitle: "توجه",
      modalBody: " آیا مایل به ذخیره تغییرات دسته بندی هستید ؟؟",
      modalOnSubmit: doUpdate,
    });
    toggle();
    return;
  };
  const doUpdate = () => {
    dispatch(updateCategory(newValues));
    newValues = {};
    setModalProps({
      modalTitle: "",
      modalBody: "",
      modalOnSubmit: null,
    });
  };
  return (
    <Formik
      initialValues={{ _id, en_name, fa_name, description, icon }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handlesubmit, handleChange, handleReset, values, errors }) => (
        <Form>
          <Card>
            <CardHeader>
              دسته بندی
              <div className="card-header-actions">
                <Badge
                  color="success"
                  className="float-right"
                  style={{ padding: "5px 25px 5px 25px" }}
                >
                  فعال
                </Badge>
              </div>
            </CardHeader>
            <CardBody>
              <Row>
                <Col>
                  <Row style={{ height: "50px" }}>
                    <Col className="custom-text-app">نام انگلیسی</Col>
                    <Col className="custom-text-app">
                      <InlineEdit
                        text={values.en_name}
                        onSetText={handleChange("en_name")}
                        inputType={"text"}
                        errors={errors.en_name}
                      />
                    </Col>
                  </Row>
                  <hr />
                  <Row style={{ height: "50px" }}>
                    <Col className="custom-text-app">نام فارسی </Col>
                    <Col className="custom-text-app">
                      <InlineEdit
                        text={values.fa_name}
                        onSetText={handleChange("fa_name")}
                        inputType={"text"}
                        errors={errors.fa_name}
                      />
                    </Col>
                  </Row>
                  <hr />
                  <Row style={{ height: "50px" }}>
                    <Col className="custom-text-app">
                      تعداد محصول با این دسته بندی
                    </Col>
                    <Col className="custom-text-app">--</Col>
                  </Row>
                </Col>
                <Col>
                  {" "}
                  <Row style={{ justifyContent: "center" }}>توضیحات</Row>
                  <hr />
                  <Row>
                    <InlineEdit
                      text={values.description}
                      onSetText={handleChange("description")}
                      inputType={"textarea"}
                      rows="7"
                      errors={errors.description}
                    />
                  </Row>
                </Col>

                <Col>
                  {" "}
                  <Row style={{ margin: "0 auto" }}>
                    {" "}
                    <FormikImage
                      name="catIcon"
                      label="تغییر لوگوی دسته بندی"
                      type="file"
                    />
                  </Row>
                  <Row>
                    {!icon && !values.catIcon ? (
                      <Placeholder className="brand-image-placeholder">
                        <Placeholder.Image square />
                      </Placeholder>
                    ) : (
                      <Thumb
                        file={values.catIcon}
                        url={process.env.REACT_APP_baseURL + "/" + icon}
                        alt={en_name}
                        className="gallery-image brand-image-placeholder"
                      />
                    )}
                  </Row>
                </Col>
              </Row>
            </CardBody>
            <CardFooter>
              <Row style={{ direction: "ltr" }}>
                <Button
                  style={{ margin: "0 20px 0 20px" }}
                  type="submit"
                  color="success"
                >
                  ذخیره تغییرات{" "}
                </Button>

                <Button
                  style={{ margin: "0 20px 0 20px" }}
                  type="reset"
                  color="info"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleReset();
                  }}
                >
                  ریست کردن فرم{" "}
                </Button>
                <Button
                  style={{ margin: "0 20px 0 20px" }}
                  type="reset"
                  color="danger"
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemove();
                  }}
                >
                  حذف برند{" "}
                </Button>
              </Row>
            </CardFooter>
          </Card>
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
  );
};

export default Category;
