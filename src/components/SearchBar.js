import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '10vh', // Adjust the value to control the height
    },
    textField: {
      width: '80%', // Adjust the value to control the width
      maxWidth:'500px',
      backgroundColor: 'white',
      borderRadius: '25px',
      paddingLeft: theme.spacing(2), // Add left padding
    },
    icon: {
      marginRight: theme.spacing(1),
    },
  }));

  const SearchBar = ({ onFindButtonClick }) => {
    const classes = useStyles();
    const [searchValue, setSearchValue] = useState('');
 
    const handleInputChange  = (e) => {
      setSearchValue(e.target.value);
      };
    
    const handleFindButtonClick = () => {
      // Call the function passed from Main.js
      onFindButtonClick(searchValue);
    };
    
    return (
      <div className={classes.root}>
        <TextField
          className={classes.textField}
          variant="standard"
          placeholder="  eg. Songs to Sing to in the Shower"
          value={searchValue}
          onChange={handleInputChange}
          InputProps={{
            disableUnderline: true,
            endAdornment: (
              <IconButton onClick={handleFindButtonClick} color="inherit">
              <SearchIcon />
            </IconButton>
            ),
          }}
        />
      </div>
    );
  };
  
  export default SearchBar;
  