const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());

mongoose.connect('mongodb+srv://ives:test123@cluster0-jjtgw.mongodb.net', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.once('open',() => {
  console.log('mLab is open');
});

// pass the schema
// and enable graphiql at / root endpoint URL
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('Now listening on port 4000');
});