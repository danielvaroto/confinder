import { Status, Wrapper } from '@googlemaps/react-wrapper';
import { isLatLngLiteral } from '@googlemaps/typescript-guards';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { createCustomEqual } from 'fast-equals';
import {
  Children,
  cloneElement,
  EffectCallback,
  FC,
  isValidElement,
  MouseEvent,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { getConferences } from '../_data';

export default function MapPage(): ReactElement {
  const navigate = useNavigate();

  const conferences = getConferences();

  const render = (status: Status) => {
    return <h1>{status}</h1>;
  };

  const conferencesPosition: google.maps.LatLngLiteral[] = [
    {
      lat: -20,
      lng: -43,
    },
  ];
  const [zoom, setZoom] = useState(2); // initial zoom
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });

  const onIdle = (m: google.maps.Map) => {
    const zoom = m.getZoom();
    if (zoom) {
      setZoom(zoom);
    }
    const center = m.getCenter();
    if (center) {
      setCenter(center.toJSON());
    }
  };

  const handleHideMapOnClick = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    navigate('/');
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <TextField
          label="Buscar conferências..."
          size="small"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  // onClick={handleClickShowPassword}
                  // onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <Button
          variant="outlined"
          startIcon={<LocationOnIcon />}
          fullWidth
          onClick={handleHideMapOnClick}
        >
          Ocultar mapa
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button variant="outlined" startIcon={<FilterAltIcon />} fullWidth>
          Filtros
        </Button>
      </Grid>
      <Grid item xs={12}>
        <div style={{ display: 'flex', height: '600px' }}>
          <Wrapper apiKey={process.env.REACT_APP_GOOGLE_PUBLIC_API_KEY} render={render}>
            <Map
              center={center}
              onIdle={onIdle}
              zoom={zoom}
              style={{ flexGrow: '1', height: '100%' }}
            >
              {conferencesPosition.map((position, i) => (
                <Marker key={i} position={position} />
              ))}
            </Map>
          </Wrapper>
        </div>
      </Grid>
    </Grid>
  );
}

interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string };
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
}

const Map: FC<MapProps> = ({ onClick, onIdle, children, style, ...options }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  // because React does not do deep comparisons, a custom hook is used
  // see discussion in https://github.com/googlemaps/js-samples/issues/946
  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  useEffect(() => {
    if (map) {
      ['click', 'idle'].forEach((eventName) => google.maps.event.clearListeners(map, eventName));

      if (onClick) {
        map.addListener('click', onClick);
      }

      if (onIdle) {
        map.addListener('idle', () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  return (
    <>
      <div ref={ref} style={style} />
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          // set the map prop on the child component
          return cloneElement(child, { map });
        }
      })}
    </>
  );
};

const Marker: FC<google.maps.MarkerOptions> = (options) => {
  const [marker, setMarker] = useState<google.maps.Marker>();

  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
};

const deepCompareEqualsForMaps = createCustomEqual((deepEqual) => (a: any, b: any) => {
  if (
    isLatLngLiteral(a) ||
    a instanceof google.maps.LatLng ||
    isLatLngLiteral(b) ||
    b instanceof google.maps.LatLng
  ) {
    return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
  }

  // TODO extend to other types

  // use fast-equals for other objects
  return deepEqual(a, b);
});

function useDeepCompareMemoize(value: any) {
  const ref = useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

function useDeepCompareEffectForMaps(callback: EffectCallback, dependencies: any[]) {
  useEffect(callback, dependencies.map(useDeepCompareMemoize));
}
