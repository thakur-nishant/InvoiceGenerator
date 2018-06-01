import React from "react";
import {
  Grid,
  Row,
  Col,
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
  Well
} from "react-bootstrap";

export default class FormBody extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: props.formStateProp.products
    };

    console.log("form container:" + this.state.products);
    this.removeProduct = this.removeProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.addProduct = this.addProduct.bind(this);
  }

  addProduct(e) {
    let products_data = this.state.products;
    let addProduct = {
      name: "",
      unitPrice: "",
      qty: "",
      amount: "0"
    };
    products_data.push(addProduct);

    this.setState({ products: products_data });
    this.props.sendProductData(products_data);
  }

  updateProduct(e) {
    let index = e.target.id;
    let products_data = this.state.products;
    products_data[index][e.target.name] = e.target.value;
    products_data[index]["amount"] =
      parseFloat(products_data[index]["qty"]) *
      parseFloat(products_data[index]["unitPrice"]);
    this.setState({ products: products_data });
    this.props.sendProductData(products_data);
  }

  removeProduct(e) {
    let index = e.target.id;
    let products_data = this.state.products;
    products_data.splice(index, 1);
    this.setState({ data: products_data });
    this.props.sendProductData(products_data);
  }

  render() {
    return (
      <div>
        <h4>Form</h4>
        <FormGroup controlId="formControlsText">
          <ControlLabel>Company Name</ControlLabel>
          <FormControl
            type="text"
            name="companyName"
            value={this.props.formStateProp.companyName}
            placeholder="Enter text"
            onChange={this.props.updateStateProp}
          />
          {/*<HelpBlock>Validation is based on string length.</HelpBlock>*/}
        </FormGroup>

        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>Company Address</ControlLabel>
          <FormControl
            componentClass="textarea"
            name="companyAddress"
            value={this.props.formStateProp.companyAddress}
            placeholder="Enter Company Address"
            onChange={this.props.updateStateProp}
          />
        </FormGroup>

        <FormGroup controlId="formControlsText">
          <ControlLabel>Company Logo URL</ControlLabel>
          <FormControl
            type="text"
            name="logoUrl"
            value={this.props.formStateProp.logoUrl}
            placeholder="Enter Customer Name"
            onChange={this.props.updateStateProp}
          />
          {/*<HelpBlock>Validation is based on string length.</HelpBlock>*/}
        </FormGroup>

        <FormGroup controlId="formControlsText">
          <ControlLabel>Customer Name</ControlLabel>
          <FormControl
            type="text"
            name="customerName"
            value={this.props.formStateProp.customerName}
            placeholder="Enter Customer Name"
            onChange={this.props.updateStateProp}
          />
          {/*<HelpBlock>Validation is based on string length.</HelpBlock>*/}
        </FormGroup>

        <FormGroup controlId="formControlsText">
          <ControlLabel>Customer Company Name</ControlLabel>
          <FormControl
            type="text"
            name="customerCompanyName"
            value={this.props.formStateProp.customerCompanyName}
            placeholder="Enter Customer Company Name"
            onChange={this.props.updateStateProp}
          />
          {/*<HelpBlock>Validation is based on string length.</HelpBlock>*/}
        </FormGroup>

        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>Billing Address</ControlLabel>
          <FormControl
            componentClass="textarea"
            name="billingAddress"
            value={this.props.formStateProp.billingAddress}
            onChange={this.props.updateStateProp}
            placeholder="Billing Address"
          />
        </FormGroup>

        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>Shipping Address</ControlLabel>
          <FormControl
            componentClass="textarea"
            name="shippingAddress"
            value={this.props.formStateProp.shippingAddress}
            onChange={this.props.updateStateProp}
            placeholder="Shipping Address"
          />
        </FormGroup>

        <FormGroup controlId="formControlsText">
          <ControlLabel>Invoice Number</ControlLabel>
          <FormControl
            type="text"
            name="invoiceNumber"
            value={this.props.formStateProp.invoiceNumber}
            placeholder="Enter Invoice Number"
            onChange={this.props.updateStateProp}
          />
        </FormGroup>
        <FormGroup controlId="formControlsText" className="col-sm-6" style={{ paddingLeft: "0px" }}>
            <ControlLabel>Date</ControlLabel>
            <FormControl
                type="date"
                name="invoiceDate"
                value={this.props.formStateProp.invoiceDate}
                placeholder="Enter Date"
                onChange={this.props.updateStateProp}
            />
        </FormGroup>
        <FormGroup controlId="formControlsText" className="col-sm-6" style={{ paddingRight: "0px" }}>
            <ControlLabel>Due Date</ControlLabel>
            <FormControl
                type="date"
                name="dueDate"
                value={this.props.formStateProp.dueDate}
                placeholder="Enter Due Date"
                onChange={this.props.updateStateProp}
            />
        </FormGroup>
        <FormGroup controlId="formControlsText">
          <ControlLabel>
            Products{" "}
            <Button onClick={this.addProduct} className="btn-primary btn-sm">
              Add Product
            </Button>
          </ControlLabel>
          <div style={{ botder: "solid 1px" }}>
            {this.props.formStateProp.products.map((product, i) => (
              <Product
                key={i}
                index={i}
                productData={product}
                updateProduct={this.updateProduct}
                removeProduct={this.removeProduct}
              />
            ))}
          </div>
        </FormGroup>

        <FormGroup controlId="formControlsText">
          <ControlLabel>Tax Rate(%)</ControlLabel>
          <FormControl
            type="number"
            name="taxRate"
            value={this.props.formStateProp.taxRate}
            placeholder="Enter Tax Rate(%)"
            onChange={this.props.updateStateProp}
          />
        </FormGroup>

        <FormGroup controlId="formControlsText">
          <ControlLabel>Discount($)</ControlLabel>
          <FormControl
            type="number"
            name="discount"
            value={this.props.formStateProp.discount}
            placeholder="Enter Discount Amount($)"
            onChange={this.props.updateStateProp}
          />
        </FormGroup>

        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>Special Notes and Instructions</ControlLabel>
          <FormControl
            componentClass="textarea"
            name="extraInfo"
            value={this.props.formStateProp.extraInfo}
            onChange={this.props.updateStateProp}
            placeholder="Special Notes and Instructions are displayed here!"
          />
        </FormGroup>
      </div>
    );
  }
}

class Product extends React.Component {
  render() {
    return (
      <div>
        <Well>
          <Row>
            <Col xs={12} md={12}>
              <FormGroup controlId="formControlsText">
                <FormControl
                  id={this.props.index}
                  type="text"
                  name="name"
                  value={this.props.productData.name}
                  placeholder="Product Description"
                  onChange={this.props.updateProduct}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={5} md={5}>
              <FormGroup controlId="formControlsText">
                <FormControl
                  id={this.props.index}
                  type="text"
                  name="unitPrice"
                  value={this.props.productData.unitPrice}
                  placeholder="Unit Price($)"
                  onChange={this.props.updateProduct}
                />
              </FormGroup>
            </Col>
            <Col xs={5} md={5}>
              <FormGroup controlId="formControlsText">
                <FormControl
                  id={this.props.index}
                  type="text"
                  name="qty"
                  value={this.props.productData.qty}
                  placeholder="Quantity"
                  onChange={this.props.updateProduct}
                />
              </FormGroup>
            </Col>
            <Col xs={2} md={2}>
              <Button
                onClick={this.props.removeProduct}
                id={this.props.index}
                className="badge-danger btn-danger"
              >
                Remove
              </Button>
            </Col>
          </Row>
        </Well>
      </div>
    );
  }
}
