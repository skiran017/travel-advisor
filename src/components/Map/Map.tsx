import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Rating, Typography, useMediaQuery, Box } from '@mui/material';
import LocationOnOutlined from '@mui/icons-material/LocationOnOutlined';

import useStyles from './styles';

interface MapProps {
  setCoordinates: any;
  setBounds: any;
  coordinates: any;
  places: any;
}

function Map({ setCoordinates, setBounds, coordinates, places }: MapProps) {
  const { classes } = useStyles();
  const isDesktop = useMediaQuery('(min-width:600px)');

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY! }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl: true }}
        onChange={(e) => {
          setCoordinates({
            lat: e.center.lat,
            lng: e.center.lng,
          });
          setBounds({
            ne: e.marginBounds.ne, //northeast
            sw: e.marginBounds.sw, //southwest
          });
        }}
        // onChildClick={''}
      >
        {places?.map((place: any, idx: number) => (
          <div
            className={classes.markerContainer}
            //@ts-ignore
            lat={Number(place.latitude)}
            // lng={Number(place.longitude)}
            key={idx}
          >
            {!isDesktop ? (
              <LocationOnOutlined color="primary" fontSize="large" />
            ) : (
              <Paper elevation={3} className={classes.paper}>
                <Typography variant="subtitle2" gutterBottom>
                  {place.name}
                </Typography>
                <img
                  className={classes.pointer}
                  src={
                    place.photo
                      ? place.photo.images.large.url
                      : 'https://assets.cntraveller.in/photos/63d8e5103d7229d4cf308f01/16:9/w_1920,h_1080,c_limit/Prequel-lead.jpg'
                  }
                  alt={place.name}
                />
                <Rating
                  name="read-only"
                  size="small"
                  value={Number(place.rating)}
                  readOnly
                />
              </Paper>
            )}
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
}

export default Map;
