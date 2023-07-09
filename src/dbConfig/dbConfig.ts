import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('Mongodb connected succesfully')
        })

        connection.on('error', (err) => {
            console.log('connection failed' + err)
            process.exit()
        })
    }
    catch (err) {
        console.log('Something goes wrong')
    }
}