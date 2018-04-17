import React from "react";
import { Grid, Row, Col } from "react-bootstrap";
import FormBody from "./components/FormBody";
import InvoicePreview from "./components/InvoicePreview";

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
        logoUrl: "./src/images/logo-1.png",
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

export default App;
