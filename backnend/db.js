const mongoose = require('mongoose');
const connectToMongo = () => {
     mongoose.connect('mongodb://127.0.0.1:27017/inotebook');
}
module.exports = connectToMongo;

