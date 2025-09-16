import Services from "../models/Services.js";
import path from "path";
import fs from "fs";

class ServicesController {
    // Create new service
    async createService(req, res) {
        try {
            

            const { name, description, serviceType} = req.body;
                 console.log(name,description,serviceType)
            if (!name || !description || !serviceType) {
                return res.status(400).json({ message: "All fields are required" });
            }

            if (!req.file) {
                return res.status(400).json({ message: "Image is required" });
            }

            const newService = new Services({
                name,
                description,
                type:serviceType,
                // Always store relative path so frontend can access it
                image: `/uploads/services/${req.file.filename}`,
            });

            await newService.save();
            res.status(201).json(newService);
        } catch (error) {
            console.error("Error creating service:", error.message);
            res.status(500).json({ message: "Error creating service", error: error.message });
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
            const { name, description, type } = req.body;
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

            service.name = name || service.name;
            service.description = description || service.description;
            service.type = type || service.type;

            await service.save();
            res.json(service);
        } catch (error) {
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

            if (service.image) {
                const oldPath = path.join("uploads/services", path.basename(service.image));
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }

            await service.deleteOne();
            res.json({ message: "Service deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error deleting service", error: error.message });
        }
    }
}

export default new ServicesController();

