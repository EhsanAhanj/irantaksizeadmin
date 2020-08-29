import React, { useState, useEffect } from "react";

import { Card, Divider, Image, Placeholder } from "semantic-ui-react";
import { Row, Col, Button, Table } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { searchMerchant } from "../../store/merchants";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import AppInput from "../../components/Forms/AppInput";
import FormikImage from "../../components/Forms/FormikImage";
import FormikAutoSuggest from "../../components/Forms/FormikAutoSuggest";
import AppModal from "../../components/common/AppModal";

const initialValues = {
  merchantPage: "",
  merchantPhone1: "",
  merchantPhone2: "",
  telegramId: "",
  idCarts: "",
};
const validationSchema = Yup.object().shape({
  merchantPage: Yup.string().required("لطفا یک پیج انتخاب کنید"),
  merchantPhone1: Yup.string()
    .min(6, "شماره صحیح نیست")
    .required("شماره تماس الزامی است"),
});

const MerchantNew = (props) => {
  const [loading, setloading] = useState(true);
  const [card, setcard] = useState({});
  const [existInDataBase, setExistInDataBase] = useState(false);
  const { list } = useSelector((state) => state.merchants);
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
      modalBody: "مایل به اضافه کردن پیج این فروشنده هستید؟؟؟",
      modalOnSubmit: doSubmit,
    });
    newValues = values;
    toggle();
    return;
  };
  const doSubmit = () => {
    // dispatch(addBrand(newValues));
    console.log({ newValues });
    newValues = {};
    setModalProps({
      modalTitle: "",
      modalBody: "",
      modalOnSubmit: null,
    });
  };

  useEffect(() => {
    if (!card.username) return;
    dispatch(searchMerchant(card.username));
    setloading(false);
    const similarInDb = list.filter(
      (similar) => similar.username === card.username
    );
    if (similarInDb.length) setExistInDataBase(true);
  }, [card]);
  return (
    <div className="animated fadeIn custom-continer">
      <div className="title-custom"> اضافه کردن فروشنده</div>
      <Divider />
      <Row>
        <Col>
          {" "}
          {loading ? (
            <Placeholder style={{ margin: "0 auto" }}>
              <Placeholder.Image square />
            </Placeholder>
          ) : (
            <Image className="merchant-image-new" src={card.profile_pic_url} />
          )}
          <Card.Content>
            {loading ? (
              <Placeholder style={{ margin: "0 auto" }}>
                <Placeholder.Header>
                  <Placeholder.Line style={{ margin: "5px auto" }} />
                  <Placeholder.Line length="very short" />
                  <Placeholder.Line length="medium" />
                  <Placeholder.Line length="full" />
                  <Placeholder.Line length="medium" />
                  <Placeholder.Line length="full" />
                </Placeholder.Header>
                <Placeholder.Paragraph>
                  <Placeholder.Line length="short" />
                </Placeholder.Paragraph>
              </Placeholder>
            ) : (
              <>
                <Table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>نام کاربری </th>
                      <th>{card.username}</th>
                    </tr>
                    <tr>
                      <th>نام کامل</th>
                      <th>{card.full_name}</th>
                    </tr>
                    <tr>
                      <th>آی دی اینستاگرام </th>
                      <th>{card.pk}</th>
                    </tr>
                    <tr>
                      <th>اکانت پرایوت</th>
                      <th>{card.is_private ? "هست" : "نیست"}</th>
                    </tr>
                  </tbody>
                </Table>
                <Button color="info">جزییات صفحه </Button>
              </>
            )}
          </Card.Content>
        </Col>
        <Col>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => (
              <Form>
                <FormikAutoSuggest
                  name="merchantPage"
                  label="انتخاب پیج"
                  placeholder="انتخاب پیج"
                  setcard={setcard}
                  valid={
                    !existInDataBase &&
                    card.profile_pic_url &&
                    formik.values.merchantPage
                      ? true
                      : false
                  }
                />
                <AppInput
                  name="merchantPhone1"
                  label="شماره تماس ۱"
                  placeholder="شماره تماس ۱"
                />{" "}
                <AppInput
                  name="merchantPhone2"
                  label="شماره تماس ۲"
                  placeholder="شماره تماس ۲"
                />
                <AppInput
                  name="telegramId"
                  label="آی دی تلگرام"
                  placeholder="آی دی تلگرام"
                />
                <FormikImage
                  name="idCarts"
                  label="تاییدیه مدارک شناسایی کارت ملی و شناسنامه و تعهد محضری"
                  type="file"
                />
                <Button
                  style={{ marginTop: "70px" }}
                  type="submit"
                  color="primary"
                  size="lg"
                  block
                >
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
      </Row>
    </div>
  );
};

export default MerchantNew;
