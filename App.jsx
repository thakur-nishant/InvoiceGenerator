import React from 'react';
import {Bootstrap, Grid, Row, Col, ButtonToolbar, Button, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';

class App extends React.Component {

    render(){
        return (
            <div>
                <Header/>
                <MainContainer/>
            </div>
        );
    }
}

class Header extends React.Component{

    render(){
        var headerStyle = {
            textAlign: 'center'
        }

        return (
            <h1 style={headerStyle}>Invoice Generator React </h1>
        )
    }
}

class MainContainer extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            data: {
                companyName : '',
                companyAddress: '',
                date: '',
                invoiceNumber: '',
                customerName: '',
                billingAddress: '',
                shippingAddress: '',

            }
        };
        this.updateState = this.updateState.bind(this);
    };

    updateState(e) {
        var ndata = this.state.data;
        ndata[e.target.name] = e.target.value;
        this.setState({data: ndata});
    }

    render(){
        return(
            <div>
                <Grid>
                    <Row className="show-grid">
                        <Col xs={12} md={6}>
                            <FormBody formStateProp = {this.state.data} updateStateProp = {this.updateState}/><br/><br/>
                        </Col>
                        <Col xs={12} md={6} >
                            <InvoicePreview formStateProp = {this.state.data}/>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}


class FormBody extends React.Component{

    render(){
        return(
            <div>
                <h4>Form</h4>
                <FormGroup controlId="formControlsText">
                    <ControlLabel>Company Name</ControlLabel>
                    <FormControl
                        type="text"
                        name="companyName"
                        value={this.props.formStateProp.companyName}
                        placeholder="Enter text"
                        onChange = {this.props.updateStateProp}
                    />
                    {/*<HelpBlock>Validation is based on string length.</HelpBlock>*/}
                </FormGroup>

                <FormGroup controlId="formControlsText">
                    <ControlLabel>Company Address</ControlLabel>
                    <FormControl
                        type="text"
                        name="companyAddress"
                        value={this.props.formStateProp.companyAddress}
                        placeholder="Enter Company Address"
                        onChange = {this.props.updateStateProp}
                    />
                </FormGroup>

                <FormGroup controlId="formControlsText">
                    <ControlLabel>Customer Name</ControlLabel>
                    <FormControl
                        type="text"
                        name="customerName"
                        value={this.props.formStateProp.customerName}
                        placeholder="Enter text"
                        onChange = {this.props.updateStateProp}
                    />
                    {/*<HelpBlock>Validation is based on string length.</HelpBlock>*/}
                </FormGroup>

                <FormGroup controlId="formControlsTextarea">
                    <ControlLabel>Billing Address</ControlLabel>
                    <FormControl
                        componentClass="textarea"
                        name="billingAddress"
                        value={this.props.formStateProp.billingAddress}
                        onChange = {this.props.updateStateProp}
                        placeholder="textarea" />
                </FormGroup>

                <FormGroup controlId="formControlsTextarea">
                    <ControlLabel>Shipping Address</ControlLabel>
                    <FormControl
                        componentClass="textarea"
                        name="shippingAddress"
                        value={this.props.formStateProp.shippingAddress}
                        onChange = {this.props.updateStateProp}
                        placeholder="textarea" />
                </FormGroup>

                <FormGroup controlId="formControlsText">
                    <ControlLabel>Invoice Number</ControlLabel>
                    <FormControl
                        type="text"
                        name="invoiceNumber"
                        value={this.props.formStateProp.invoiceNumber}
                        placeholder="Enter Company Address"
                        onChange = {this.props.updateStateProp}
                    />
                </FormGroup>

                <FormGroup controlId="formControlsText">
                    <ControlLabel>Date</ControlLabel>
                    <FormControl
                        type="text"
                        name="date"
                        value={this.props.formStateProp.date}
                        placeholder="Enter Company Address"
                        onChange = {this.props.updateStateProp}
                    />
                </FormGroup>
            </div>
        )
    }
}

class InvoicePreview extends React.Component{
    render(){
        var previewStyle ={
            border:'outset',
            padding:'20px',
            overflowWrap: 'break-word'
        };
        var logoStyle = {
            height: '125px'
        }
        return(
            <div>
                <h4>Invoice Preview</h4>
                <div style={previewStyle}>
                        <Row className="show-grid">
                            <Col xs={4} md={4} >
                            Name: {this.props.formStateProp.companyName}
                            <address>{this.props.formStateProp.companyAddress}</address>
                            </Col>
                            <Col xs={4} md={4}>
                                <b>Sales Invoice</b>
                            </Col>
                            <Col xs={4} md={4} style={logoStyle}>
                                Company LOGO
                            </Col>
                        </Row>
                        <Row className="show-grid">
                            <Col xs={4} md={4}>
                                Customer Name: {this.props.formStateProp.customerName}<br/>
                                Invoice#: {this.props.formStateProp.invoiceNumber}<br/>
                                Date: {this.props.formStateProp.date}<br/>
                            </Col>
                            <Col xs={4} md={4}>
                                Billing Address:<br/>{this.props.formStateProp.billingAddress}
                            </Col>
                            <Col xs={4} md={4}>
                                Shipping Address:<br/>{this.props.formStateProp.shippingAddress}
                            </Col>

                        </Row>
                </div>
            </div>
        )
    }
}

export default App;
