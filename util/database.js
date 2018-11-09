const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

let _db

const mongoConnect = (callback) => {
  MongoClient.connect(
    'mongodb://mongo:27017/shop',
    {useNewUrlParser: true }
  )
  .then(client => {
    _db = client.db()
    callback(client)
  })
  .catch(err => {
    console.log(err)
    throw err
  }) 
}

const getDb = () => {
  if (_db) {
    return _db
  }

  throw 'No database found'
}


exports.mongoConnect = mongoConnect
exports.getDb = getDb
