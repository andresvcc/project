import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root1: {
    position:'fixed',
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    zIndex:1
  },
  image: {
    position: 'relative',
    height: 102,
    [theme.breakpoints.down('xs')]: {
      width: '100%', // Overrides inline-style
      height: 120,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'relative',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
  },
  imageMarked: {
    maxheight: 3,
    maxwidth: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
});

const images = [
  {
    url: 'http://localhost:4000/photo/1557264832543-2972.jpeg',
    title: 'meilleurs Prix',
    width: '25%',
  },
  {
    url: 'http://localhost:4000/photo/1557266026728-8372.jpeg',
    title: 'Dans mon quartier',
    width: '25%',
  },
  {
    url: 'http://localhost:4000/photo/1557265109509-5866.jpeg',
    title: 'Top meilleures ventes',
    width: '25%',
  },
  {
    url: 'http://localhost:4000/photo/1557267869035-4076.jpeg',
    title: 'Nouveautes',
    width: '25%',
  },
];

function BarnerBar(props) {
  const { classes } = props;

  return (
    <div className={classes.root1}>
      {images.map(image => (
        <ButtonBase
          focusRipple
          key={image.title}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          style={{
            width: image.width,
          }}
        >
          <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${image.url})`,
            }}
          />
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
            <Typography
              component="span"
              variant="h6"
              color="inherit"
              className={classes.imageTitle}
            >
              {image.title}
              <span className={classes.imageMarked} />
            </Typography>
          </span>
        </ButtonBase>
      ))}
    </div>
  );
}

BarnerBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BarnerBar);