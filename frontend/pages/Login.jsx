import React from "react"
import { useLoaderData, useActionData, Form, redirect, useNavigation } from "react-router-dom"
import { loginUser } from "../api"

export function loader({request}){
    return new URL(request.url).searchParams.get("message")
}

export async function action({request}){
    const formData = await request.formData()
    const email = formData.get("email")
    const password = formData.get("password")
    const pathname = new URL(request.url).searchParams.get("redirectTo") || "/host"
    try{
        const data = await loginUser({email,password})
        localStorage.setItem("loggedin",true)
        const response = redirect(pathname)
        response.body = true
        return response 
    }
    catch(err){
        return err
    }
}

export default function Login() {
    const navigation = useNavigation()
    const errMessage = useActionData()
    const message = useLoaderData();
    

    return (
        <div className="login-container">
            <h1>Sign in to your account</h1>
            {message && <h2 className="red">{message}</h2> }
            {errMessage && <h2 className="red">{errMessage.message}</h2> }
            <Form 
                method="post" 
                className="login-form"
                replace>
                <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                />
                <button disabled={navigation.state==="submitting"}>
                    { navigation.state === "submitting" ?
                        "Logging in..." : "Log in"}
                </button>
            </Form>
        </div>
    )

}