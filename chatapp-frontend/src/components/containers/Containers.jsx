import { useEffect, useContext } from "react";
import Cards from "./Cards";
import axios from "axios";
import { Container, Grid, Typography } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";

function Containers() {
  const { users, token, dispatch, baseUrl } = useContext(AuthContext);
  const url = `${baseUrl}/auth/users/`;

  useEffect(() => {
    const fetchuser = async () => {
      try {
        const res = await axios.get(url, {
          headers: {
            Authorization: `Token ${token.key}`,
          },
        });
        // setUser(res.data);
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
        <Typography variant="h4" align="center" style={{ marginTop: "50px" }}>
          List of Users
        </Typography>
        <Grid container spacing={5} style={{ marginTop: "20px" }}>
          {users.map((result, idx) => (
            <Grid item xs={12} ms={4} sm={4} key={idx}>
              <Cards user={result} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default Containers;
