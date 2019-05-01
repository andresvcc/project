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

const styles = theme => ({
  root: {
    width: '100%'
  },
  grow: {
    flexGrow: 3,
  },
  menuButton: {
    position: 'relative',
    color:'white',
    marginLeft: -12,
    marginRight: 20,
    backgroundColor: "rgba(244,137,100,.6)"
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
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, .7),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.9),
    },
    marginLeft: 0,
    marginRight:'0%',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
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
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
});

var style = {
    color:'#F48964',
    backgroundColor: "rgba(244,137,100,.35)",
    borderTop: "2px solid #FFDECD",
    position: "fixed",
    left: "0",
    top: "4.5%",
    zIndex:1,
    height: "80px",
    width: "100%",
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
          <div style={{padding:'40px'}}>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer" >
          <Badge badgeContent={4} color="secondary">
            <i className="material-icons" style={{fontSize:'48px'}}>
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
        </Toolbar>
      </AppBar>
    </div>
  );
}

SearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchAppBar);