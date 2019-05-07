import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import CardListProduitPannier from '../cards/cardListProduitPannier'

const styles = theme => ({
    root: {
      width: '100%',
      maxWidth: 500,
      backgroundColor: '#FFF8F5',
      overflow: 'auto',
      maxHeight: 280,
    },
    listSection: {
      backgroundColor: 'inherit',
    },
    ul: {
      backgroundColor: 'inherit',
      padding: 0,
    },
  });


function AlignItemsList(props) {
  const { classes } = props;
  return (
    <div style={{position:'fixed', backgroundColor: '#FFF8F5', zIndex:3, textAlign:'center'}}>
        <h5> Panier d'achat de {props.surname}</h5>
        <List className={classes.root} subheader={<li />}>
            <CardListProduitPannier
                values = {props.values}
                eliminer = {props.eliminer}
            />
        </List>
        <button type="button" className="btn btn-success btn-block" onClick={console.log('payer pannier')}>Payer</button>
    </div>
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

AlignItemsList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps) (AlignItemsList));