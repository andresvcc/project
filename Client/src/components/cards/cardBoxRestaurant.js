import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ScreenEditRestaurant from '../fullScreen/screenEditRestaurant'
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {
  card: {
    maxWidth: 345,
    minWidth:345, 
    maxHeight:400,
    minHeight:400,
    margin:'10px'
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
  info: {
    position:'relative', 
    bottom:'15px'
  }
};


function CardBoxRestaurant(props) {

  const { classes } = props;

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={props.photoName}
          className={classes.media}
          height="250px"
          image= {`http://localhost:4000/photo/${props.photoName}`}
          title={props.photoName}
        />
        <div style={{position:'relative', bottom:'1px', left:'5%'}}>
          <Typography gutterBottom variant="h5" component="h6">
            {props.title}
          </Typography>
        </div>
      </CardActionArea>
      <CardContent className={classes.info} >
        <Typography variant="subheading" component="p">
          {props.description}          
        </Typography>
        <Typography gutterBottom variant="subheading" component="h6">
         Tel: {props.tel}
        </Typography>
        <Typography gutterBottom variant="subheading" component="h6">
         Adresse: {props.adresse}
        </Typography>
        <Button className='btn' color='secondary' size="small" onClick={props.eliminerCLick} style={{position:'absolute', left:'80%',bottom:'-4%'}}>
          <DeleteIcon color='error'/>
        </Button>
        <div size="small" color="primary" style={{position:'absolute', left:'65%', bottom:'-4%'}}>
          <ScreenEditRestaurant
            title={props.title}
            description={props.description}
            adresse={props.adresse}
            tel={props.tel}
            quartier={props.quartier}
            photoName={props.photoName}
          />
        </div>
      </CardContent>
      <CardActions>

      </CardActions>
    </Card>
  );
}

CardBoxRestaurant.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardBoxRestaurant);