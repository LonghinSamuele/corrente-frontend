import React from "react";
import Form from "react-bootstrap/Form";

class SelezionaGiorno extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            startDate: new Date().toISOString().slice(0, 10),
            endDate: new Date().toISOString().slice(0, 10),
            visible: props.visible
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleStartDateChange(event) {
        this.setState({startDate: event.target.value});
    }

    handleEndDateChange(event) {
        this.setState({endDate: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onChangeDateSpan(this.state.startDate, this.state.endDate)
    }

    render() {
        if (this.state.visible)
            return (
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formStartDate">
                        <Form.Label>Data di inizio</Form.Label>
                        <Form.Control type="date" placeholder="Inserisci la data" value={this.state.startDate}
                                      onChange={this.handleStartDateChange}/>
                    </Form.Group>
                    <Form.Group controlId="formEndDate">
                        <Form.Label>Data di fine</Form.Label>
                        <Form.Control type="date" placeholder="Inserisci la data" value={this.state.endDate}
                                      onChange={this.handleEndDateChange}/>
                    </Form.Group>
                    <Form.Control type="submit" value="invia"/>
                </Form>
            );
        else return '';
    }


}

export default SelezionaGiorno;