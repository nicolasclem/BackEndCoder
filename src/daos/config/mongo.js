const connect = require('mongoose').connect;

const uri = 'mongodb+srv://nicolas:bauti@cluster1.fa7z7.mongodb.net/utn?retryWrites=true&w=majority';

async function connectMongoDb() {
    try {
        const client = await connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });
        console.log('Base de datos conectada', client.connection.name);
    } catch (error) {
        console.error(error);
    }
}

module.exports = connectMongoDb;