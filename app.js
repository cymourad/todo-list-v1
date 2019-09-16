//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('view engine', 'ejs');
app.use(express.static('public'));

let myItems = [];
let workItems = [];

app.get('/', function(req, res) {



  const formattedDate = date.getDate();

  res.render('list', {
    listTitle: formattedDate,
    htmlItems: myItems
  });
});

app.get('/work', function(req, res) {
  res.render('list', {
    listTitle: 'Work',
    htmlItems: workItems
  });
});

app.listen(3000, function() {
  console.log('Server started listening to port 3000 ...');
});

app.post('/', function(req, res) {
  const newItem = req.body.toDoItem;
  if (req.body.submitItem === 'Work') {
    workItems.push(newItem);
    res.redirect('/work');
  } else {
    myItems.push(newItem);
    res.redirect('/');
  }

});