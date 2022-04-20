import mongoose from "mongoose";

interface CounterDocument extends mongoose.Document {
    name: string;
    value: number;
}

const counterSchema = new mongoose.Schema<CounterDocument>({
    name: String,
    value: Number,
});

/**
 * @typedef {Object<CounterDocument>} Counter
 */
const Counter = mongoose.model<CounterDocument>("Counter", counterSchema);

export default Counter;
