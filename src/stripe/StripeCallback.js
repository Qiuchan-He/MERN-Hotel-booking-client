import { useEffect } from "react";
import {LoadingOutlined} from "@ant-design/icons";
import {useSelector, useDispatch} from 'react-redux';
import { getAccountStatus } from "../actions/stripe.js";
import { updateUserInLocalStorage } from "../actions/auth.js";


const StripeCallback = ({history})=>{
    const {auth} = useSelector((state)=>({...state}))
    const dispatch = useDispatch();

    useEffect(()=>{
        if(auth && auth.token)
            accountStatus();
    },[])

    const accountStatus = async ()=>{
        try {
            const res = await getAccountStatus(auth.token);
            console.log("USER ACCOUNT STATUS ON STRIPE CALLBACK", res);
            updateUserInLocalStorage(res.data, ()=>{
                //update user in redux
                dispatch({
                    type:"LOGGED_IN_USER",
                    payload: res.data,
                })

                //redirect user to dashboard
                history.push("/dashboard/seller");
            })

        }catch (err) {
            console.log("STRIPE ",err);
        }
    }


    return (
        <div className="d-flex justify-content-center">
            <LoadingOutlined className="display-1 h1 p-5 text-danger"/>
        </div>)

}

export default StripeCallback;
