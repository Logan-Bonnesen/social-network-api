const { connect, connection } = require('mongoose');

const connectionString = 
process.env.MONGODB_URI || 'mongoDB://localhost/socialMedia_db';

connect(connectionString, {
    useNewUrlParser: true,
  useUnifiedTopology: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
});


module.exports = connection;