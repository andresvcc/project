import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import CardListProduitPannier from '../cards/cardListProduitPannier'

const styles = theme => ({
  root: {
    position:'fixed',
    width: '100%',
    background: 'linear-gradient(#FFF8F5, rgba(255,255,255,.999))',
    maxWidth: 550,
    paddingRigth:'20px',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
});


function AlignItemsList(props) {
  const { classes } = props;
  return (
    <List className={classes.root}>
        <h6> Pannier d'achat {props.surname}</h6>
        <CardListProduitPannier
            values = {props.values}
            eliminer = {props.eliminer}
        />
    </List>
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