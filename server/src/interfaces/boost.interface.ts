export interface ITask {
    id: number;
    name: string;
    isChecked: boolean;
}

export interface IStage {
    id: number;
    name: string;
    tasks: ITask[];
    isComplete: boolean;
}
