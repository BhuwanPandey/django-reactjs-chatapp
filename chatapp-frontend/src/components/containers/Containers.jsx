import { useEffect, useContext } from "react";
import axios from "axios";
import { Container, Grid, Typography } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import Cards from "./Cards";

function Containers() {
  const { baseUrl, users, token, dispatch } = useContext(AuthContext);
  const { onlineUsers: onlineuser } = useContext(ChatContext);
  const url = `${baseUrl}/auth/users/`;

  useEffect(() => {
    const fetchuser = async () => {
      try {
        const res = await axios.get(url, {
          headers: {
            Authorization: `Token ${token.key}`,
          },
        });
        dispatch({ type: "Users", payload: { users: res.data } });
      } catch (err) {
        console.log(err);
      }
    };
    fetchuser();
  }, [token]);

  return (
    <>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          align="center"
          style={{ padding: "20px", fontWeight: 700 }}
        >
          List of Users
        </Typography>
        <Grid container spacing={5} style={{ marginTop: "20px" }}>
          {onlineuser
            ? users.map((result, idx) => (
                <Grid item xs={12} ms={4} sm={4} key={idx}>
                  <Cards
                    user={result}
                    online={onlineuser.includes(result.username.toLowerCase())}
                  />
                </Grid>
              ))
            : users.map((result, idx) => (
                <Grid item xs={12} ms={4} sm={4} key={idx}>
                  <Cards user={result} online={false} />
                </Grid>
              ))}
        </Grid>
      </Container>
    </>
  );
}

export default Containers;
