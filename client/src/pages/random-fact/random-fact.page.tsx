import React, { useEffect, useState } from "react";
import './random-fact.scss';
import RandomFactService from "services/random-fact.service";
import { IRandomFact } from "interfaces/random-fact.interface";

const RandomFactPage: React.FC = () => {
    const [fact, setFact] = useState<IRandomFact>();

    useEffect(() => {
        (async () => {
            const randomFactService = new RandomFactService();
            const res = await randomFactService.getRandomFact();
            setFact(res.data);
        })()
    }, [])

    return (
        <div className="sb-fact">{fact?.text}</div>
    );
}

export default RandomFactPage;
