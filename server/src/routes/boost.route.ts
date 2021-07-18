import { Router } from 'express';
import IRoute from "@interfaces/routes.interface";
import BoostController from "@controllers/boost.controller";
import authMiddleware from "@middlewares/auth.middleware";
import validationMiddleware from "@middlewares/validation.middleware";
import UpdateTaskDto from "@dtos/UpdateBoostDto";

class BoostRoute implements IRoute {
    public path = '/boost';
    public router = Router();
    public boostController = new BoostController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, authMiddleware, this.boostController.getBoost);
        this.router.post(`${this.path}`, validationMiddleware(UpdateTaskDto, 'body'), this.boostController.updateTask);
    }
}

export default BoostRoute;
