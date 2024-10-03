import React, { useState } from "react";
import { Stack, Box, Card, CardContent, Typography, CardMedia, CardActionArea, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { countryData } from '../data';

export default function MultiActionAreaCard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [classFilter, setClassFilter] = useState("");

  // Ensure countryData is an array and has items
  if (!Array.isArray(countryData) || countryData.length === 0) {
    console.error("countryData is not an array or is empty");
    return null;
  }

  // Filter the data based on searchQuery, priceFilter, and classFilter
  const filteredCountries = countryData.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (priceFilter === "" || c.price <= priceFilter) &&
      (classFilter === "" || c.class === classFilter)
  );

  // Handle search input change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle price filter change
  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  // Handle class filter change
  const handleClassChange = (e) => {
    setClassFilter(e.target.value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px', // Gap between cards
        justifyContent: 'space-between', // Distribute cards evenly
      }}
    >
      
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearch}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="price-filter-label">Max Price</InputLabel>
        <Select
          labelId="price-filter-label"
          value={priceFilter}
          onChange={handlePriceChange}
          label="Max Price"
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value={50000}>Up to GHS 50,000</MenuItem>
          <MenuItem value={100000}>Up to GHS 100,000</MenuItem>
          <MenuItem value={150000}>Up to GHS 150,000</MenuItem>
          <MenuItem value={200000}>Up to GHS 200,000</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="class-filter-label">Class</InputLabel>
        <Select
          labelId="class-filter-label"
          value={classFilter}
          onChange={handleClassChange}
          label="Class"
        >
          <MenuItem value="">Any</MenuItem>
          <MenuItem value="Economy">Economy</MenuItem>
          <MenuItem value="Business">Business</MenuItem>
          <MenuItem value="First">First</MenuItem>
        </Select>
      </FormControl>
      
      {/* Display Cards */}
      {filteredCountries.length > 0 ? (
        filteredCountries.map((country, index) => (
          <Card
            key={index}
            sx={{
              flexBasis: 'calc(33.333% - 16px)', // Three cards per row
              maxWidth: 345,
              height: 463,
              boxSizing: 'border-box', // Include padding and border in the element's total width and height
            }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                image={country.image}
                alt={country.name}
                sx={{ height: '310px', objectFit: 'cover' }} // Ensure image covers the area
              />
              <CardContent sx={{ padding: '8px' }}>
                <Typography gutterBottom variant="h6" component="div" sx={{ marginBottom: '4px', fontWeight: 'bold', fontSize: '1.5rem' }}>
                  {country.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', marginBottom: '0px' , fontSize: 18 }}>
                  <b>From:</b> {country.cityFrom} <br />
                  <b>To:</b> {country.cityTo} <br />
                  <b>Price:</b> GHS {country.price.toLocaleString()} <br />
                  <b>Class:</b> {country.class}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))
      ) : (
        <Box
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          p={5}
        >
          <Typography variant="h4" color="text.primary" textAlign="center">
            No items found
          </Typography>
        </Box>
      )}
    </Box>
  );
}
