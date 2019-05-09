import React from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AlertDialog from '../dialog/alertDialog'


const styles = {
  card: {
    margin:18, 
    minHeight:190, 
    maxHeight:190,
    minWidth: '120%',
    maxWidth: '120%',
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
        width="40%" 
        style={{
          position:'absolute', 
          right:'27%', 
          top:'20%',
          opacity:'0.175'
        }}>
      </img> 
    </div>): ''
    return res
  }


  const description = ()=>{
    let photo = `http://localhost:4000/photo/${props.photoName}`
    let smallDescription = (props.description).slice(0,45)
    let res = props.description.length > 45 ? (
      <AlertDialog
      label='lire plus'
      title={props.title}
      contenue={props.description}
      smallContenue={smallDescription}
      image={photo}/>
    ):(
      <p>{smallDescription}</p>
    ) 

    return (
          <div style={{lineHeight:'12px'}}>
            {res}
          </div>
    )
  }

  const { classes } = props;

  return (
    <Card className={classes.card} >
    {bio()}
       <div className="form-row">
          <div className="col-5" style={{width:'100%'}}>
            <CardMedia
              component="img"
              alt={props.photoName}
              className={classes.media}
              height="190px"
              image= {`http://localhost:4000/photo/${props.photoName}`}
              title={props.photoName}
            />
          </div>
          <div className="col-7"> 
            <CardContent>
            <div style={{position:'absolute', top:'5%', left:'5%' }}>
              <Typography gutterBottom variant="h6" component="h6"  style={{lineHeight:'20px'}}>
                {props.title}
              </Typography>
            </div>
            </CardContent>
            <CardContent style={{lineHeight:'20px'}}>
              <Typography gutterBottom variant="subheading" component="h6" style={{paddingTop:'0px'}}>
              {description()}
              </Typography>
            </CardContent>
          </div>
      </div>
      <Typography gutterBottom variant="subheading" component="h6" style={{lineHeight:'20px', position:'absolute', bottom:'25%', left:'45%'}}>
        {props.categorie} 
      </Typography>
      <Typography gutterBottom variant="h6" component="h6"  style={{lineHeight:'20px', position:'absolute', bottom:'1%', left:'45%', width:'10%', height:'20%'}}>
          {props.prixBase+'.-CHF'}
      </Typography>
      <div style={{textAlign:'center', position:'absolute', bottom:'28%', right:'5%', width:'20%', height:'20%'}}>
        <Button size="small" onClick={props.addShoppingCart}  style={{height:'75px'}}>
          <div style={{textAlign:'center'}}>
            <i className="material-icons " style={{fontSize: '36px', color:'#FB8C00'}}> add_shopping_cart</i>
            <p >Ajouter</p>
          </div>
        </Button>
      </div>
    </Card>
  );
}

const mapStateToProps = (state) => {

  return {
    count: state.counter.count,
    loginStatus: state.counter.loginStatus,
    typeUser: state.counter.typeUser,
    surname: state.counter.surname,
    sessID: state.counter.sessID
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

CardBoxProduit.propTypes = {
classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps) (CardBoxProduit));