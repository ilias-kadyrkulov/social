import axios from "axios";
import { getContentType } from "./api.helper";


const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: getContentType()
})

instance.interceptors