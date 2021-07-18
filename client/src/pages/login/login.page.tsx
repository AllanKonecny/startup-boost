import React, { useState } from "react";
import http from 'services/http.service';
import { IApiRes } from "interfaces/api-response.interface";
import { useHistory } from "react-router";
import './login.scss';
import { AxiosError } from "axios";

const LoginPage: React.FC = () => {
    const history = useHistory();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errMsg, setErrMsg] = useState<string>('');

    const login = async () => {
        try {
            const res = await http.post<IApiRes<void>>('/login', { email, password });
            if (res.status === 200) {
                history.push('/boost')
            }
        } catch (err) {
            const error = err as AxiosError;
            setErrMsg(error.response?.data.message);
        }
    }

    return (
        <div className="sb-login">
            <div className="sb-login__wrap">
                <input
                    className="sb-login__input"
                    placeholder="email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email} />
                <input
                    className="sb-login__input"
                    placeholder="password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password} />
                <button className="sb-login__button" onClick={login}>Login</button>
            </div>
            <div className={`sb-login__error-msg-wrap ${errMsg ? 'is-active' : ''}`}>
                {errMsg && <div className="sb-login__error-msg">{errMsg}</div>}
            </div>
        </div>);
}

export default LoginPage;
