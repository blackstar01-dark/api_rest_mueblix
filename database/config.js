const mongoose = require('mongoose');
require('dotenv').config();

async function connectDB() {
    try {
        console.log('Conectando a la base de datos en el cluster...');
        await mongoose.connect( `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@${process.env.CLUSTER_NAME}.${process.env.CADENA_MONGO_NET}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conectado a la base de datos en el cluster');
    } catch (error) {
        console.log('Error al conectar a la base de datos en el cluster:', error);
        console.log('Intentando conectar a la base de datos en la local...');
        try {
            await mongoose.connect(process.env.MONGODB_LOCAL_URI, {
                userNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log('Conectado a la base de datos en la local');
        } catch (error) {
            console.log('Error al conectar a la base de datos en la local:', error);
            throw error;
        }
    }
}

module.exports = connectDB;