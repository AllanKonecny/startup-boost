import React, { useEffect, useState } from "react";
import './boost.scss';
import http from 'services/http.service';
import { IStage } from "interfaces/stage.interface";
import { IApiRes } from "interfaces/api-response.interface";
import Stage from "./stage.component";

const BoostPage: React.FC = () => {
    const [stages, setStages] = useState<IStage[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await http.get<IApiRes<IStage[]>>('/boost');
                setStages(res.data.data);
            } catch (e) {
                console.error(e);
            }
        })()
    }, []);

    return (
        <div className="sb-boost">
            <div className="sb-boost__header">My startup progress</div>
            {stages?.map((stage, index) => (
                <Stage key={stage.id} index={index} stage={stage} />
            ))}
        </div>
    )
}

export default BoostPage;
