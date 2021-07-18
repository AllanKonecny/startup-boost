import React, { useCallback, useEffect, useState } from "react";
import './boost.scss';
import http from 'services/http.service';
import { IStage } from "interfaces/stage.interface";
import { IApiRes } from "interfaces/api-response.interface";
import Stage from "./stage.component";
import { useHistory } from "react-router";

const BoostPage: React.FC = () => {
    const history = useHistory();
    const [stages, setStages] = useState<IStage[]>();

    const getData = useCallback(() => {
        (async () => {
            try {
                const res = await http.get<IApiRes<IStage[]>>('/boost');
                setStages(res.data.data);
                if (res.data.data.every(s => s.isComplete)) {
                    history.push('/random-fact');
                }
            } catch (e) {
                console.error(e);
            }
        })()
    }, [history])

    useEffect(() => {
        getData();
    }, [getData]);

    const onStageUpdated = (): void => {
        getData();
    }

    return (
        <div className="sb-boost">
            <div className="sb-boost__header">My startup progress</div>
            {stages?.map((stage, index) => (
                <Stage key={stage.id} index={index} stage={stage} onStageUpdated={onStageUpdated} />
            ))}
        </div>
    )
}

export default BoostPage;
