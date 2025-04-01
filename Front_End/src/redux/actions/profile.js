import { server } from "../store";

import axios from "axios";


export const updateprofile = (name, email) =>async dispatch =>{
    try {
        dispatch({type: 'updateProfileRequest'});

        const {data} = await axios.put(
            `${server}/updateprofile`, {name, email}, {
            headers:{
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });

        dispatch({type: 'updateProfileSuccess', payload: data.message});
    } catch (error) {
        dispatch ({
            type: 'updateProfileFail',
            payload: error.response.data.message,
        });
    }
}


export const changePassword = (OldPassword, NewPassword) => async dispatch => {
    try {
        dispatch({ type: 'changePasswordRequest' });

        const { data } = await axios.put(
            `${server}/changepass` , { OldPassword, NewPassword }, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });

        dispatch({ type: 'changePasswordSuccess', payload: data.message });
    } catch (error) {
        dispatch({
            type: 'changePasswordFail',
            payload: error.response.data.message,
        });
    }
};

export const updatePPicture = (formdata) =>async dispatch =>{
    try {
        dispatch({type: 'updatePPRequest'});

        const {data} = await axios.put(
            `${server}/updatepp`, {formdata}, {
            headers:{
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
        });

        dispatch({type: 'updatePPSuccess', payload: data.message});
    } catch (error) {
        dispatch ({
            type: 'updatePPFail',
            payload: error.response.data.message,
        });
    }
}
