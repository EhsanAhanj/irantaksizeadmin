import React, { useEffect } from "react";
import { Divider } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { loadBrands } from "../../store/brands";

import Brand from "./Brand";

const BrandList = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.brands);
  useEffect(() => {
    console.log(list.length > 1);
    if (list.length < 1) dispatch(loadBrands());
  }, []);

  return (
    <div className="animated fadeIn custom-continer">
      <div className="title-custom"> لیست برند ها</div>
      <Divider />
      {list.map((brand) => (
        <Brand key={brand._id} brand={brand} />
      ))}
    </div>
  );
};

export default BrandList;
