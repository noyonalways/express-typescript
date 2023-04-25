import app from './app';
import http from 'http'
import mongoose, { Error } from "mongoose";
const port = process.env.PORT || 8080;


// DB connection
const DB_URL = "mongodb://localhost:27017/express-typescript";
mongoose.Promise = Promise;
mongoose.connect(DB_URL, {
     // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // serverSelectionTimeoutMS: 5000,
    // autoIndex: false, // Don't build indexes
    // maxPoolSize: 10, // Maintain up to 10 socket connections
    // serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    // socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
}).then(() => {
    console.log(`Database connected successfully!`);
})
mongoose.connection.on('error', (error: Error) => console.log(error))

// create server and listen
const server = http.createServer(app);
server.listen(port, function () {
	console.log(`Server is running on http://localhost:${port}`);
});
