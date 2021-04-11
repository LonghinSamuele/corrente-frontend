import React from "react";
import './Grafico.css';
import SelezionaGiorno from "./SelezionaGiorno";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class Selezionatore extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: "day",
        };

        this.setValueDay = this.setValueDay.bind(this);
        this.setValueWeek = this.setValueWeek.bind(this);
        this.setValueMonth = this.setValueMonth.bind(this);
        this.setValueCustom = this.setValueCustom.bind(this);
        this.getVariant = this.getVariant.bind(this);
        this.selezionaGiorno = React.createRef();
    }

    handleChange() {
        this.props.onChangeTipo(this.state.value)
    }

    render() {
        var bottoni = <>
            <Button onClick={this.setValueDay}
                    variant={this.getVariant('day')}>
                Giornaliero
            </Button>
            <Button onClick={this.setValueWeek}
                    variant={this.getVariant('week')}>
                Settimanale
            </Button>
            <Button onClick={this.setValueMonth}
                    variant={this.getVariant('month')}>
                Mensile
            </Button>
            <Button onClick={this.setValueCustom}
                    variant={this.getVariant('custom')}>
                Personalizzato
            </Button>
        </>;
        return (
            <div className="Selezionatore" style={{width: '100%'}}>
                <h3>Configurazione</h3>
                <ButtonGroup className="d-md-none">
                    {bottoni}
                </ButtonGroup>
                <ButtonGroup vertical className="d-md-block d-none">
                    {bottoni}
                </ButtonGroup>
                <SelezionaGiorno onChangeDateSpan={this.props.onChangeDateSpan}
                                 visible={this.state.value === 'custom'}
                                 ref={this.selezionaGiorno}/>
            </div>
        );

    }

    setValueCustom() {
        this.setState({value: 'custom'}, this.handleChange);
        this.selezionaGiorno.current.setState({visible: true})
    }

    setValueMonth() {
        this.setState({value: 'month'}, this.handleChange);
        this.selezionaGiorno.current.setState({visible: false})
    }

    setValueWeek() {
        this.setState({value: 'week'}, this.handleChange);
        this.selezionaGiorno.current.setState({visible: false})
    }

    setValueDay() {
        this.setState({value: 'day'}, this.handleChange);
        this.selezionaGiorno.current.setState({visible: false})
    }

    getVariant(id) {
        if (this.state.value === id)
            return 'primary';
        else
            return 'outline-primary';
    }
}


export default Selezionatore;
