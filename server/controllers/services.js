import Services from "../models/Services.js";
import path from "path";
import fs from "fs";

class ServicesController {
    // Create new service
    async createService(req, res) {
        try {
            console.log('Request body:', req.body);
            console.log('File:', req.file);
            
            const { name, description, type, highlights } = req.body;
            
            if (!name || !description || !type) {
                console.error('Validation failed - Missing required fields:', { name, description, type });
                return res.status(400).json({ 
                    success: false,
                    message: "Name, description, and type are required",
                    fields: { name: !!name, description: !!description, type: !!type }
                });
            }

            if (!req.file) {
                console.error('No file uploaded');
                return res.status(400).json({ 
                    success: false,
                    message: "Image is required" 
                });
            }
            
            let highlightsArray = [];
            if (highlights) {
                try {
                    highlightsArray = Array.isArray(highlights) ? highlights : JSON.parse(highlights);
                    if (!Array.isArray(highlightsArray)) {
                        highlightsArray = [highlightsArray];
                    }
                    // Filter out any empty strings and trim whitespace
                    highlightsArray = highlightsArray
                        .filter(h => h && typeof h === 'string')
                        .map(h => h.trim())
                        .filter(h => h.length > 0);
                } catch (e) {
                    console.error('Error parsing highlights:', e);
                    highlightsArray = [];
                }
            }

            console.log('Creating service with:', {
                name,
                description,
                type,
                highlights: highlightsArray,
                image: req.file.filename
            });

            const newService = new Services({
                name,
                description,
                type,
                highlights: highlightsArray,
                image: `/uploads/services/${req.file.filename}`,
            });

            const savedService = await newService.save();
            console.log('Service created successfully:', savedService._id);
            
            res.status(201).json({
                success: true,
                message: 'Service created successfully',
                service: savedService
            });
            
        } catch (error) {
            console.error('Error in createService:', {
                message: error.message,
                stack: error.stack,
                requestBody: req.body,
                file: req.file
            });
            
            res.status(500).json({ 
                success: false,
                message: "Error creating service",
                error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
            });
        }
    }

    // Get all services
    async getServices(req, res) {
        try {
            const services = await Services.find().sort({ createdAt: -1 });
            res.json(services);
        } catch (error) {
            res.status(500).json({ message: "Error fetching services", error: error.message });
        }
    }
    //get first five digital services 
    async   getFiveDigitalServices(req,res){
            try {
                const services = await Services.find({type:"digital"}).limit(5);
                res.json(services);

                
            } catch (error) {
                res.status(500).json({ message: "Error fetching services", error: error.message });
            }
    }
    //ger first five  physical serives 
    async   getFivePhysicalServices(req,res){
        try {
            const services = await Services.find({type:"physical"}).limit(5);
            res.json(services);
        } catch (error) {
            res.status(500).json({ message: "Error fetching services", error: error.message });
        }
    }
    // get all the services of type physical 
    async getPhysicalServices(req,res){
        try {
            const services = await Services.find({type:"physical"});
            res.json(services);
        } catch (error) {
            res.status(500).json({ message: "Error fetching services", error: error.message });
        }
    }
    
    //get all the services of type digital 
    async getDigitalServices(req,res){
        try {
            const services = await Services.find({type:"digital"});
            res.json(services);
        } catch (error) {
            res.status(500).json({ message: "Error fetching services", error: error.message });
        }
    }


    // Get single service
    async getService(req, res) {
        try {
            const service = await Services.findById(req.params.id);
            if (!service) {
                return res.status(404).json({ message: "Service not found" });
            }
            res.json(service);
        } catch (error) {
            res.status(500).json({ message: "Error fetching service", error: error.message });
        }
    }

    // Update service
    async updateService(req, res) {
        try {
            const { name, description, type, highlights } = req.body;
            const service = await Services.findById(req.params.id);

            if (!service) {
                return res.status(404).json({ message: "Service not found" });
            }

            if (req.file) {
                // delete old image if exists
                if (service.image) {
                    const oldPath = path.join("uploads/services", path.basename(service.image));
                    if (fs.existsSync(oldPath)) {
                        fs.unlinkSync(oldPath);
                    }
                }
                service.image = `/uploads/services/${req.file.filename}`;
            }

            // Parse highlights if provided
            if (highlights !== undefined) {
                try {
                    service.highlights = Array.isArray(highlights) ? highlights : JSON.parse(highlights);
                } catch (e) {
                    service.highlights = [highlights];
                }
            }

            service.name = name || service.name;
            service.description = description || service.description;
            service.type = type || service.type;

            await service.save();
            res.json(service);
        } catch (error) {
            console.error("Error updating service:", error);
            res.status(500).json({ message: "Error updating service", error: error.message });
        }
    }

    // Delete service
    async deleteService(req, res) {
        try {
            const service = await Services.findById(req.params.id);
            if (!service) {
                return res.status(404).json({ message: "Service not found" });
            }

            // Delete the associated image if it exists
            if (service.image) {
                const imagePath = path.join(process.cwd(), 'public', service.image);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }

            await service.deleteOne();
            res.json({ message: "Service deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error deleting service", error: error.message });
        }
    }

    // Toggle featured status of a service
    async toggleFeatured(req, res) {
        try {
            const service = await Services.findById(req.params.id);
            if (!service) {
                return res.status(404).json({ message: "Service not found" });
            }
            
            service.featured = !service.featured;
            await service.save();
            
            res.json({
                message: `Service ${service.featured ? 'marked as featured' : 'removed from featured'}`,
                featured: service.featured
            });
        } catch (error) {
            res.status(500).json({ message: "Error toggling featured status", error: error.message });
        }
    }

    // Get featured services
    async getFeaturedServices(req, res) {
        try {
            const services = await Services.find({ featured: true });
            res.json(services);
        } catch (error) {
            res.status(500).json({ message: "Error fetching featured services", error: error.message });
        }
    }
}

export default new ServicesController();
