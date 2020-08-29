import React from "react";
import SliderInCard from "./SliderInCard";
import FormInCard from "./FormInCard";

import { Badge, Card, CardBody, CardHeader, Col, Row } from "reactstrap";
/*
 اطلاعات پیش فرض{

     [] فروشنده
     [] تاریخ
     [] امکان مرجوع
}

عکس ها یا ویدو{
    عکس
}
[] برند
[] وضعیت 
[] قیمت 
[] سایز 
[] طول در کفش و ابعاد در لباس 
[] کد چهار رقمی محصول #2324
[] 

*/
const RawPostCard = () => {
  const state = {
    item: {
      merchant: {
        username: "آقای قاسمی",
        userId: "983457395879729348",
        location: "مهاباد",
        rejectAccepted: true,
        rate: 3.5,
        joindate: "1399/2/20",
        sellnumber: 20,
      },
      rawproducte: {
        images: [
          {
            src: require("../../assets/postImage/zinteh_lighting/2020-04-25T21:57:48.338Z_zinteh_lighting.jpg"),
          },
          {
            src: require("../../assets/postImage/zinteh_lighting/2020-04-25T21:57:50.126Z_zinteh_lighting.jpg"),
          },
          {
            src: require("../../assets/postImage/zinteh_lighting/2020-04-25T21:57:54.560Z_zinteh_lighting.jpg"),
          },
        ],
        caption: ` 1. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
        do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi aliquip ex ea commodo consequat. Duis aute irure
        dolor in reprehenderit m ipsum dolor sit amet, consectetur
        adipisicing elit, sed do eiusmod tempor incididunt ut labore et
        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
        sint occaecat cupidatat non proidin voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt
        mollit. `,
      },
    },
  };
  return (
    <Card>
      <CardHeader>
        پست خام
        <div className="card-header-actions">
          <Badge color="success" className="float-right">
            Success
          </Badge>
        </div>
      </CardHeader>
      <CardBody>
        <Row>
          <Col>
            <Row>
              <SliderInCard items={state.item.rawproducte.images} />
            </Row>
            <hr />
            <h2>توضیحات:</h2>
            <Col>{state.item.rawproducte.caption}</Col>
          </Col>
          <Col>
            <FormInCard item={state.item} />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default RawPostCard;
