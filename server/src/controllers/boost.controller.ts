import { NextFunction, Request, Response } from 'express';
import BoostService from "@services/boost.service";
import { IStage } from "@interfaces/boost.interface";
import UpdateTaskDto from "@dtos/UpdateBoostDto";

class BoostController {
    public boostService = new BoostService();

    public getBoost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const findBoostData: IStage[] = await this.boostService.getBoost();

            res.status(200).json({ data: findBoostData, message: 'OK' });
        } catch (error) {
            next(error);
        }
    };


    public updateTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const stageId = parseInt(req.query['stageId'].toString());
            const taskId = parseInt(req.query['taskId'].toString())
            const taskData: UpdateTaskDto = req.body;
            const updateStageData: IStage = await this.boostService.updateTask(taskId, stageId, taskData);

            res.status(200).json({ data: updateStageData, message: 'updated' });
        } catch (error) {
            next(error);
        }
    };
}

export default BoostController;
