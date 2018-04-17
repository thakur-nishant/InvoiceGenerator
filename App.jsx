import React from "react";
import {
  Grid,
  Row,
  Col,
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Table,
  Image,
  Well
} from "react-bootstrap";
import html2canvas from "html2canvas";
// import * as jsPDF from 'jspdf';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <MainContainer />
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    let headerStyle = {
      textAlign: "center"
    };

    return <h1 style={headerStyle}>Invoice Generator React </h1>;
  }
}

class MainContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        companyName: "My Company Name",
        companyAddress: "Company Address",
        logoUrl: "./src/images/logo.png",
        invoiceDate: "",
        dueDate: "",
        invoiceNumber: "INV0000",
        customerName: "Customer Name",
        customerCompanyName: "Company Name",
        billingAddress: "",
        shippingAddress: "",
        products: [
          {
            name: "Product Name",
            unitPrice: "",
            qty: "",
            amount: "0"
          }
        ],
        taxRate: 0,
        discount: 0,
        extraInfo: ""
      }
    };
    this.updateState = this.updateState.bind(this);
    this.sendProductData = this.sendProductData.bind(this);
  }

  updateState(e) {
    let state_data = this.state.data;
    state_data[e.target.name] = e.target.value;
    this.setState({ data: state_data });
  }

  sendProductData(products) {
    let state_data = this.state.data;
    state_data.products = products;
    console.log(products);
    this.setState({ data: state_data });
  }

  render() {
    return (
      <div>
        <Grid>
          <Row className="show-grid">
            <Col xs={12} md={6} style={{ paddingBottom: "30px" }}>
              <FormBody
                formStateProp={this.state.data}
                updateStateProp={this.updateState}
                sendProductData={this.sendProductData}
              />
              <br />
              <br />
            </Col>
            <Col xs={12} md={6}>
              <InvoicePreview formStateProp={this.state.data} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

class FormBody extends React.Component {
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

        <FormGroup controlId="formControlsText">
          <ControlLabel>Date</ControlLabel>
          <FormControl
            type="date"
            name="invoiceDate"
            value={this.props.formStateProp.invoiceDate}
            placeholder="Enter Date"
            onChange={this.props.updateStateProp}
          />
        </FormGroup>

        <FormGroup controlId="formControlsText">
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

class InvoicePreview extends React.Component {
  constructor(props) {
    super(props);
  }

  printDocument() {
    html2canvas(document.querySelector("#invoiceContainer")).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      let doc = new jsPDF();
      doc.addImage(imgData, "JPEG", 0, 0, 210, 270);
      // pdf.output('dataurlnewwindow');
      doc.save("invoice.pdf");
      // document.body.appendChild(canvas);
    });
  }

  render() {
    let previewStyle = {
      border: "outset",
      overflowWrap: "break-word",
      fontSize: "10px"
    };
    let logoStyle = {
      height: "125px"
    };

    let subTotal = 0.0;
    let products = this.props.formStateProp.products;
    for (let i in products) {
      subTotal += parseFloat(products[i].amount);
    }
    let taxRate = 0;
    if (this.props.formStateProp.taxRate)
      taxRate = this.props.formStateProp.taxRate;

    let taxAmount = subTotal * taxRate / 100;
    let discount = 0;
    if (this.props.formStateProp.discount)
      discount = this.props.formStateProp.discount;

    let total = subTotal + taxAmount - discount;

    return (
      <div>
        <div className="text-center">
          <h4>Invoice Preview</h4>
          <Button className="btn-primary" onClick={this.printDocument}>
            Download PDF
          </Button>
        </div>
        <div style={previewStyle}>
          <div id="invoiceContainer" style={{ padding: "20px" }}>
            <Row className="show-grid">
              <Col xs={4} md={4}>
                {this.props.formStateProp.companyName}
                <address>{this.props.formStateProp.companyAddress}</address>
              </Col>
              <Col xs={4} md={4} className="text-center">
                <h3>Sales Invoice</h3>
              </Col>
              <Col xs={4} md={4} style={logoStyle}>
                <Image src={this.props.formStateProp.logoUrl} thumbnail />
              </Col>
            </Row>
            <Row className="show-grid" style={{ minHeight: "110px" }}>
              <Col xs={4} md={4}>
                {this.props.formStateProp.customerName}
                <br />
                {this.props.formStateProp.customerCompanyName}
                <br />
                Invoice#: {this.props.formStateProp.invoiceNumber}
                <br />
                Date: {this.props.formStateProp.invoiceDate}
                <br />
                Due Date: {this.props.formStateProp.dueDate}
                <br />
              </Col>
              <Col xs={4} md={4}>
                Billing Address:<br />
                {this.props.formStateProp.billingAddress}
              </Col>
              <Col xs={4} md={4}>
                Shipping Address:<br />
                {this.props.formStateProp.shippingAddress}
              </Col>
            </Row>
            <Row style={{ paddingTop: "5px", minHeight: "250px" }}>
              <Table striped bordered condensed hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product Description</th>
                    <th>Qty</th>
                    <th>Unit Price</th>
                    <th>Line Total</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.formStateProp.products.map((product, i) => (
                    <ProductTableRow key={i} index={i} productData={product} />
                  ))}
                </tbody>
              </Table>
            </Row>

            <Row className="show-grid">
              <Col xs={8} md={8}>
                <Table striped bordered condensed hover>
                  <thead>
                    <tr>
                      <th>Special Notes and Instructions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ height: "105px" }}>
                        {this.props.formStateProp.extraInfo}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
              <Col xs={4} md={4}>
                <b>Summary</b>
                <Table responsive>
                  <tbody>
                    <tr>
                      <th>Sub Total($)</th>
                      <td className="text-right">{subTotal}</td>
                    </tr>
                    <tr>
                      <th>Tax({this.props.formStateProp.taxRate}%)</th>
                      <td className="text-right">{taxAmount}</td>
                    </tr>
                    <tr>
                      <th>Discount($)</th>
                      <td className="text-right">
                        -{this.props.formStateProp.discount}
                      </td>
                    </tr>
                    <tr>
                      <th>Total($)</th>
                      <td className="text-right">{total}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
            <h4 className="text-center">Thank you for your business!!</h4>
          </div>
        </div>
        <div className="text-center">
          <Button className="btn-primary" onClick={this.printDocument}>
            Download PDF
          </Button>
        </div>
      </div>
    );
  }
}

class ProductTableRow extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.index + 1}</td>
        <td>{this.props.productData.name}</td>
        <td>{this.props.productData.qty}</td>
        <td className="text-left">{this.props.productData.unitPrice}</td>
        <td className="text-left">{this.props.productData.amount}</td>
      </tr>
    );
  }
}

export default App;
