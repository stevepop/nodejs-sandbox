const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const errorController = require('./controllers/error');

const User = require('./models/user')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('5be9db314d7fda01f1a13607')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);
const port = 3000;

// Connect via mongoose
mongoose.connect('mongodb://mongo:27017/shop').then(result => {
  User.findOne().then(user => {
    if (!user) {
      const user = new User({
        name: 'Steve',
        email: 'steve@test.com',
        cart: {
          items: []
        }
      })
    
      user.save()
    }
  })
  
  app.listen(port, () => console.log('Server running...'))
})
.catch(err => {
  console.log(err)
})

