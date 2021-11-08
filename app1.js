import React from 'react';

import $ from 'jquery';


export default class PersonComponent extends React.Component {

  constructor(props) {

    super(props);


    this.state = {

      title: "",

      year: "",

      director: ""

    }

  }


  componentDidMount() {

    this.fetch();

  }


  fetch() {

    var context = this;


    $.ajax({

      url: 'http://localhost:5000',

      method: 'GET',

      success: function(response) {

        context.setState({

          title:"Hello",

          year: "2021",

          director: "Tarantino"

        });

      }

    });

  }


  render() {

    return (

      <div>

        <h1>{this.state.title} {this.state.year} {this.state.director}</h1>

      </div>

    );

  }

}