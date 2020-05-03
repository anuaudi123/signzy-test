import React, { Component } from 'react';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import db from './db.json';


let options = db;
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: " ",
            operaton: " ",
            add: false,
            remove: false
        }
    }

    handleSubmit = (e) => {
        alert('Your favorite flavor is: ' + this.state.type);
        e.preventDefault();
    }

    handleChange = (e) => {
        this.setState({ type: e.target.value });
    }

    handleRadio = (e) => {
        console.log("---------------", e)
        this.setState({ operaton: e })
    }

    handleResponse = async (response) => {
        console.log('-------------', response);
        if (response.ok) return response.json();

    }

    radioSubmit = () => {
        // this.setState({ operation: e.target.value });
        let baseUrl = `http://localhost:8080/command/${this.state.type}/${this.state.operaton}`;

        fetch(baseUrl)
            .then(this.handleResponse)
            .then(res => {
                alert('Operation successfull', res)
            })

            .catch(e => {
                console.log(e)
            })
    }

    addMachine = () => {
        this.state.add ?
            this.setState({
                add: false
            }) : this.setState({
                add: true
            })
    }

    addMachineDetail = (e) => {
        e.preventDefault();
        let type = e.target['type'].value;
        let brand = e.target['brand'].value;
        let baseUrl = `http://localhost:8080/addmachine/${type}/${brand}`;

        fetch(baseUrl, {
            method: "POST", // POST for create, PUT to update when id already exists.
            headers: { "content-type": "application/json" }
        })
            .then(this.handleResponse)
            .then(res => {
                alert('Operation successfull', res)
            })

            .catch(e => {
                console.log(e)
            })

    }

    removeMachine = (e) => {
        this.state.add ?
            this.setState({
                remove: false
            }) : this.setState({
                remove: true
            })
    }

    removeMachineDetail = (e) => {
        e.preventDefault();
        let type = e.target['type'].value;
        let baseUrl = `http://localhost:8080/removemachine/${type}`;

        fetch(baseUrl, {
            method: "POST", // POST for create, PUT to update when id already exists.
            headers: { "content-type": "application/json" }
        })
            .then(this.handleResponse)
            .then(res => {
                alert('Operation successfull', res)
            })

            .catch(e => {
                console.log(e)
            })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label> Pick a Appliance to control:
                    <br /><br />
                        <select value={this.state.type} onChange={this.handleChange}>
                            {
                                options.map((n, i) =>
                                    <option key={i}>{n.type}</option>
                                )
                            }
                        </select>
                    </label>
                    <br /><br />
                </form>

                {this.state.type && <div>

                    <RadioGroup onChange={this.handleRadio} vertical>
                        <RadioButton value="on">
                            ON
                        </RadioButton>
                        <RadioButton value="off">
                            OFF
                        </RadioButton>
                    </RadioGroup>

                    <button type="submit" onClick={this.radioSubmit}>Submit</button>

                </div>}
                <br /><br />
                <button type="submit" onClick={this.addMachine}>Add Machine</button>
                {this.state.add && <form onSubmit={this.addMachineDetail}>
                    <ui>
                        <li>
                            <label>Machine Type : </label>
                            <input type='text' name="type" /><br />
                        </li>
                        <li>
                            <label>Brand : </label>
                            <input type='text' name="brand" /><br />
                        </li>
                    </ui>
                    <button type="submit" >Add</button>
                </form>}
                &nbsp;
                <button type="submit" onClick={this.removeMachine}>Remove Machine</button>

                {this.state.remove && <form onSubmit={this.removeMachineDetail}>
                    <label>Machine Type : </label>
                    <input type='text' name="type" /><br />
                    <button type="submit" >Remove</button>
                </form>}

            </div >
        );
    }
}

export default Home;