import boostModel from "@models/boost.model";
import { IStage, ITask } from "@interfaces/boost.interface";
import UpdateTaskDto from "@dtos/UpdateBoostDto";
import { isEmpty } from "@utils/util";
import HttpException from "@exceptions/HttpException";

class BoostService {
    public stages = boostModel;

    private static _allTasksComplete(tasks: ITask[]): boolean {
        return tasks.every(task => task.isChecked);
    }

    public async getBoost(): Promise<IStage[]> {
        return this.stages;
    }

    public async updateTask(taskId: number, stageId: number, updateTask: UpdateTaskDto): Promise<IStage> {
        if (isEmpty(updateTask)) throw new HttpException(400, "invalid data");

        const findStage: IStage = this.stages.find(stage => stage.id === stageId)
        if (!findStage) throw new HttpException(409, "Invalid stage id");

        const prevStageComplete = this._isPrevStageComplete(findStage);
        if (!prevStageComplete) throw new HttpException(400, "You dont have access to this stage yet.");

        const findTask: ITask = findStage.tasks.find(task => task.id === taskId);
        if (!findTask) throw new HttpException(409, "Invalid task id");

        if (findStage.isComplete) {
            throw new HttpException(400, "You can not update task in completed stage.");
        }

        findTask.isChecked = updateTask.isChecked;
        findStage.isComplete = BoostService._allTasksComplete(findStage.tasks);

        return findStage;
    }

    private _isPrevStageComplete(stage: IStage): boolean {
        const prevStageIndex = this.stages.indexOf(stage) - 1;
        if (prevStageIndex < 0) {
            return true;
        }
        return this.stages[prevStageIndex].isComplete;
    }
}

export default BoostService;
