import { useEffect, useRef } from 'react';
import { useGithubLoginMutation } from '../../services/authApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function GitHubCallback() {
    const [githubLogin] = useGithubLoginMutation();
    const navigate = useNavigate();
    const hasFetched = useRef(false);
    
    useEffect(() => {
        const handleGithubLogin = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');
            
            if (code && !hasFetched.current) { 
                hasFetched.current = true; 
                try {
                    const loginData = await githubLogin({ code }).unwrap();
                    if (loginData?.loginResponse?.token && loginData?.loginResponse?.refreshToken) {
                        localStorage.setItem('token', loginData.loginResponse.token);
                        localStorage.setItem('refreshToken', loginData.loginResponse.refreshToken);
                        localStorage.setItem("userId", loginData?.loginResponse?.user?._id)
                        toast.success("Login success")
                        navigate('/home'); 
                    }
                } catch (error) {
                    console.error('GitHub login failed:', error);
                }
            }
        };

        handleGithubLogin();
    }, [githubLogin, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center p-6 bg-white shadow-md rounded-lg">
            <p className="text-lg font-semibold text-gray-700">Processing GitHub login...</p>
            </div>
        </div>
    );
}

export default GitHubCallback;
