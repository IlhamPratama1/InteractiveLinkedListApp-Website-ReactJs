// Lib
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// Axios
import axiosInstance, { GetAccessToken } from "../../axios";
import { AuthAction } from "../../state/actions";
import { ActionType } from "../../state/action-types";

export default function OauthGoogleView() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let [searchParams] = useSearchParams();

    useEffect(() => {
        localStorage.setItem('access_token', searchParams.get('accessToken') as string);
		axiosInstance.defaults.headers.common['x-access-token'] = GetAccessToken();
        dispatch<AuthAction>({
            type : ActionType.LOGIN,
            payload : searchParams.get('accessToken') as string
        });
        navigate('/dashboard');
    }, [searchParams, dispatch, navigate]);

    return (
        <div></div>
    );
}