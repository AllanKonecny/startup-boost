import React, { useEffect, useState } from "react";
import './boost.scss';
import { IStage, ITask } from "interfaces/stage.interface";
import http from 'services/http.service';
import { BsCheck } from 'react-icons/bs';
import { IApiRes } from "interfaces/api-response.interface";
import { AxiosError } from "axios";

interface ITaskComp {
    task: ITask;
    stageId: number;
    onUpdate: (stage: IStage) => void;
}

const Task: React.FC<ITaskComp> = (props) => {
    const [checked, setChecked] = useState<boolean>(props.task.isChecked);
    const [errMsg, setErrMsg] = useState<string>('');

    const onCheck = () => {
        (async () => {
            try {
                const params = {
                    stageId: props.stageId,
                    taskId: props.task.id
                }
                const res = await http.post<IApiRes<IStage>>('/boost', { isChecked: !checked }, { params });

                if (res.status === 200) {
                    setChecked(!checked);
                    props.onUpdate(res.data.data);
                }
            } catch (err) {
                const error = err as AxiosError;
                setErrMsg(error.response?.data.message);
            }
        })()
    }

    useEffect(() => {
        document.addEventListener('click', () => setErrMsg(''));
        return () => {
            document.removeEventListener('click', () => setErrMsg(''));
        }
    }, [])

    return (
        <>
            <div onClick={onCheck} className="sb-boost__task">
                <div className={`sb-boost__check-box ${checked ? 'is-checked' : ''}`}>
                    <BsCheck className="sb-boost__check-box-icon" />
                </div>
                <div className="sb-boost__task-title">
                    {props.task.name}
                </div>
            </div>
            <div className={`sb-boost__task-err-wrap ${errMsg ? 'is-active' : ''}`}>
                {errMsg && (
                    <div className="sb-boost__task-err-message">{errMsg}</div>
                )}
            </div>
        </>
    )
}

export default Task;
