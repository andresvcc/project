import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import CheckBox from '../forms/checkBox'


const styles = theme => ({
  root: {
    width: '100%',
    zIndex:2,
    position:'relative',

  },
  grow: {
    flexGrow: 3,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    right:'20%',
    left:'0%',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.8),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.9),
    },
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: '100%',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 4,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: '#814835',
    width: '100%',
  },
  inputInput: {
    position:'relative',
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 5,
    width: '100%',
  },
});

var style = {
    color:'#FFDACE',
    backgroundColor: "#FFDACE",
    borderTop: "1px solid #FFDECD",
    position: "fixed",
    left: "35%",
    right:'35%',
    top: "18%",
    zIndex:1,
    height: 'auto',
    width: "30%",
  }

function SearchAppBar(props) {
  const { classes } = props;

  const updateSearchInput = (evt) => {
    props.action(evt.target.value)
  }

  const keyPress = (evt)=> {
    if(evt.keyCode === 13){
      props.keyDawEnter(evt.target.value);
    }
 }

  return (
    <div className={classes.root} >
      <AppBar position="static" style={style}>
        <Toolbar>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Chercher des plats..."
              onChange={updateSearchInput}
              onKeyDown={keyPress}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div>
          <div>
          <div style={{paddingLeft:'20px'}}>
             <div className="form-row" style={{textAlign:'center'}}>
              <div className="col-sm-5">
                <p style={{color:'red'}}>Bio</p>
              </div>
              <div className="col-sm-1">
                <CheckBox
                  label = 'Bio?'
                  into = {props.bioState}
                  back = {props.bio}
                  >
                </CheckBox>               
              </div>
            </div>
          </div> 
        </div>
        </Toolbar>
      </AppBar>
      
    </div>
  );
}

SearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchAppBar);