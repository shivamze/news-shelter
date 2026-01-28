import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number
}

mongoose.connection.on("connected", () => console.log("DB connected"));
mongoose.connection.on("disconnected", () => console.warn("DB disconnected"));
mongoose.connection.on("reconnected", () => console.log("DB reconnected"));
mongoose.connection.on("error", (err) => console.error("DB error:", err));

const connection: ConnectionObject ={}

export async function dbConnect(): Promise<void> {
    if(connection.isConnected){
        console.log("Database is already connected");
        return;
    }

    try{
        const db = await mongoose.connect(process.env.MONGODB_URI!)

        connection.isConnected = db.connections[0].readyState
        console.log("Database connected");
    }catch(err: any){
        console.error("Database connection error:", err);
        process.exit(1);
    }
}