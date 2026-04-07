import { Redirect, router } from "expo-router";
import { JSX } from "react";

import { useEffect } from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../config'

const Index = ():JSX.Element => {
    useEffect(()=>{
        // 既にログイン済であればメモ画面に遷移
        onAuthStateChanged(auth, (user)=>{
            if (user !== null ) {
                router.replace('memo/list')
            }
        })
    },[])


    return <Redirect href='auth/log_in'/>
}

export default Index
