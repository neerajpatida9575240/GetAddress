import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { api_key } from "../common/config";

export default function AddressAutocomplete() {
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get("/maps/api/place/textsearch/json", {
        params: {
          query: query,
          key: api_key,
        },
      });
      setPlaces(response.data.results);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  useEffect(() => {
    setPlaces([]); // Clear previous search results when the query changes
    if (query.trim() !== "") {
      handleSearch();
    }
  }, [query]);

  return (
    <div className="pt-5 d-flex justify-content-center w-100">
    <Autocomplete
      disablePortal
      id="address-autocomplete"
      options={places}
      getOptionLabel={(place) => `${place.name}, ${place.formatted_address}`}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Address"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type to search..."
        />
      )}
    />
    </div>
  );
}