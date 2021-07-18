import axios, { AxiosResponse } from "axios";
import { IRandomFact } from "interfaces/random-fact.interface";

class RandomFactService {
    private _baseUrl = 'https://uselessfacts.jsph.pl/random.json?language=en';

    public getRandomFact(): Promise<AxiosResponse<IRandomFact>> {
        return axios.get<IRandomFact>(this._baseUrl);
    }
}

export default RandomFactService;
