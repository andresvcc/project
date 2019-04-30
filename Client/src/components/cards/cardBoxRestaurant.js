import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 400,
    minWidth:400, 
    maxHeight:460,
    minHeight:460,
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


const click =()=>{
  console.log('aqui click')
}

function CardBoxRestaurant(props) {



  const { classes } = props;

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={click}>
        <CardMedia
          component="img"
          alt={props.photoName}
          className={classes.media}
          height="250px"
          image= {`http://localhost:4000/photo/${props.photoName}`}
          title={props.photoName}
        />
        <div className='col-md-10' style={{textAlign:'center'}}>
          <Typography gutterBottom variant="h5" component="h6">
            {props.title}
          </Typography>
        </div>
      </CardActionArea>
      <CardContent className={classes.info} >
        <Typography variant="subheading" component="p">
          {props.description}          
        </Typography>
        <Typography gutterBottom variant="subheading" component="p">
         Tel: {props.tel}
        </Typography>
        <Typography gutterBottom variant="subheading" component="p">
         Adresse: {props.adresse}
        </Typography>
      </CardContent>
    </Card>
  );
}

CardBoxRestaurant.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardBoxRestaurant);