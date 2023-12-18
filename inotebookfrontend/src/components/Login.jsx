import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import alert from "./Alert";

function Login(props) {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({email: "", password: ""})
    const handleclick = async () => {
        try {
            const response = await axios.post(
                "http://localhost:5000/login",
                {
                    email: credentials.email,
                    password: credentials.password
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = await response.data;
            console.log(data)
            if (data.success) {
                props.showAlert("Logged in Successfully", "success" )
                localStorage.setItem("token", data.authToken)
                navigate('/')

            } else {
                props.showAlert("Invalid Credentials", "danger" )

            }


        } catch (error) {
            console.error("Error occurred:", error);
        }

    }
    const onchange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})

    }
    return (
        <div className={"my-3"}>
            <div className="mb-3">
                <label htmlFor="email" className="email">Email address</label>
                <input type="email" className="form-control" id="email" name={"email"} value={credentials.email}
                       onChange={onchange}
                       placeholder="name@example.com"/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="password">Password</label>
                <input type={"password"} className="form-control" id="password" name={"password"}
                       value={credentials.password}
                       onChange={onchange} placeholder="Password"/>
            </div>
            <button type={"submit"} className={"btn btn-primary"} onClick={handleclick}>Login</button>
        </div>
    );
}

export default Login;
