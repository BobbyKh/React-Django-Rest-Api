import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

function Form({route , method}) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const HandleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post(route, {
                username,
                password
            });
            if (res.status !== 200) {
                setError(res.data.detail);
                return;
            }
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/home");
            }
        } catch (error) {
            // The error.response object is not present if the request was not made with axios, or if the browser blocked the request due to CORS policy.
            // The error.message is the error message from the server, which is set in the backend code.
            // The error.response.data is the data returned from the server, which is set in the backend code.
            setError(error.response ? error.response.data.detail : error.message);
        }
    };

    return (
        <form onSubmit={HandleSubmit} className="form-container">
            <h1>{name}</h1>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
            />
            <h2>password</h2>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
            />
            <button className="form-button" type="submit">
                {name}
            </button>
            <div style={{ color: "red" }}>{error}</div>
        </form>
    );
}

export default Form;

