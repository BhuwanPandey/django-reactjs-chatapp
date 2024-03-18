import axios from "axios";

export const get_message = async(baseUrl,token) =>{
    const res = await axios.get(baseUrl,{
        headers:{
        "Authorization":`Token ${token}`
        }
    })
    return res
}
