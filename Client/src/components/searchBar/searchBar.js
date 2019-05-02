import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Badge from '@material-ui/core/Badge';
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
  menuButton: {
    position: 'relative',
    color:'white',
    marginLeft: -12,
    marginRight: 20,
    backgroundColor: "rgba(244,137,100,.3)"
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
    left:'-15%',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, .7),
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
    paddingTop: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 5,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
});

var style = {
    color:'#FFDACE',
    backgroundColor: "#FFDACE",
    borderTop: "2px solid #FFDECD",
    position: "fixed",
    left: "25%",
    right:'25%',
    top: "24.3%",
    zIndex:1,
    height: "auto",
    width: "50%",
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
          <div style={{paddingLesft:'20%',paddingRight:'20%'}}>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer" >
          <Badge badgeContent={4} color="secondary">
            <i className="material-icons" style={{fontSize:'36px'}}>
                shopping_cart
              </i>
          </Badge>
          </IconButton>
          </div>
          <div className={classes.grow} />

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
          <div style={{paddingLesft:'20%',paddingRight:'20%'}}>
          <div>
             <div className="form-row" style={{textAlign:'center'}}>
              <div className="col-sm-6">
                <p style={{color:'red'}}>Bio</p>
              </div>
              <div className="col-sm-6">
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