import axios from 'axios';

export const fetchEvents = () =>
  axios.get(
    "https://raw.githubusercontent.com/2020PB/police-brutality/data_build/all-locations.json"
  );
