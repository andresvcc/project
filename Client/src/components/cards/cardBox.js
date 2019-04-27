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

const styles = {
  card: {
    maxWidth: 345,
    minWidth:345,
    
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
};

function CardBox(props) {
  const { classes } = props;

  return (
    <Card className={classes.card} style={{margin:'20px'}}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={props.photoName}
          className={classes.media}
          height="150px"
          image={props.photoName}
          title={props.photoName}
        />
        <CardContent>
        <div style={{position:'relative', top:'80%'}}>
          <Typography gutterBottom variant="h5" component="h6">
          
            {props.title}
          
          </Typography>
          <Typography component="p">
          {props.description}          
          </Typography>
          </div>
        </CardContent>
      </CardActionArea>
      <CardContent>
        <Typography gutterBottom variant="subheading" component="h6"  style={{marginBottom:'-30px'}} >
          Tel: {props.tel}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={props.voirClick}>
          Voir
        </Button>
        <Button color='secondary' size="small" onClick={props.eliminerCLick}>
          Eliminer
        </Button>
      </CardActions>
    </Card>
  );
}

CardBox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardBox);