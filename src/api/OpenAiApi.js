import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OpenAiApi = ({searchValue, onDataReceived }) =>{
    //openAI states and necessary variables
    const [OpenAiRecommendations, setOpenAiRecommendations] = useState('');
    const apiKey = "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";

    //function will fire when the find button is clicked
    const getOpenAIRecommendation = async (searchValue) =>{
        try {
            const openAiRecommendation = await axios.post(
              'https://api.openai.com/v1/chat/completions',
              {
                model: "gpt-3.5-turbo",
                messages: [
                { role: "user", content: searchValue },
                 {role:"system", content:"You are to only provide response with at least 7 song titles that can be searched on spotify, and turn them into a list containing JSON format like this [{'Artist':'Song'}] with double quotation mark. Respond only with this list, without acknowledging my prompt or adding any unnecessary words."}],
                max_tokens: 100,                
                temperature:0.2
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${apiKey}`,
                },
              }
            );
      
            if (openAiRecommendation.data && openAiRecommendation.data.choices && openAiRecommendation.data.choices.length > 0) {
                const recommendation = openAiRecommendation.data.choices[0].message.content;
                setOpenAiRecommendations(recommendation);
                console.log('API Response:', recommendation);

                // setIsShowAnimation(true);
                // console.log("Set Animation during trackDetails Response " + isShowAnimation)
                //Pass OpenAI recommendations to SpotifyApi.js
                onDataReceived(recommendation);
            } else {
              console.error('Empty or invalid API response:', openAiRecommendation);
            }
          } catch (error) {
            console.error('Error making OpenAI API request:', error);
          }      
    };
    // Call OpenAI API when the component mounts
    useEffect(() => {
        getOpenAIRecommendation();
    }, []);
}

export default OpenAiApi;