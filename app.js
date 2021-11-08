const express = require('express');
const app = express();
const Menu = require ('./connect');
const axios = require('axios');
const apikey = '313affb91c904bc0aa66d164843535f0';  //use ur own API from spooncular.com
const port = '5000';

//Plan B
const ejs = require('ejs');
app.set('view engine', 'ejs');

app.get('/', (req,res) => {
  Menu.find({}, function(err, recipe){
      res.render('index',{
          recipeList : recipe
      });
  })
})

//localhost:5000/getrecipe?title=fish
app.get('/getrecipe', (req, res) => {
  const recipe = req.query.recipe;
  console.log (recipe);
  const querystr = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apikey}&query=${recipe}`;

  axios.get(querystr).then((response)=>{
    title = response.data.results[0].title;
    image = response.data.results[0].image;
    console.log (title + 'title');
    console.log (image + 'image');



    const querystr2 = `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe}`;
    axios.get(querystr2).then((response)=>{
    area = response.data.meals[0].strArea;
    instructions = response.data.meals[0].strInstructions;
    console.log (area + 'area');
    console.log (instructions + 'instructions');

      
    foodValue = new Menu({
      title : title,
      image : image,
      area : area,
      instructions : instructions
  });

    if (!foodValue.title) {
      res.status(200).json('Not found');
      return;
    }

      foodValue.save().then(result =>{
          console.log("Success" + result);
      })
      .catch(error => {
          console.log ("Error"+ error)
      });

    });
});

});

//Plan A
app.get('/getallrecipes', (req, res) => {
  Menu.find({})
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(400).send(error);
    });
});



//localhost:5000/deleterecipe?title=Fish Congee
app.get('/deleterecipe', (req, res) => {
  Menu.deleteOne( {title: req.query.title} ).then((response) => {
      res.status(200).json(response);
  })

  .catch((error) => {
      res.status(400).json(error);
  });
});




//the title will be the starting point of which item will be updated. the area will be the one will be updating
 //Menu.updateOne({ title: 'Fish Congee' }, { area: 'Malaysia' }, function(err, res) {
 //});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});