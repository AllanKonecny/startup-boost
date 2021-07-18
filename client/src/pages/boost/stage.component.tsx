import React, { useState } from "react";
import './boost.scss';
import { FaCheck } from 'react-icons/fa';
import { IStage } from "interfaces/stage.interface";
import Task from "./task.component";

interface IStageComp {
    stage: IStage;
    index: number;
}

const Stage: React.FC<IStageComp> = (props) => {
    const [stage, setStage] = useState<IStage>(props.stage);

    const onUpdate = (stage: IStage) => {
        setStage(stage);
    }
    return (
        <div className="sb-boost__stage">
            <div className="sb-boost__stage-header">
                <div className="sb-boost__stage-number">{props.index + 1}</div>
                <div className="sb-boost__stage-title">{stage.name}</div>
                {stage.isComplete && <FaCheck className="sb-boost__check-icon" />}
            </div>
            <div className="sb-boost__task-list">
                {stage.tasks.map((task) =>
                    <Task
                        key={task.id}
                        task={task}
                        stageId={props.stage.id}
                        onUpdate={onUpdate} />)}
            </div>
        </div>
    )
}

export default Stage;
