import { server } from "../store";

import axios from "axios";


export const login = (email, password)=>async(dispatch)=>{
    try{
        dispatch({type: "loginRequest"});

        const {data} = await axios.post(`${server}/login`, {email, password},{
            headers:{
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
        dispatch({type: "loginSuccess", payload: data});

    }catch(err){
        dispatch({type: "loginFail", payload: err.response.data.message});
    }
}


export const getMyProfile = ()=>async(dispatch)=>{
    try{
        dispatch({type: "loadUserRequest"});

        const {data} = await axios.get(`${server}/profile`,{
            withCredentials: true,
        });
        dispatch({type: "loadUserSuccess", 
            payload: data.user});

    }catch(err){
        dispatch({type: "loadUserFail", payload: err.response.data.message});
    }
}

export const logout = ()=>async(dispatch)=>{
    try{
        dispatch({type: "logoutRequest"});

        const {data} = await axios.get(`${server}/logout`,{
            withCredentials: true,
        });
        dispatch({type: "logoutSuccess", payload: data.message});

    }catch(err){
        dispatch({type: "logoutFail", payload: err.response.data.message});
    }
}

export const signup = (formdata)=>async(dispatch)=>{
    try{
        dispatch({type: "signupRequest"});

        const {data} = await axios.post(`${server}/signup`, formdata,{
            headers:{
                "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
        });
        dispatch({type: "signupSuccess", payload: data});

    }catch(err){
        dispatch({type: "signupFail", payload: err.response.data.message});
    }
}