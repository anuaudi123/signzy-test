import React, { Component } from 'react';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import db from './db.json';


let options = db;
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: options.length ? options[0].type : "",
            operaton: " ",
            add: false,
            remove: false
        }
    }



    handleChange = (e) => {
        this.setState({ type: e.target.value });
    }

    handleRadio = (e) => {
        this.setState({ operaton: e })
    }

    handleResponse = async (response) => {
        if (response.ok) return response.json();

    }

    radioSubmit = () => {
        let baseUrl = `http://localhost:8080/command/${this.state.type}/${this.state.operaton}`;

        fetch(baseUrl)
            .then(this.handleResponse)
            .then(res => {
                alert(`${this.state.type} is set to  ${this.state.operaton}`)
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
        this.state.remove ?
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
            <div className="card p-4 col-6 self-center" >
                <form onSubmit={this.handleSubmit}>
                    {this.state.type ? <label> <h2 style={{ 'font-family': 'Open Sans' }}>Pick an Appliance to control</h2>

                        <select className="form-control" selected value={this.state.type} onChange={this.handleChange}>
                            {
                                options.map((n, i) =>
                                    <option key={i}>{n.type}</option>
                                )
                            }
                        </select>
                    </label> : <label><h1>Please Add Some Appliance</h1></label>}

                    <br /><br />
                </form>

                {
                    this.state.type && <div>

                        <RadioGroup onChange={this.handleRadio} vertical>
                            <RadioButton value="on">
                                ON
                        </RadioButton>
                            <RadioButton value="off">
                                OFF
                        </RadioButton>
                        </RadioGroup>

                        <button type="submit" className="mt-2 btn btn-primary" onClick={this.radioSubmit}>Submit</button>

                    </div>
                }
                <br /><br />
                <button type="submit" className="mt-2 btn btn-primary" onClick={this.addMachine}>Add Machine</button>
                {
                    this.state.add && <form onSubmit={this.addMachineDetail}>
                        <ui>
                            <li>
                                <label style={{ 'font-family': 'Open Sans', 'font-size': '25px' }}>Machine Type </label>&nbsp;
                                <input type='text' className="form-control" name="type" /><br />
                            </li>
                            <li>
                                <label style={{ 'font-family': 'Open Sans', 'font-size': '25px' }}>Brand </label>&nbsp;
                                <input type='text' className="form-control" name="brand" /><br />
                            </li>
                        </ui>
                        <button type="submit" className="mt-2 btn btn-primary" >Add</button>
                    </form>
                }
                &nbsp;
                {options.length > 0 && <button type="submit" className="mt-2 btn btn-primary" onClick={this.removeMachine}>Remove Machine</button>}

                {
                    this.state.remove && <form onSubmit={this.removeMachineDetail}>
                        <label style={{ 'font-family': 'Open Sans', 'font-size': '25px' }}>Machine Type </label>&nbsp;
                        <input type='text' name="type" className="form-control" /><br />
                        <button type="submit" className="mt-2 btn btn-primary">Remove</button>
                    </form>
                }

            </div >
        );
    }
}

export default Home;