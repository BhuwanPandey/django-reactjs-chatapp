import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function Cards(user) {
  const username =
    user.user.username[0].toUpperCase() + user.user.username.slice(1);

  return (
    <>
      <Card
        sx={{ maxWidth: 345 }}
        style={{ padding: "10px", marginBottom: "20px" }}
      >
        <CardMedia
          component="img"
          alt={`${user.user.username}_image`}
          height="140"
          image={
            user.user.avatar
              ? user.user.avatar
              : `https://i.pravatar.cc/300?img=${user.user.username.length}`
          }
          style={{ borderRadius: "8px", objectFit: "fill" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.user.about || (
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s,
              </p>
            )}
          </Typography>
        </CardContent>
        <CardActions>
          <Link to={`/profile/${user.user.username}`}>
            <Button size="small" variant="contained">
              View Profile
            </Button>
          </Link>
          <Link to={`/chat/user/${user.user.public_id}`}>
            <Button size="small" variant="contained">
              Message
            </Button>
          </Link>
        </CardActions>
      </Card>
    </>
  );
}
