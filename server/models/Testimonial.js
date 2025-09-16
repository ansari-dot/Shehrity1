import mongoose from "mongoose";



const testimonialSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,

    },
    message: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }



}, {
    timeseries: true
});
const testimonial = mongoose.model('testimonial', testimonialSchema);

export default testimonial;