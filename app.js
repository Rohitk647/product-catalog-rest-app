const express=require('express');
const bodyParser=require('body-parser');
require('./services/db');
const app=express();
// get the routes to direct the traffic
const productRoutes=require('./routes/productsRoutes');
const unknownRoute=require('./routes/unknownRoute');
const userRoutes=require('./routes/userRoutes');
app.use(bodyParser.json()); 

// setting CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/products',productRoutes);
app.use('/users',userRoutes);
app.use('/',unknownRoute);
app.listen(3000);