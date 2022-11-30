import nextConfig from "../next.config";
import axios from 'axios'
import React from "react";


export const logout = async () => {
    try {
        return await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/auth/logout/')
    } catch (e) {
        console.warn('Failed to log out')
        return false
    }
}

export const login = async (email: String, password: String) => {
    try {
        return await axios.post(
            nextConfig.env?.NEXT_PUBLIC_BACKEND_URL + '/api/auth/login/',
            {
                email,
                password
            },
        )
    } catch (e) {
        console.warn('Could not login')
        return false
    }
}

export const is_logged_in = async () => {
    try {
        return await axios.get(
            nextConfig.env?.NEXT_PUBLIC_BACKEND_URL + '/api/users/me/',
            {withCredentials: true}
        )
    } catch (e) {
        console.warn('Failed is logged in check')
        return false
    }
}
