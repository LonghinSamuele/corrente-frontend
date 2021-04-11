import React from "react";
import './Grafico.css';
import {Brush, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

class Grafico extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            url: 'https://api.pilottoweb.it/v1/day',
            timer: 5000,
            error: null,
            isLoaded: false,
            items: [],
            lastItem: null,
            baseUrl: 'https://api.pilottoweb.it/v1',
            viewType: "day",
            startDate: null,
            endDate: null
        };
        this.changeGraphicType = this.changeGraphicType.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.changeDateSpan = this.changeDateSpan.bind(this);
        this.timer = 5000;
        this.queryMode = 'merge';
    }

    componentDidMount() {
        this.fetchData();
        this.setTimer();
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    setTimer() {
        clearInterval(this.timerID);
        console.log("setting timer: " + this.state.timer);
        if (this.state.timer > 0) {
            this.timerID = setInterval(
                () => this.fetchData(),
                this.state.timer
            );
        }
    }

    fetchData() {
        fetch(this.composerUrl())
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState((state) => {
                        const newItems = this.state.items ? state.items.concat(result.items) : result.items;
                        let lastItem;
                        if (newItems && newItems.length > 0) {
                            lastItem = newItems[newItems.length - 1];
                        }
                        return {
                            items: newItems,
                            isLoaded: true,
                            lastItem: lastItem
                        };


                    });
                },

                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: error
                    });
                }
            )
    }

    render() {
        var sottotitolo = <h3 className='text-capitalize'>{this.props.tipoGrafico}</h3>;
        var contenuto;
        if (this.state.error) {
            contenuto = <div>Error: {this.state.error.message}</div>;
        } else if (!this.state.isLoaded) {
            contenuto = <div>Loading...</div>;
        } else if (!this.state.items || this.state.items.length === 0) {
            contenuto = <div>Non sono presenti ancora dati</div>
        } else {
            let conf = {
                scales: {
                    yAxes: [{
                        stacked: true
                    }]
                },
            };
            contenuto = <div className="Grafico-view" style={{width: "100%", height: 400}}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart fill="start" width="100%" height="100%"
                               data={this.state.items}
                               options={conf}>
                        <XAxis dataKey="label"/>
                        <YAxis/>
                        <Tooltip/>
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                        <Line type="monotone" dataKey="value" stroke="#8884d8"/>
                        <Brush/>
                    </LineChart>
                </ResponsiveContainer>
            </div>;
        }
        return <div className="Grafico">
            {sottotitolo}
            {contenuto}
        </div>;
    }

    changeDateSpan(startDate, endDate) {
        console.log(startDate);
        console.log(endDate);
        this.setState({startDate: startDate, endDate: endDate})
    }


    composerUrl() {
        let url = this.state.url;
        if (this.state.viewType === 'day-span' || this.state.viewType === 'custom') {
            url += "&" + this.objToQueryString({sd: this.state.startDate, ed: this.state.endDate})
        }
        if (this.state.lastItem && this.queryMode === "merge") {
            console.log("aggiorno");
        }
        return url;
    }

    changeGraphicType(val) {
        let url, timer;
        switch (val) {
            case "day":
                timer = 1000 * 5; //5 secs
                url = this.state.baseUrl + '/day/';
                break;
            case "week":
                timer = 1000 * 60 * 5; // 5 mins
                url = this.state.baseUrl + '/week/';
                break;
            case "month":
                timer = 1000 * 60 * 60 * 5 // 5 hours
                url = this.state.baseUrl + '/month/';
                break;
            case "day-span":
            case "custom":
                timer = 1000 * 60 * 60 * 5 // 5 hours
                url = this.state.baseUrl + '/day-span/';
                break;
            default:
                timer = 0;
        }
        this.setState({
            url: url,
            timer: timer,
            viewType: val,
            items: [],
            lastItem: null,
        }, () => {
            this.setTimer();
            this.fetchData();
        });


    }

    objToQueryString(obj) {
        const keyValuePairs = [];
        for (const key in obj) {
            keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
        }
        return keyValuePairs.join('&');
    }
}


export default Grafico;
