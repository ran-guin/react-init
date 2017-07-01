module.exports = {

port: process.env.PORT || '1234',
url_root: '',

connections: {
  testDB: {
    adapter: 'sails-mysql',
    host:     'localhost',
    user:     'tester',
    password: 'testpass',
    database: 'ovid',
  },
  
  productionDB: {
    adapter: 'sails-mysql',
    host:     'localhost',
    user:     'tester',
    password: 'testpass',
    database: 'react_prod',
  },
  devDB: {
    adapter: 'sails-mysql',
    host:     'localhost',
    user:     'tester',
    password: 'testpass',
    database: 'react_dev',
  },
},

}
