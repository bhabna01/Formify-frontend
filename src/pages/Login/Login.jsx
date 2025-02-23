import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const Login = () => {
    // const [disabled, setDisabled] = useState(true);
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure(); 
    const from = location.state?.from?.pathname || "/";

    // const handleLogin = event => {
    //     event.preventDefault();
    //     const form = event.target;
    //     const email = form.email.value;
    //     const password = form.password.value;
    //     console.log(email, password);
    //     signIn(email, password)
    //         .then(result => {
    //             const user = result.user;
    //             console.log(user);
    //             Swal.fire({
    //                 title: 'User Login Successful.',
    //                 showClass: {
    //                     popup: 'animate__animated animate__fadeInDown'
    //                 },
    //                 hideClass: {
    //                     popup: 'animate__animated animate__fadeOutUp'
    //                 }
    //             });
    //             navigate(from, { replace: true });
    //         })
    // }
    const handleLogin = async (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        try {
            // Firebase authentication
            const result = await signIn(email, password);
            const user = result.user;

            // Fetch user data securely from backend
            const { data: userData } = await axiosSecure.get(`/users/email/${email}`);

            if (userData.is_blocked) {
                Swal.fire({
                    icon: "error",
                    title: "Account Blocked",
                    text: "Your account has been blocked. Please contact support.",
                });
                return; // Stop login process
            }

            // Successful login
            Swal.fire({
                title: "User Login Successful.",
                icon: "success",
                showClass: {
                    popup: "animate__animated animate__fadeInDown",
                },
                hideClass: {
                    popup: "animate__animated animate__fadeOutUp",
                },
            });

            navigate(from, { replace: true });

        } catch (error) {
            console.error("Login Error:", error);
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: error.response?.data?.message || "Something went wrong!",
            });
        }
    };
    

    return (
        <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col md:flex-row-reverse">
                    <div className="text-center md:w-1/2 lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Sign in to access your account and manage your templates easily. Secure and seamless experience awaits!</p>
                    </div>
                    <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Login" />
                            </div>
                        </form>
                        <p className="p-3.5"><small>New Here? <Link to="/signup" className="text-blue-700">Create an account</Link> </small></p>
                    </div>
                </div>
            </div>
    );
};

export default Login;