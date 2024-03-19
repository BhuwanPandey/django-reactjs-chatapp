
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";

export default function Cards(user) {
  return (
    <>
     <Card sx={{ maxWidth: 345 }} style={{padding:"10px",marginBottom:"20px"}}>
      <CardMedia
        component="img"
        alt={`${user.user.username}_image`}
        height="140"
        image={user.user.avatar}
        style={{borderRadius:"8px"}}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {user.user.username}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user.user.about}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/profile/${user.user.username}`}><Button size="small" variant="contained">View Profile</Button></Link>
        <Link to={`/chat/u/${user.user.public_id}`}><Button size="small" variant="contained">Message</Button></Link>
      </CardActions>
    </Card>
    </>
  );
}
