import { useEffect, useContext, useState } from "react";
import Cards from "./Cards";
import axios from "axios";
import { Container,Grid,Typography } from "@mui/material";
import { AuthContext } from "../context/AuthContext";

function Containers() {
    const [users,setUser] = useState([]);
    const { token } = useContext(AuthContext);
    const url = "http://127.0.0.1:8000/auth/users/"


    useEffect(()=>{
        const fetchuser = async () =>{
        try{
            const res = await axios.get(url,{
                headers:{
                    "Authorization":`Token ${token.key}`
                }
            });
            setUser(res.data);
        }catch(err){
            console.log(err);
        }
        };
        fetchuser()
    },[token])

    return (
        <>
    <Container maxWidth="lg">
        <Typography variant="h4" align="center" style={{marginTop:"50px"}}>
            List of Users
        </Typography>
        <Grid container spacing={5} style={{marginTop:"20px"}}>
            {users.map((result,idx) => (
                <Grid item xs={12} ms={4} sm={4}>
                    <Cards user={result}  key={idx}/>
                </Grid>
            ))}
        </Grid>
    </Container>

        </>
    )
}

export default Containers
