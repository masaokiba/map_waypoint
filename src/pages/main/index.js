import React, { useState, useReducer, useRef } from 'react'
import { createAction } from 'redux-actions'

import GoogleMapReact from 'google-map-react';
import cx from 'classnames';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Fab from '@material-ui/core/Fab';

import NavigationIcon from '@material-ui/icons/Navigation';
import MapIcon from '@material-ui/icons/Map';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';

import MapToolBar from 'components/mapToolBar';
import Snackbar from 'components/snackbar';

import get from 'lodash/get';
import sumBy from 'lodash/sumBy';
import 'api/mock'
import axios from 'axios';

import cardImage from 'image.png';
import { ReactComponent as WalkingIcon } from 'person-walking.svg';

import useStyles from './style';

const pathStatusValue = {
  INIT: 0,
  DOING: 1,
  FINISHED: 2
}

const reducer = (state, { payload }) => ({...state, ...payload })

const anyAction = createAction('any')

function Marker(props) {
  const classes = useStyles();
  return (
    <div className={cx(
      {'active': props.active},
      classes.marker
    )}>
      {props.text}
    </div>
  )
}

function Main(props) {
  const classes = useStyles();
  const [tab, setTab] = useState(0);
  const initState = {
    pathStatus: pathStatusValue.INIT,
    active: 0,
    path: [],
    info: []
  }
  const [{ pathStatus, path, active, info }, dispatch] = useReducer(reducer, initState);
  const map = useRef(null);
  const maps = useRef(null);

  const handleTabChange = (event, newValue) => setTab(newValue)

  const handleMapClick = ({lat, lng, event}) => {
    let action = null;

    if (pathStatus === pathStatusValue.DOING) {
      action = anyAction({ path: path.concat({lat, lng}) })
      
      axios.get('https://maps.googleapis.com/maps/api/directions/json', { 
        params: {
          origin: `${lat},${lng}`,
          destination: `${lat},${lng}`,
          key: process.env.REACT_APP_GOOGLE_MAP_API_KEY
        }
      })
      .then(function ({ data }) {
        const leg = get(data, 'routes[0].legs[0]');
        const distance = get(leg, 'distance.value');
        const duration = get(leg, 'duration.value');
        
        action = anyAction({
          // pathStatus: event.ctrlKey ? pathStatusValue.FINISHED : pathStatusValue.DOING,
          info: info.concat({ distance, duration })
        });
        dispatch(action);
      });

    } else {
      action = anyAction({
        pathStatus: pathStatusValue.DOING,
        path: [{ lat, lng}]
      });
    }
    dispatch(action);
  }

  const handleMarkerClick = key => {
    const action = anyAction({ active: parseInt(key) });
    dispatch(action);
  }

  const renderPolylines = () => {
    const geodesicPolyline = new maps.current.Polyline({
      path,
      geodesic: true,
      strokeColor: 'black',
      strokeOpacity: 1.0,
      strokeWeight: 2
    })
    geodesicPolyline.setMap(map.current);

    const nonGeodesicPolyline = new maps.current.Polyline({
      path,
      geodesic: false,
      strokeColor: '#e4e4e4',
      strokeOpacity: 0.7,
      strokeWeight: 3
    })
    nonGeodesicPolyline.setMap(map.current);

    // const bounds = new maps.current.LatLngBounds();
    // for (let spot of path) {
    //   bounds.extend(new maps.current.LatLng(spot.lat, spot.lng))
    // }
    // console.log(bounds);
    // map.current.fitBounds(bounds)
  }

  if (map.current && maps.current) {
    renderPolylines();
  }

  const totalDuration = sumBy(info, 'duration');
  const totalDistance = sumBy(info, 'distance');
  
  return (
    <Box className={classes.screen}>
      {/* <Snackbar
        variant={ pathStatus === pathStatusValue.FINISHED ? 'success' : 'info' } 
        className={classes.snackbar}
        message={'Click inside the map and start putting path'
          // pathStatus === pathStatusValue.INIT ? 'Click inside the map and start putting path'
            // : pathStatus === pathStatusValue.DOING ? 'Click with Ctrl key to put your last point and finalize your path'
            // : 'Finished. Click inside the map to start another'
        }
      /> */}
      <Box className={classes.mapToolBar}>
        <MapToolBar/>
        <div>
          <IconButton aria-label="Delete" className={classes.mapButton}>
            <MapIcon fontSize="small" />
          </IconButton>
        </div>
      </Box>
      <Box className={classes.map}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
          defaultCenter={{lat: 50, lng: 5}}
          onClick={handleMapClick}
          onChildClick={handleMarkerClick}
          onGoogleApiLoaded={info => { map.current = info.map; maps.current = info.maps; }}
          defaultZoom={7}
        >
          {path.map(({ lat, lng }, key) => (
            <Marker
              key={key}
              active={key === active}
              text={key + 1}
              lat={lat}
              lng={lng}
            />
          ))}
        </GoogleMapReact>
        <Fab
          aria-label="Add"
          className={classes.navButton}
          size='small'
        >
          <NavigationIcon />
        </Fab>
      </Box>
      <Box className={classes.card}>
        <img src={cardImage} alt='' />
        <Box className={classes.cardBody}>
          <Typography className={classes.cardVotes}>103 votes</Typography>
          <Typography>GASTRONOMY TRIP</Typography>
          <Typography className={classes.cardContent}>
            The Quartier des Spectacles is the city’s major cultural district.
            At its heart are Place des Arts, a complex with several performance halls, and the adjacent Musée d’art contemporain.
            Year-round outdoor events and festivals draw crowds to the
          </Typography>
          <Box className={classes.cardBottom}>
            <div className={classes.cardInfo}>
              <Box className={classes.cardInfoMeta}>
                <WalkingIcon/>
                <div>
                  <Typography className={classes.distanceMajor}>
                    {`${Math.floor(totalDuration / 60)}h ${totalDuration % 60}min`}
                  </Typography>
                  <Typography className={classes.distanceMinor}>
                    {`${totalDistance}km`}
                  </Typography>
                </div>
              </Box>
              <Box className={classes.spotGroup}>
                {path.map((item, key) => (
                  <div key={key} className={active === key ? classes.spotActive : classes.spot}/>
                ))}
              </Box>
            </div>
            <Button
              variant='contained'
              color='secondary'
              className={classes.cardButton}
            >
              More Info
            </Button>
          </Box>
        </Box>
      </Box>
      <AppBar
        position='fixed'
        className={classes.appbar}
        color="default"
      >
        <Tabs
          value={tab}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleTabChange}
          centered
        >
          <Tab label="Explore" icon={<PhoneIcon />}/>
          <Tab label="Commute" icon={<FavoriteIcon />}/>
          <Tab label="For you" icon={<PersonPinIcon />}/>
        </Tabs>
      </AppBar>
    </Box>
  )
}

export default React.memo(Main);
