import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

function Signup() {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword:""})
    const handleclick = async () => {

        if (credentials.password !== credentials.cpassword) {
            console.log("Passwords do not match");
            return;
        }
        try {
            const response = await axios.post(
                "http://localhost:5000/signup",
                {
                    name: credentials.name,
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
                localStorage.setItem("token", data.authToken)
                navigate('/')
            } else {

            }


        } catch (error) {
            console.error("Error occurred:", error);
        }

    }
    const onchange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})

    }
    return (
        <div>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="email" className="form-control" id="name" name={"name"} value={credentials.name}
                       onChange={onchange} placeholder="Name"/>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name={"email"} value={credentials.email}
                       onChange={onchange} placeholder="name@example.com"/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type={"password"} className="form-control" id="password" name={"password"}
                       value={credentials.password} onChange={onchange} placeholder="Password"/>
            </div>
            <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">Password</label>
                <input type={"password"} className="form-control" id="cpassword" name={"cpassword"}
                       value={credentials.cpassword} onChange={onchange} placeholder="Confirm Password"/>
            </div>
            <button type={"submit"} className={"btn btn-primary"} onClick={handleclick}>signup</button>
        </div>
    );
}

export default Signup;
