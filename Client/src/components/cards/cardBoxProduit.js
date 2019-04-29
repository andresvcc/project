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
import FullVoir from '../forms/formfullVoirRestaurant'

const styles = {
  card: {
    maxWidth: 345,
    minWidth:345,
    
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover'
  },
};



function CardBoxProduit(props) {

  const { classes } = props;

  return (
    <Card className={classes.card} style={{margin:'18px', minHeight:'125px', maxHeight:'125px', minWidth:'40vw'}}>
       <div className="form-row">
          <div className="col">
          <CardActionArea style={{width:'100%'}}>
            <CardMedia
              component="img"
              alt={props.photoName}
              className={classes.media}
              height="150px"
              image= {`http://localhost:4000/photo/${props.photoName}`}
              title={props.photoName}
            />
          </CardActionArea>
          </div>
          <div className="col">
          <CardContent>
          <div style={{position:'absolute', top:'0%', left:'0%'}}>
            <Typography gutterBottom variant="h5" component="h6">
              {props.title}
            </Typography>
          </div>
          </CardContent>

          <CardContent>
            <Typography gutterBottom variant="subheading" component="h6"  style={{position:'relative', bottom:'15px'}} >
            {props.description}
            </Typography>
          </CardContent>
          </div>
      </div>
      <CardActions>
        <div size="small" color="primary" style={{position:'relative', bottom:'45px', left:'60%'}}>
          <FullVoir
            title={props.title}
            description={props.description}
            adresse={props.adresse}
            tel={props.tel}
            quartier={props.quartier}
            photoName={props.photoName}
          />
        </div>
        <Button color='secondary' size="small" onClick={props.eliminerCLick} style={{position:'relative', bottom:'45px', left:'60%'}}>
          Eliminer
        </Button>
      </CardActions>
    </Card>
  );
}

CardBoxProduit.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardBoxProduit);