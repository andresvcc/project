import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 600,
    minWidth:600, 
    maxHeight:100,
    minHeight:100,
    margin:'10px'
  },
  info: {
    marginTop:'10px',
    position:'relative', 
    bottom:'15px'
  }
};

function CardBoxRestaurant(props) {
  function date() {

    var date =new Date(props.dateAchat);
    var ans = date.getFullYear();
    var Jours = date.getDate();
    var mois = (date.getMonth() + 1);
  
    if (Jours < 10)
        Jours = "0" + Jours;
  
    if (mois < 10)
        mois = "0" + mois;
  
    var dateFormat = ans + "/" + mois + "/" + Jours;
  
    var heures = date.getHours()
    var minutes = date.getMinutes()
    var secondes = date.getSeconds()
  
    if (heures < 10)
        heures = "0" + heures;
  
    if (minutes < 10)
        minutes = "0" + minutes;
  
    if (secondes < 10)
        secondes = "0" + secondes;
  
    return dateFormat + " à " + heures + ":" + minutes + ":" + secondes;
  
  }
  
  const { classes } = props;

  return (
    <Card className={classes.card}>
      <CardContent className={classes.info} >
      <div className="row">
        <div className="col-sm-3">
          <Typography gutterBottom variant="h6" component="h6">
              Id: {props.id}
          </Typography>
        </div>
        <div className="col-sm-9">
          <Typography variant="subheading" component="p">
            Date d'achat: {date()}          
          </Typography>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-9">
          <Typography gutterBottom variant="h6" component="h6">
          {props.total}.-CHF
          </Typography>
        </div>
        <div className="col-sm-3">
        
        </div>
      </div>
      </CardContent>
    </Card>
  );
}

CardBoxRestaurant.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardBoxRestaurant);