import mongoose from "mongoose";

export interface ContactDocument extends mongoose.Document {
    name: string;
    phone: string;
    email: string;
    zalo: string;
}

const contactSchema = new mongoose.Schema<ContactDocument>({
    name: String,
    phone: String,
    email: String,
    zalo: String,
});

/**
 * @typedef Contact
 */
const Contact = mongoose.model<ContactDocument>("Contact", contactSchema);

export default Contact;
