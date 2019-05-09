import React from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import AlertDialog from '../dialog/alertDialog'
import {updatePanier} from '../../actions/index'

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

  const panierListUpdate = () =>{
    let data = {
      id: props.sessID
    }
    axios.post(`http://localhost:4000/listPanier`, data )
    .then(res => {
        console.log(res.data)
        let ok = res.data.ok ? (
            props.ajouterPanier(res.data.response),
            true 
        ):(
            false
        )
        ok ?   console.log('UPDATE PANIER ok') : console.log('UPDATE PANIER problem')
    })
    .catch(err => { // then print response status
        console.log(err)
    })
  }


  const description = ()=>{
    let photo = `http://localhost:4000/photo/${props.photoName}`
    let res =
      <AlertDialog
        label='lire plus'
        title={props.title}
        contenue={props.description}
        smallContenue={''}
        image={photo}/>
    return (
          <div style={{lineHeight:'12px'}}>
            {res}
          </div>
    )
  }

  const eliminerClik=()=>{
    let data = {
      id: props.sessID,
      produit:props.title,
      restaurant:props.restaurant
    }
    axios.post(`http://localhost:4000/delProduitPanier`, data )
    .then(res => {
        console.log(res.data)
        let ok = res.data.ok ? (
            panierListUpdate(),
            true 
        ):(
            false
        )
        ok ?   console.log('DEL PANIER ok') : console.log('DEL PANIER problem')
    })
    .catch(err => { // then print response status
        console.log(err)
    })
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
            <CardContent style={{lineHeight:'20px'}}>
              <Typography gutterBottom variant="subheading" component="h6" style={{paddingTop:'0px', width:'100%'}}>
              
              </Typography>
            </CardContent>
          </div>
      </div>
      <Typography gutterBottom variant="subheading" component="h6" style={{lineHeight:'20px', position:'absolute', bottom:'25%', left:'35%'}}>
        {props.categorie} 
      </Typography>
      <Typography gutterBottom variant="h6" component="h6" style={{textAlign:'center',background:'red',color:'white', position:'absolute', bottom:'2%', left:'2%', width:'10%', height:'34%'}}>
        {`X ${props.quantite}`} 
      </Typography>
      <Typography gutterBottom variant='subtitle2' component="h6"  style={{lineHeight:'20px', position:'absolute', bottom:'35%', left:'25%', width:'45%', height:'20%'}}>
          {'PrixBase :'+props.prixBase+'.-CHF'}<br></br>
          {'Total :'+props.prixTotal+'.-CHF'}
      </Typography>
      <div style={{position:'absolute', bottom:'30%', right:'2%'}}>
      {description()}
      </div>
      <Button color='secondary' size="small" onClick={eliminerClik} style={{position:'absolute', bottom:'8%', right:'2%', width:'10%', height:'45%'}}>
          <DeleteIcon color='error'/>
      </Button>
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

const mapDispatchToProps = (dispatch) => {
  return {
    ajouterPanier: (panierList) => {  
      dispatch(updatePanier(panierList))
    },
  }
}

CardBoxProduit.propTypes = {
classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps) (CardBoxProduit));