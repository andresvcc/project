import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import AlertDialog from '../dialog/alertDialog'

const styles = {
  card: {
    margin:18, 
    minHeight:200, 
    maxHeight:200,
    minWidth: '100%',
    maxWidth: '100%',
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
    let res = props.description.length > 50 ? (
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
          <div className="col-5">
          <CardActionArea style={{width:'75%'}}>
            <CardMedia
              component="img"
              alt={props.photoName}
              className={classes.media}
              height="200px"
              image= {`http://localhost:4000/photo/${props.photoName}`}
              title={props.photoName}
            />
          </CardActionArea>
          </div>
          <div className="col-6" style={{left:'-10%'}}> 
            <CardContent>
            <div style={{position:'absolute', top:'5%'}}>
              <Typography gutterBottom variant="h6" component="h6"  style={{lineHeight:'20px'}}>
                {props.title}
              </Typography>
            </div>
            </CardContent>
            <CardContent style={{lineHeight:'20px', width:'100%'}}>
              <Typography gutterBottom variant="subheading" component="h6" style={{paddingTop:'0px'}}>
              {description()}
              </Typography>
            </CardContent>
          </div>
      </div>
      <Typography gutterBottom variant="subheading" component="h6" style={{lineHeight:'20px', position:'absolute', bottom:'25%', left:'35%'}}>
        {props.categorie} 
      </Typography>
      <Typography gutterBottom variant="h6" component="h6"  style={{lineHeight:'20px', position:'absolute', bottom:'1%', left:'35%', width:'30%', height:'20%'}}>
          {props.prixBase+'.-CHF'}
      </Typography>
      <Button color='secondary' size="small" onClick={props.eliminerCLick} style={{position:'absolute', bottom:'1%', right:'2%', width:'10%', height:'20%'}}>
          <DeleteIcon color='error'/>
      </Button>
    </Card>
  );
}

CardBoxProduit.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardBoxProduit);