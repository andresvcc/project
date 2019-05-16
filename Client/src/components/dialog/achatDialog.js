import React from 'react';
import axios from 'axios'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CardMedia from '@material-ui/core/CardMedia';

class AchatDialog extends React.Component {
  state = {
    open: false,
    open2:false,
    quantite:1,
    quantite2:1,
    recommande:{nom:'', photoName:''}
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.action(this.state.quantite)
  };

  handleClose2 = () => {
    this.setState({ open2: false });
    this.props.recomendation(this.state.recommande ,this.state.quantite2)
  };

  handleCloseAnuler = () =>{
    this.setState({ open: false });
  }

  handleCloseAnuler2 = () =>{
    this.setState({ open2: false });
  }

  plus = () =>{
    let quantite = this.state.quantite + 1
    this.setState({quantite:quantite});
  }

  moins = () =>{

    let quantite = this.state.quantite > 1 ?  this.state.quantite - 1 : this.state.quantite
    this.setState({quantite:quantite});
  }

  plus2 = () =>{
    let quantite2 = this.state.quantite2 + 1
    this.setState({quantite2:quantite2});
  }

  moins2 = () =>{

    let quantite2 = this.state.quantite2 > 1 ?  this.state.quantite2 - 1 : this.state.quantite2
    this.setState({quantite2:quantite2});
  }

  onRecommandation = () =>{

    let data = {
      nom: this.props.title
    }
    
    axios.post(`http://localhost:4000/recommandation`, data )
    .then(res => {
        
        let ok = res.data.ok & res.data.response[0] !== undefined ? (
            this.setState({recommande:res.data.response[0]}),
            this.handleClose(),
            true 
        ): false

        console.log('recommande',ok.toString())
        ok ?   this.setState({ open2: true }) : this.handleClose()
    })
    .catch(err => { // then print response status
        console.log(err)
    })
  }

  render() {
    return (
      <div>
        <Button size="small" onClick={this.handleClickOpen}  style={{height:'75px'}}>
          <div style={{textAlign:'center'}}>
            <i className="material-icons " style={{fontSize: '36px', color:'#FB8C00'}}> add_shopping_cart</i>
            <p >Ajouter</p>
          </div>
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleCloseAnuler}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
          <DialogContent>
          <div className="row">
            <div className="col-md-6">
              <CardMedia
                    style={{objectFit: 'cover', width: "100%"}}
                    component="img"
                    alt={this.props.image}
                    height="180px"
                    image= {this.props.image}
                    title={this.props.title}
                  />
            </div>
            <div className="col-md-6">
                <div className="row">
                  <div className="col-sm-3" style={{margin:'10px'}}>
                  <Button onClick={this.moins} color="default" autoFocus>
                    <h1>-</h1>
                  </Button>
                  </div>
                  <div className="col-sm-3" style={{margin:'10px', textAlign:'center'}} >
                  <h1>{this.state.quantite}</h1>
                  </div>
                  <div className="col-sm-3" style={{margin:'10px'}}>
                  <Button onClick={this.plus} color="default" autoFocus>
                  <h1>+</h1>
                  </Button>
                  </div>
                </div>
            </div>
          </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseAnuler} color="default" autoFocus>
              Anuler
            </Button>
            <Button onClick={this.onRecommandation} color="primary" autoFocus>
              Ajouter au Panier
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={this.state.open2}
          onClose={this.handleCloseAnuler2}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            La plupart des acheteurs qui ont acheté 
            <span style={{color:'red'}}>{' '+this.props.title+' '}</span> 
            ont aussi acheté  
            <span style={{color:'red'}}>{' '+this.state.recommande.nom+' '}</span>
          </DialogTitle>
          <DialogContent>
          <div className="row">
            <div className="col-md-6">
              <CardMedia
                    style={{objectFit: 'cover', width: "100%"}}
                    component="img"
                    alt={`http://localhost:4000/photo/${this.state.recommande.photoName}`}
                    height="180px"
                    image= {`http://localhost:4000/photo/${this.state.recommande.photoName}`}
                    title={this.props.title}
                  />
            </div>
            <div className="col-md-6">
                <div className="row">
                  <div className="col-sm-3" style={{margin:'10px'}}>
                  <Button onClick={this.moins2} color="default" autoFocus>
                    <h1>-</h1>
                  </Button>
                  </div>
                  <div className="col-sm-3" style={{margin:'10px', textAlign:'center'}} >
                  <h1>{this.state.quantite2}</h1>
                  </div>
                  <div className="col-sm-3" style={{margin:'10px'}}>
                  <Button onClick={this.plus2} color="default" autoFocus>
                  <h1>+</h1>
                  </Button>
                  </div>
                </div>
            </div>
          </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseAnuler2} color="default" autoFocus>
              Anuler
            </Button>
            <Button onClick={this.handleClose2} color="primary" autoFocus>
              Ajouter au Panier
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AchatDialog;