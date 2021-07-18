import React, { useState } from "react";
import http from 'services/http.service';
import { IApiRes } from "interfaces/api-response.interface";
import { useHistory } from "react-router";
import './login.scss';

const LoginPage: React.FC = () => {
    const history = useHistory();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const login = async () => {
        const res = await http.post<IApiRes<void>>('/login', { email, password });
        if (res.status === 200) {
            history.push('/boost')
        }
    }

    return (
        <div>
            <input onChange={(e) => setEmail(e.target.value)} value={email} />
            <input onChange={(e) => setPassword(e.target.value)} value={password} />
            <button onClick={login}>Login</button>
        </div>);
}

export default LoginPage;
