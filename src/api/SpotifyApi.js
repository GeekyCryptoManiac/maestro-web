// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const spotifyApi = ({ onOpenAiRecommendations,onDataReceived }) =>{

//     const [spotifyAccessToken, setSpotifyAccessToken] = useState('');
//     //this is a state to await on recommendations set by openAI
//     const[spotifySearchTrackIDList, setspotifySearchTrackIDList] = useState([])
//     const[spotifySearchTrackDetails, setSpotifySearchTrackDetails] = useState([])
//     const client_id = "143852e17b0a426dbe305265171082f0";
//     const client_secret =  "4eb262365bc34d0a8057617a36754a43";

//     const getSpotifyData = () =>{
        
//     }
//     const getSpotifyAccessTokenResponse = new Promise((resolve, reject) => {
//         axios
//           .post('https://accounts.spotify.com/api/token', `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`, {
//             headers: {
//               'Content-Type': 'application/x-www-form-urlencoded',
//             },
//           })
//           .then((response) => {
//             // Handle the asynchronous response and resolve the Promise
//             setSpotifyAccessToken(response.data);
//             resolve(response.data);
//             console.log(process.env.REACT_APP_SPOTIFY_CLIENTID); // logs the access token provided by Spotify API
//           })
//           .catch((error) => {
//             console.error('Error making Spotify API request:', error);
//             reject(error);
//           });
//       });
//       getSpotifyAccessTokenResponse
//           .then((data) => {
//             // Handle data after the Promise is resolved
//             // You can access the accessToken here, as it's been set in the state
//             console.log('Access token is:', data);
//           })
//           .catch((error) => {
//             // Handle errors, if any
//           });
          
//     //---------------------------------------useEffect to when if there are changes to openAI Recommendations --------------------------------------------------//
//     useEffect(() => {
//         // Create a Promise to handle the asynchronous operation
//         const getTrackIDsResponse = new Promise(async (resolve, reject) => {
//           const trackIDList = [];
      
//           try {
//             let parsedOpenAiReccomendations;
      
//             try {
//               parsedOpenAiReccomendations = JSON.parse(onOpenAiRecommendations);
//             } catch (error) {
//               parsedOpenAiReccomendations = JSON.parse({ Artist: '', Song: '' });
//             }
      
//             if (parsedOpenAiReccomendations[0].Artist || parsedOpenAiReccomendations[0].Song) {
//               const promises = Object.entries(parsedOpenAiReccomendations).map(async ([index, { Artist, Song }]) => {
//                 const query = `${Song}%20${Artist}`.replace(/ /g, '%20');
//                 console.log(query);
      
//                 const url = `https://api.spotify.com/v1/search?q=${query}&type=track`;
//                 const trackIDResponse = await axios.get(url, {
//                   headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${spotifyAccessToken.access_token}`,
//                   },
//                 });
      
//                 const trackIDs = trackIDResponse.data.tracks.items[0].id;
//                 trackIDList.push(trackIDs);
//                 setspotifySearchTrackIDList(trackIDList);
//                 console.log(trackIDList);
//               });
      
//               await Promise.all(promises);
//               resolve(spotifySearchTrackIDList); // Resolve the Promise with the result
//             }
//           } catch (error) {
//             console.error('Error fetching track IDs:', error);
//             reject(error); // Reject the Promise if there's an error
//           }
//         });
      
//         // Now, you can use the Promise to handle the asynchronous operation
//         getTrackIDsResponse
//           .then((trackIDs) => {
//             // Handle the resolved data (track IDs) here
//             console.log('Track IDs are:', trackIDs);
//           })
//           .catch((error) => {
//             // Handle errors, if any
//           });
//       }, [onOpenAiRecommendations]);
    
//     //----------------------------------------------useEffect for when there are any changes to trackIDList----------------------------------//
//     useEffect(() => {
//         // Create a Promise to handle the asynchronous operation
//         const getTrackDetailsResponsePromise = new Promise(async (resolve, reject) => {
//           setTimeout(async () => {
//             const allTrackIDs = spotifySearchTrackIDList.join('%2C');
//             console.log('These are the song IDs: ' + allTrackIDs);
      
//             try {
//               const trackDetailResponse = await axios.get(
//                 `https://api.spotify.com/v1/tracks?ids=${allTrackIDs}`,
//                 {
//                   headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${spotifyAccessToken.access_token}`,
//                   },
//                 }
//               );
      
//               const trackDetails = trackDetailResponse.data;
//               setSpotifySearchTrackDetails(trackDetails);
//               resolve(trackDetails); // Resolve the Promise with the result
//             } catch (error) {
//               console.error('Error fetching track Details:', error);
//               reject(error); // Reject the Promise if there's an error
//             }
//           }, 700);
//         });
      
//         // Now, you can use the Promise to handle the asynchronous operation
//         getTrackDetailsResponsePromise
//           .then((trackDetails) => {
//             for (let i = 0; i < trackDetails.tracks.length; i++) {
//               console.log('Track Name ' + i + ': ' + trackDetails.tracks[i].name);
//             }
//             // Handle the resolved data (track details) here
//             console.log('Track Details:', trackDetails);
//             onDataReceived(trackDetails);
//             setTimeout(() => {
//               setIsLoading(false);
//             }, 1000);
            
//           })
//           .catch((error) => {
//             // Handle errors, if any
//           });
//       }, [spotifySearchTrackIDList]);
    
    

//     //------------------------------------Once all the Spotify functions have completed, they will send a callback function to main.js to open Recommendation Modal-----------//
    
// }


import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SpotifyApi = ({ onOpenAiRecommendations, onDataReceived }) => {
  const [spotifyAccessToken, setSpotifyAccessToken] = useState('');
  const [spotifySearchTrackIDList, setSpotifySearchTrackIDList] = useState([]);
  const [spotifySearchTrackDetails, setSpotifySearchTrackDetails] = useState([]);

  // Function to get Spotify access token
  const getSpotifyAccessToken = async () => {
    try {
      const response = await axios.post('https://accounts.spotify.com/api/token', {
        grant_type: 'client_credentials',
        client_id: '143852e17b0a426dbe305265171082f0',
        client_secret: '4eb262365bc34d0a8057617a36754a43',
      });
      
      const accessToken = response.data.access_token;
      setSpotifyAccessToken(accessToken);
      return accessToken;
    } catch (error) {
      console.error('Error getting Spotify access token:', error);
      throw error;
    }
  };

  // Function to get Spotify track IDs based on OpenAI recommendations
  const getSpotifyTrackIDs = async (openAiRecommendations) => {
    try {
      const parsedOpenAiReccomendations = JSON.parse(openAiRecommendations);
      const trackIDList = [];

      const promises = parsedOpenAiReccomendations.map(async ({ Artist, Song }) => {
        const query = `${Song}%20${Artist}`.replace(/ /g, '%20');

        const url = `https://api.spotify.com/v1/search?q=${query}&type=track`;
        const trackIDResponse = await axios.get(url, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${spotifyAccessToken}`,
          },
        });

        const trackIDs = trackIDResponse.data.tracks.items[0]?.id; // Check if track ID exists
        if (trackIDs) {
          trackIDList.push(trackIDs);
        }
      });

      await Promise.all(promises);
      setSpotifySearchTrackIDList(trackIDList);
      return trackIDList;
    } catch (error) {
      console.error('Error getting Spotify track IDs:', error);
      throw error;
    }
  };

  // Function to get Spotify track details based on track IDs
  const getSpotifyTrackDetails = async () => {
    try {
      const allTrackIDs = spotifySearchTrackIDList.join('%2C');

      const response = await axios.get(
        `https://api.spotify.com/v1/tracks?ids=${allTrackIDs}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${spotifyAccessToken}`,
          },
        }
      );

      const trackDetails = response.data;
      setSpotifySearchTrackDetails(trackDetails);
      return trackDetails;
    } catch (error) {
      console.error('Error getting Spotify track details:', error);
      throw error;
    }
  };

  // Consolidated function to get all Spotify data
  const getSpotifyData = async (openAiRecommendations) => {
    const accessToken = await getSpotifyAccessToken();
    const trackIDs = await getSpotifyTrackIDs(openAiRecommendations);
    const trackDetails = await getSpotifyTrackDetails();

    return {
      spotifyAccessToken: accessToken,
      spotifySearchTrackDetails: trackDetails,
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSpotifyData(onOpenAiRecommendations);
        onDataReceived(data);
      } catch (error) {
        // Handle errors
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [onOpenAiRecommendations]);

  // ... rest of your code
};

export default SpotifyApi;
