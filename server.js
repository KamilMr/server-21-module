const express = require('express');
// const formidableMiddleware = require('express-formidable');
const formidable = require('formidable'); 
const path = require('path');
const hbs = require('express-handlebars');

const app = express();
app.engine('.hbs', hbs());
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: false }));
// app.use(formidableMiddleware());

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/hello/:name', (req, res) => {
  res.send(`Hello ${req.params.name}`);
});

app.get('/about', (req, res) => {
  res.render('about', {layout: 'dark'});
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.post('/contact/send-message', (req, res) => {
  var form = new formidable.IncomingForm();
  form.parse(req);
  const { author, sender, title, message } = req.body;
  console.log(form);
  if(author && sender && title && message) {
    form.on('fileBegin', (name, file) => {
      file.path = __dirname + '/public/upload/' + file.name;
    });
    form.on('file', (name, file) => {
      console.log('Uploaded ' + file.name);
    });
    res.render('contact', { isSent: true, name: req.body.image.
      name });
  }
  else {
    res.render('contact', { isError: true, name: req.files });
  }
});

app.get('/info', (req, res) => {
  res.render('info');
});

app.get('/history', (req, res) => {
  res.render('history');
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
});


app.listen(10533, () => {
  console.log('Server is running on port: 10533');
});