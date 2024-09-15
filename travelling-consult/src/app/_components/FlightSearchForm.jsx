import React, { useState } from 'react';
import { Box, TextField, RadioGroup, FormControlLabel, Radio, Button, Checkbox, Grid } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker } from '@mui/lab';

const FlightSearchForm = () => {
  const [tripType, setTripType] = useState('round-trip');
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [flexible, setFlexible] = useState(false);

  const handleSearch = () => {
    // Handle search action
    console.log({
      tripType,
      departureDate,
      returnDate,
      flexible,
    });
  };

  return (
    <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: 2, boxShadow: 3, width: 600, mx: 'auto', height: 600 }}>
      {/* Trip Type */}
      <RadioGroup
        row
        value={tripType}
        onChange={(e) => setTripType(e.target.value)}
        sx={{ mb: 2 }}
      >
        <FormControlLabel value="one-way" control={<Radio />} label="One Way" />
        <FormControlLabel value="round-trip" control={<Radio />} label="Round Trip" />
        <FormControlLabel value="multi-city" control={<Radio />} label="Multi City" />
      </RadioGroup>

      {/* City Selection */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={6}>
          <TextField label="From" fullWidth placeholder="Select City" />
        </Grid>
        <Grid item xs={6}>
          <TextField label="To" fullWidth placeholder="Select City" />
        </Grid>
      </Grid>

      {/* Date Pickers */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Departure"
              value={departureDate}
              onChange={(newDate) => setDepartureDate(newDate)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label={tripType === 'one-way' ? 'Return (Optional)' : 'Return'}
              value={returnDate}
              onChange={(newDate) => setReturnDate(newDate)}
              renderInput={(params) => <TextField {...params} fullWidth />}
              disabled={tripType === 'one-way'}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>

      {/* Passenger Selection */}
      <TextField label="Passenger" type="number" fullWidth defaultValue="1" sx={{ mb: 2 }} />

      {/* Flexible Dates */}
      <FormControlLabel
        control={<Checkbox checked={flexible} onChange={(e) => setFlexible(e.target.checked)} />}
        label="My dates are flexible (+/- 3 days)"
      />

      {/* Search Button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSearch}
        sx={{ mt: 2 }}
      >
        Search
      </Button>
    </Box>
  );
};

export default FlightSearchForm;
