import React, { useState, useEffect } from "react";

import { Card, Divider, Image, Placeholder } from "semantic-ui-react";
import { Row, Col, Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { searchMerchant } from "../../store/merchants";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import AppInput from "../../components/Forms/AppInput";
import FormikAutoSuggest from "../../components/Forms/FormikAutoSuggest";
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
const onSubmit = (values) => console.log(values, "valire");

const MerchantNew = (props) => {
  const [loading, setloading] = useState(true);
  const [card, setcard] = useState({});
  const [existInDataBase, setExistInDataBase] = useState(false);
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.merchants);

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
              <div className="merchant-card-data">
                <div>نام کاربری {card.username}</div>
                <div>نام کامل {card.full_name}</div>
                <div>آی دی اینستاگرام {card.pk}</div>
                <div>اکانت پرایوت {card.is_private ? "هست" : "نیست"}</div>
                <Button color="info">جزییات صفحه </Button>
              </div>
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
                <AppInput
                  name="idCarts"
                  label="تاییدیه مدارک شناسایی کارت ملی و شناسنامه و تعهد محضری"
                  type="file"
                />
                <Button type="submit" color="primary" size="lg" block>
                  {" "}
                  تایید
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </div>
  );
};

export default MerchantNew;
