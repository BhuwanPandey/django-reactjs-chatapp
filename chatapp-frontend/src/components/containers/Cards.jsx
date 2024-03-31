import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function Cards(props) {
  const user = props.user;
  const onlineStatus = props.online;

  const username = user.username[0].toUpperCase() + user.username.slice(1);
  return (
    <>
      <Card
        sx={{ maxWidth: 250 }}
        style={{
          padding: "10px",
          marginBottom: "20px",
          height: "320px",
          borderRadius: "10px",
        }}
      >
        <CardMedia
          component="img"
          alt={`${user.username}_image`}
          height="160"
          image={
            user.avatar
              ? user.avatar
              : `https://i.pravatar.cc/300?img=${user.id}`
          }
          style={{ borderRadius: "8px", objectFit: "fill" }}
        />
        <CardContent style={{ height: "95px" }}>
          <Typography gutterBottom variant="h5" component="div">
            {username}{" "}
            {onlineStatus ? (
              <span style={{ color: "green", fontSize: "15px" }}>(Online)</span>
            ) : (
              <span style={{ fontSize: "15px" }}>(offline)</span>
            )}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {(user.about.length > 50
              ? user.about.substring(0, 50) + "..."
              : user.about) || (
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            )}
          </Typography>
        </CardContent>
        <CardActions>
          <Link to={`/profile/${user.username}`}>
            <Button size="small" variant="contained">
              Profile
            </Button>
          </Link>
          <Link to={`/chat/user/${user.public_id}`}>
            <Button size="small" variant="contained">
              Message
            </Button>
          </Link>
        </CardActions>
      </Card>
    </>
  );
}
