import React, { useEffect } from "react";
import { Divider } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";

import Category from "./Category";
import { loadCategories } from "../../store/categories";

const BrandList = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.categories);
  useEffect(() => {
    if (list.length < 1) dispatch(loadCategories());
  }, []);

  return (
    <div className="animated fadeIn custom-continer">
      <div className="title-custom">لیست دسته بندی ها</div>
      <Divider />
      {list.map((category) => (
        <Category key={category._id} category={category} />
      ))}
    </div>
  );
};

export default BrandList;
