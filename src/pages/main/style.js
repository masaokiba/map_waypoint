import makeStyles from '@material-ui/styles/makeStyles';

export default makeStyles(theme => ({
  screen: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },

  map: {
    position: 'absolute',
    width: '100%',
    height: 'calc(100vh - 15em)'
  },

  mapToolBar: {
    zIndex: 1,
    display: 'flex',
    top: '2em',
    margin: '2em 1em auto',
    
    '& div:first-child': {
      opacity: '.9',
      transition: 'opacity ease 1.5s',
      marginRight: '1em',
  
      '&:hover': {
        opacity: 1
      }
    }
  },

  mapButton: {
    backgroundColor: '#0001'
  },

  navButton: {
    position: 'absolute',
    right: '1em',
    bottom: '10em',
    backgroundColor: 'white',
    color: theme.palette.primary.main,

    '& svg': {
      transform: 'rotate(45deg)'
    }
  },

  snackbar: {
    flexGrow: 0,
    transition: 'background-color ease .5s',
    position: 'absolute',
    bottom: '21em',
    left: '1em',
    zIndex: 2000
  },

  appbar: {
    top: 'auto',
    flexGrow: 1,
    bottom: 0,
    backgroundColor: '#eee',
    boxShadow: 'none',

    '& .MuiTabs-flexContainer button': {
      flexGrow: 1
    },

    '& .MuiTab-wrapper': {
      fontSize: '0.9em',
      textTransform: 'none'
    },

    '& .MuiTabs-indicator': {
      backgroundColor: '#FFF0'
    }
  },

  spotGroup: {
    display: 'flex',
    marginRight: '1em',
    marginTop: '.5em',
    justifyContent: 'space-between'
  },

  spotActive: {
    backgroundColor: theme.palette.secondary.main,
    width: '10px',
    height: '6px',
    borderRadius: '4px'
  },

  spot: {
    backgroundColor: theme.colors.gray,
    opacity: '.5',
    width: '6px',
    height: '6px',
    borderRadius: '50%'
  },


  cardButton: {
    padding: '0 0.5em',
    borderRadius: '10px',
    height: '2.5em',
    fontSize: '0.85em',
    boxShadow: '0px 6px 17px 6px #263dd470',
    
    '&:active': {
      boxShadow: '0px 6px 17px 6px #263dd470',
    }
  },

  cardVotes: {
    color: theme.colors.gray,
    fontSize: '0.8em',
    textAlign: 'right'
  },

  cardContent: {
    fontSize: '0.8em',
    color: theme.colors.gray,
    lineHeight: 1.1,
    margin: '1em 0'
  },

  distanceMajor: {
    fontSize: '0.8em'
  },

  distanceMinor: {
    fontSize: '0.7em',
    color: theme.colors.gray
  },

  cardBottom: {
    display: 'flex',
    justifyContent: 'space-between'
  },

  cardInfo: {
    marginRight: '1em',
    flexGrow: 1
  },

  cardInfoMeta: {
    display: 'flex',

    '& svg': {
      width: '25px',
      opacity: '.8'
    }
  },

  card: {
    zIndex: 1101,
    margin: 'auto 1em 4.5em',
    display: 'flex',
    alignItems: 'center',
    
    '& img': {
      position: 'absolute',
      borderRadius: '5px',
      width: '7em',
      zIndex: 1
    }
  },
  
  cardBody: {
    boxShadow: '0 0 20px 5px rgba(128, 128, 128, 0.5)',
    padding: '.5em 1em .5em 6em',
    borderRadius: '5px',
    backgroundColor: theme.colors.white,
    marginLeft: '2em',
    flexGrow: 1
  },

  marker: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '50%',
    textAlign: 'center',
    lineHeight: '1.5rem',
    padding: '0',
    width: '1.5rem',
    height: '1.5rem',
    color: 'white',
    transform: 'translate(-50%, -50%)',
    cursor: 'pointer',

    '&.active': {
      backgroundColor: theme.palette.error.main,
    },

    '&:hover': {
      backgroundColor: theme.palette.primary.main
    }
  }
}));