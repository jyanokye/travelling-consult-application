import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import CardActionArea from '@mui/material/CardActionArea';

export default function MultiActionAreaCard() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px', // Gap between cards
        justifyContent: 'space-between', // Distribute cards evenly
      }}
    >
      {[
        { image: '/images/Paris.jpg', title: 'France', location: 'Paris, France' },
        { image: '/images/Dubai.jpg', title: 'Dubai', location: 'Dubai, UAE' },
        { image: '/images/UK1.jpg', title: 'United Kingdom', location: 'London, UK' },
        { image: '/images/Paris.jpg', title: 'France', location: 'Paris, France' },
        { image: '/images/Paris.jpg', title: 'France', location: 'Paris, France' },
        { image: '/images/Paris.jpg', title: 'France', location: 'Paris, France' },
      ].map((card, index) => (
        <Card
          key={index}
          sx={{
            flexBasis: 'calc(33.333% - 16px)', // Three cards per row
            height: 383,
            boxSizing: 'border-box', // Include padding and border in the element's total width and height
          }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              image={card.image}
              alt={card.title}
              sx={{ height: '310px' }}
            />
            <CardContent sx={{ padding: '8px' }}>
              <Typography gutterBottom variant="h6" component="div" sx={{ marginBottom: '4px' }}>
                {card.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', marginBottom: '0px' }}>
                {card.location}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}
