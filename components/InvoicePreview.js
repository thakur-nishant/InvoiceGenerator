import React from "react";
import { Grid, Row, Col, Button, Table, Image } from "react-bootstrap";
import html2canvas from "html2canvas";
// import * as jsPDF from 'jspdf';

export default class InvoicePreview extends React.Component {
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
