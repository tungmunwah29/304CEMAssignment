//snippet rce
import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from 'reactstrap';

export class RecipeCard extends Component {


  render() {
    console.log(this.props.recipe)
    let { title, image, area, instructions } = this.props.recipe;
    return (
      <div>
        <Card>
          <CardImg top width="100%" src={image} alt="Card image cap" />
          <CardBody>
            <CardTitle>{title}</CardTitle>
            <CardSubtitle>{area}</CardSubtitle>
            <CardText>{instructions}</CardText>
            <Button
              color="primary"
              onClick={() => this.props.removeRecipe(title)}
            >
              Delete
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default RecipeCard;
