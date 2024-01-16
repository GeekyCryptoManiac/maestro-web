import './HomePage.css';
import React, { useState,useEffect } from "react";
import SearchBar from '../../components/SearchBar';
import SpotifyApi from '../../api/SpotifyApi.js';
import SongModal from '../../components/SongModal';
import TypingEffect from '../../components/TypingEffect';
import { Typography} from '@mui/material';
import OpenAiApi from '../../api/OpenAiApi.js';


const HomePage = () =>{
    //Modal State
    const [songModalOpen,setSongModalOpen] = useState(false);
    const[spotifySearchTrackDetails, setSpotifySearchTrackDetails] = useState([]);
    const [spotifyAccessToken, setSpotifyAccessToken] = useState('');
    const [openAiRecommendations, setOpenAiRecommendations] = useState('');
    const handleModalOpen = ()=>{
        setSongModalOpen(true)
    }

    const handleModalClose = ()=>{
        setSongModalOpen(false)
    }
    //Search Function to allow the button to call the OpenAI api.js
    const handleFindButtonClick = async (searchValue) => {
        setOpenAiRecommendations(await OpenAiApi.getOpenAIRecommendation(searchValue));
        // Call the function from SpotifyApi.js to get Spotify data
        const spotifyData = await SpotifyApi.getSpotifyData(openAiRecommendations);

        // Update the state with the received data
        setSpotifyAccessToken(spotifyData.spotifyAccessToken);
        setSpotifySearchTrackDetails(spotifyData.spotifySearchTrackDetails);
    }

    return(
        <div>
            <div id='header'>
                <div className='container'>
                </div>
             </div>   
            {/*This is the section for the title of the HomePage */}
            <div id='title'>
                <div className='container'>
                    <div className='title-text'>
                        <Typography variant='h1' style={{ fontFamily: 'CustomFont'}}>
                            Welcome to Maestro!
                        </Typography>
                        <Typography variant="h6" align='center' color='textPrimary' >
                            Your Sentence, Your Soundtrack: <br /> 
                            <TypingEffect text="Crafting Melodies from Your Phrases, Music Awaits!"/>
                        </Typography> 
                         {/*This is the search Bar component that is part of the title div so that it can have a uniform design  */}
                        <SearchBar
                           onFindButtonClick={handleFindButtonClick}
                        />
                    </div>
                </div> 
                <div>
                    {/* Create logic for mobile phone size and desktop size here. */}
                    {/* Create logic for loading animation type skeleton/animation  */}
                    <SongModal
                        handleOpen={songModalOpen}
                        handleClose={handleModalClose}
                    />
                </div>
            </div>
        </div>
        
    )
}

export default HomePage;