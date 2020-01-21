import React, { Component } from "react";
import Aux from '../hoc/Auxiliary';
//airtable vars
var Airtable = require('airtable');
var base = new Airtable({ apiKey: 'key6g32DRULc2ELR4' }).base('appTIhrtdSQzoGMIf');

class Forms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ideas: []
        };
    }

    componentDidMount() {
        base('ideas')
            .select({
                view: "Grid view",
                cellFormat: "json"
            })
            .eachPage((records, nextpage) => {
                records.forEach((record) => {
                    var idea = record._rawJson;
                    this.state.ideas.push(idea.fields);
                    console.log(this.state.ideas);
                });
                nextpage();
            });
    }


    render() {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col">
                        <div className="card-deck">
                            {this.state.ideas.map(idea => <ideaCard {...idea} />)}

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Forms;


const ideaCard = ({ Name, Problem, Solution, Email, Domain }) => (
    <div className="card">
        <div className="card-body">
            <h5 className="card-title">{Name}</h5>
            <p className="card-text">{Problem}</p>
            <p className="card-text">{Solution}</p>
            <p className="card-title">{Email}</p>
            <p className="card-title">{Domain}</p>
        </div>
    </div>
);