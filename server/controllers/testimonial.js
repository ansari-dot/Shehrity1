import Testimonial from "../models/Testimonial.js";

class TestimonialController {
    // Get all testimonials
    async getAll(req, res) {
        try {
            const testimonials = await Testimonial.find();
            res.json(testimonials);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Create testimonial
    async create(req, res) {
        try {
            const { name, message, } = req.body;

            const newTestimonial = new Testimonial({ 
                name, 
                message,         
                 image:`/uploads/services/${req.file.filename}`,
 });
            await newTestimonial.save();
            res.status(201).json(newTestimonial);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    // Delete testimonial
    async delete(req, res) {
        try {
            const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
            if (!testimonial) {
                return res.status(404).json({ message: "Not found" });
            }
            res.json({ message: "Deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new TestimonialController();