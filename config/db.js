import mongoose from "mongoose";
import colors from "colors"


const connectDb = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URL)
        console.log(` MongoDb get connected succesfully :${db.connection.host}`.bgCyan.blue)
    }
    catch (error) {
        console.log(`the mongodb connection error is :${error}`)
    }
}
export default connectDb;