import './App.css';
import React from "react";
import Grafico from "./coseMie/Grafico";
import Selezionatore from "./coseMie/Selezionatore";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tipoGrafico: 'day',
            baseUrl: 'https://api.pilottoweb.it/v1',
            url: null,
        };
        this.grafico = React.createRef();
        this.selezionatoreHandleChange = this.selezionatoreHandleChange.bind(this);
        this.selezionatoreHandleChangeDateSpan = this.selezionatoreHandleChangeDateSpan.bind(this);
    }

    render() {
        return (
            <div className="App">
                <div className="container-fluid">
                    <h1>Grafico della Corrente</h1>
                    <div className="row">
                        <div className="col-12 col-md-8">
                            <Grafico tipoGrafico={this.state.tipoGrafico} timer={this.state.timer} url={this.state.url}
                                     ref={this.grafico}/>
                        </div>
                        <div className="col-12 col-md-4">
                            <Selezionatore onChangeTipo={this.selezionatoreHandleChange}
                                           onChangeDateSpan={this.selezionatoreHandleChangeDateSpan}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    selezionatoreHandleChange(tipo) {
        this.setState({tipoGrafico: tipo});
        this.grafico.current.changeGraphicType(tipo)
    }

    selezionatoreHandleChangeDateSpan(sd, ed) {
        this.grafico.current.changeDateSpan(sd, ed)
        this.grafico.current.changeGraphicType('day-span')
    }
}

export default App;
