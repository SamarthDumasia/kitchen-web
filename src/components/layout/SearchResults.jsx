import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';

const SearchResultsContainer = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  top: 'calc(100% + 8px)',
  left: 0,
  right: 0,
  maxHeight: '350px',
  overflowY: 'auto',
  background: 'rgba(139, 69, 19, 0.97)',
  backdropFilter: 'blur(10px)',
  borderRadius: '8px',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
  border: '1px solid rgba(218, 165, 32, 0.2)',
  zIndex: 1000,
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '3px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(218, 165, 32, 0.5)',
    borderRadius: '3px',
    '&:hover': {
      background: 'rgba(218, 165, 32, 0.7)',
    }
  }
}));

const ResultItem = styled(ListItem)(({ theme }) => ({
  borderBottom: '1px solid rgba(218, 165, 32, 0.2)',
  padding: theme.spacing(1.5),
  '&:hover': {
    backgroundColor: 'rgba(218, 165, 32, 0.1)',
    transform: 'translateX(8px)',
  },
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:last-child': {
    borderBottom: 'none',
  }
}));

const SearchResults = ({ results, onResultClick, isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && results.length > 0 && (
        <SearchResultsContainer
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <List sx={{ py: 0 }}>
            {results.map((item) => (
              <ResultItem
                key={item.id}
                onClick={() => onResultClick(item)}
                component={motion.div}
                whileHover={{ x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <ListItemAvatar>
                  <Avatar 
                    src={item.image} 
                    alt={item.name}
                    sx={{ 
                      width: 50, 
                      height: 50,
                      border: '2px solid rgba(218, 165, 32, 0.3)'
                    }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="body1" sx={{ color: '#fff', fontWeight: 600 }}>
                      {item.name}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      {item.category} • ₹{item.price}
                    </Typography>
                  }
                />
              </ResultItem>
            ))}
          </List>
        </SearchResultsContainer>
      )}
    </AnimatePresence>
  );
};

export default SearchResults;
