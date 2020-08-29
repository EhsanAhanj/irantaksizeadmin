import React, { Component } from "react";
import DatePickerForm from "./DatePickerForm";
import AppInput from "../../components/Forms/AppInput";
import {
  Col,
  FormGroup,
  FormText,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";

import GaleryInTabs from "./GaleryInTabs";
import SizeSelect from "./SizeSelect";
import CategoryDropDown from "./CategoryDropDown";
import FormikAutoSuggestSync from "../../components/Forms/FormikAutoSuggestSync";

class TabsInForm extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill("1"),
    };
  }

  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.setState({
      activeTab: newArray,
    });
  }

  tabPane() {
    return (
      <>
        <TabPane style={{ minHeight: "400px" }} tabId="1">
          {/* برند */}
          <FormGroup row>
            <Col>
              <FormikAutoSuggestSync
                name="brand"
                label="انتخاب برند"
                placeholder="برند"
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Col md="6">
              <AppInput
                name="category"
                type="select"
                label="انتخاب دسته بندی"
                placeholder="دسته بندی ها"
              />
              {/* <CategoryDropDown /> */}
            </Col>
            <Col md="6">
              <AppInput
                name="price"
                label="قیمت"
                placeholder="قیمت"
                formtext="هزار تومان"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md="2">
              <Label>وضعیت ظاهری</Label>
            </Col>
            <Col md="10">
              <FormGroup check inline>
                <Input
                  className="form-check-input"
                  type="radio"
                  id="inline-radio1"
                  name="inline-radios"
                  value="option1"
                />
                <Label
                  className="form-check-label"
                  check
                  htmlFor="inline-radio1"
                >
                  کاملا نو
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Input
                  className="form-check-input"
                  type="radio"
                  id="inline-radio2"
                  name="inline-radios"
                  value="option2"
                />
                <Label
                  className="form-check-label"
                  check
                  htmlFor="inline-radio2"
                >
                  در حد نو
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Input
                  className="form-check-input"
                  type="radio"
                  id="inline-radio3"
                  name="inline-radios"
                  value="option3"
                />
                <Label
                  className="form-check-label"
                  // check
                  htmlFor="inline-radio3"
                >
                  خوب
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Input
                  className="form-check-input"
                  type="radio"
                  id="inline-radio4"
                  name="inline-radios"
                  value="option4"
                />
                <Label
                  className="form-check-label"
                  // check
                  htmlFor="inline-radio4"
                >
                  متوسط
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Input
                  className="form-check-input"
                  type="radio"
                  id="inline-radio5"
                  name="inline-radios"
                  value="option5"
                />
                <Label
                  className="form-check-label"
                  // check
                  htmlFor="inline-radio5"
                >
                  قابل استفاده
                </Label>
              </FormGroup>
            </Col>
          </FormGroup>
          <SizeSelect sizes={this.props.item.sizes} />
          <FormGroup row>
            <Col md="3">
              <Label htmlFor="textarea-input">توضیحات</Label>
            </Col>
            <Col xs="12" md="9">
              <Input
                type="textarea"
                name="textarea-input"
                id="textarea-input"
                rows="4"
                placeholder="مشخصات..."
              />
            </Col>
          </FormGroup>
        </TabPane>
        <TabPane style={{ minHeight: "400px" }} tabId="2">
          {/* فروشنده */}
          <FormGroup row>
            <Col md="12">
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <i className="fa fa-user"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  type="text"
                  id="input1-group1"
                  name="merchant"
                  placeholder="ُفروشنده"
                />
              </InputGroup>
            </Col>
          </FormGroup>
          {/* تاریخ */}
          <FormGroup row>
            {/* <Col>
              <DatePickerForm onChange={this.props.onChange} />
            </Col> */}
          </FormGroup>
        </TabPane>
        <TabPane style={{ minHeight: "400px" }} tabId="3">
          <GaleryInTabs />
        </TabPane>
      </>
    );
  }
  render() {
    return (
      <div className="animated fadeIn" style={{ direction: "rtl" }}>
        <Row>
          <Col>
            <Nav tabs>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === "1"}
                  onClick={() => {
                    this.toggle(0, "1");
                  }}
                >
                  مشخصات
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === "2"}
                  onClick={() => {
                    this.toggle(0, "2");
                  }}
                >
                  پیش فرض
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === "3"}
                  onClick={() => {
                    this.toggle(0, "3");
                  }}
                >
                  گالری
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab[0]}>
              {this.tabPane()}
            </TabContent>
          </Col>
        </Row>
      </div>
    );
  }
}

export default TabsInForm;
