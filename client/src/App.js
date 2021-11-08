import React, { Component } from 'react';
import './App.css';
import RecipeCard from './RecipeCard';
import axios from 'axios';

import {

  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  InputGroup
} from 'reactstrap';

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      recipes: [
        { title: 'zzz', image: '', area: 'Malaysia', instructions: 'Instructions' },
        { title: 'Testing', image: '', area: 'Italy', instructions: 'Instructions' },
        { title: 'Testing1', image: '', area: 'Singapore', instructions: 'Instructions' },
        { title: 'Testing2', image: '', area: 'Penang', instructions: 'Instructions' },

        { title: '', image: '', area: '', instructions: '' }
      ],
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  getAllRecipes = () => {
    axios
      .get('/getallrecipes').then((result) => {
        this.setState({ recipes: result.data });
        console.log(this.state.recipes[this.state.recipes.length-2]);
      })
      .catch(error => {
        console.log('this is error from getting all the recipes from the database');
      });
  };

  componentDidMount() {
    this.getAllRecipes();
  }

  //for getting form
  onSubmit(e) {
    e.preventDefault();

    const query = `/getrecipe?title=${this.input.value}`;

    console.log(query);

    axios.get(query).then((result) => {
      console.log(result);
      if (result.data === "Not found"){
        //Display the alert message
        alert("Recipe Not Found!");
      }
      this.getAllRecipes();
    })

    .catch((error) => {
      //Display the alert message
      alert("Error from Searching");
    });
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
   //For delete the food
   removeRecipe = (value) => {
    const query = `/deleterecipe?title=${value}`;
    
    axios.get(query).then((result) => {
      this.getAllRecipes();
    })
    
    .catch((error) => {
      //Display the alert message
      alert("Error from deleting ", error);
    });
  };

  render() {
    return (
      <div className="App">
        <Container>
          <h1 className="display-4">Food App Search</h1>
          <p className="lead">Search for recipes</p>   
          <Row>
            <Col>
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Label for="title">Enter your favorite recipe</Label>
                  <InputGroup>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search for recipe"
                    ref={(input) => (this.input = input)}
                  />
                </InputGroup>
                </FormGroup>
                <Button color="primary">Submit</Button>
              </Form>
            </Col>
          </Row>
          <p />
          <Row>
            <Col sm="3" key={this.state.recipes[this.state.recipes.length-1]}>
              <RecipeCard
                removeRecipe={this.removeRecipe.bind(this)}
                recipe={this.state.recipes[this.state.recipes.length-1]}
              />
            </Col>
            <Col sm="3" key={this.state.recipes[this.state.recipes.length-2]}>
              <RecipeCard
                removeRecipe={this.removeRecipe.bind(this)}
                recipe={this.state.recipes[this.state.recipes.length-2]}
              />
            </Col>
            <Col sm="3" key={this.state.recipes[this.state.recipes.length-3]}>
              <RecipeCard
                removeRecipe={this.removeRecipe.bind(this)}
                recipe={this.state.recipes[this.state.recipes.length-3]}
              />
            </Col>
            <Col sm="3" key={this.state.recipes[this.state.recipes.length-4]}>
              <RecipeCard
                removeRecipe={this.removeRecipe.bind(this)}
                recipe={this.state.recipes[this.state.recipes.length-4]}
              />
            </Col>
            <Col sm="3" key={this.state.recipes[this.state.recipes.length-5]}>
              <RecipeCard
                removeRecipe={this.removeRecipe.bind(this)}
                recipe={this.state.recipes[this.state.recipes.length-5]}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
