import React from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    margin:18, 
    minHeight:75, 
    maxHeight:75,
    minWidth: '90%',
    maxWidth: '90%',
    position:'relative',


    
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
    width: "100%"
  }
};




function CardBoxProduit(props) {

  const bio = () =>{
    let res = props.bio === 1 ? (
    <div>
      <img 
        src="https://carpezen.fr/wp-content/uploads/2018/09/logo-bio.png" 
        alt="Smiley face" 
        height="100%" 
        width="35%" 
        style={{
          position:'absolute', 
          right:'40%', 
          top:'20%',
          opacity:'0.175'
        }}>
      </img> 
    </div>): ''
    return res
  }

  const { classes } = props;
  return (
    <Card className={classes.card} >
    {bio()}
       <div className="form-row">
          <div className="col-5">
          <CardActionArea style={{width:'75%'}}>
            <CardMedia
              component="img"
              alt={props.photoName}
              className={classes.media}
              height="80px"
              image= {`http://localhost:4000/photo/${props.photoName}`}
              title={props.photoName}
            />
          </CardActionArea>
          </div>
          <div className="col-6" style={{left:'-15%'}}> 
            <CardContent>
            <div style={{position:'absolute', top:'5%'}}>
              <Typography gutterBottom variant='subtitle1' component="h6"  style={{lineHeight:'20px'}}>
                {props.title.slice(0,23)}
              </Typography>
            </div>
            </CardContent>
          </div>
      </div>
      <Typography gutterBottom variant="h6" component="h6" style={{textAlign:'center',background:'red',color:'white', position:'absolute', bottom:'2%', left:'2%', width:'10%', height:'34%'}}>
        {`X ${props.quantite}`} 
      </Typography>
      <Typography gutterBottom variant='subtitle2' component="h6"  style={{lineHeight:'20px', position:'absolute', bottom:'35%', left:'35%', width:'45%', height:'20%'}}>
          {'PrixBase :'+props.prixBase+'.-CHF'}<br></br>
          {'Total :'+props.prixTotal+'.-CHF'}
      </Typography>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    count: state.counter.count,
    loginStatus: state.counter.loginStatus,
    typeUser: state.counter.typeUser,
    surname: state.counter.surname,
    sessID: state.counter.sessID,
    produitPanier: state.counter.produitPanier
  }
}

CardBoxProduit.propTypes = {
classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps) (CardBoxProduit));