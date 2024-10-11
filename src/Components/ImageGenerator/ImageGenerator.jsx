import React, { useRef, useState } from 'react';
import './ImageGenerator.css';
import default_image from '../Assets/default_image.svg';

const ImageGenerator = () => {
  
    const [image_url, setImage_url] = useState("/");
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);

    const imageGenerator = async () => {
      if (inputRef.current.value === "") {
          return;
      }
      setLoading(true);
  
      const API_KEY = '45883888-7333114c9dfcb31debf010efe'; // Replace with your actual Pixabay API key
  
      try {
          const response = await fetch(
              `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(inputRef.current.value)}&image_type=photo&per_page=3` // Changed per_page to 3
          );
  
          if (!response.ok) {
              // Log the response to see the actual error message
              const errorText = await response.text();
              console.error("Error response:", errorText); // Logs the raw error text
              throw new Error(`Error ${response.status}: ${response.statusText}`);
          }
  
          const data = await response.json();
  
          if (data.hits && data.hits.length > 0) {
              setImage_url(data.hits[0].webformatURL); // Set the first image URL from the result
          } else {
              setImage_url(default_image); // Set to default image if no results are found
          }
      } catch (error) {
          console.error("Error fetching images:", error.message); // Log any errors to the console
          setImage_url(default_image); // Fallback to default image on error
      }
  
      setLoading(false);
  };
  

    return (
        <div className='ai-image-generator'>
            <div className='header'>Image <span>Generator</span></div>
            <div className='img-loading'>
                <div className='image'>
                    <img src={image_url === "/" ? default_image : image_url} alt="" />
                </div>
                <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
                <div className={loading ? "loading-text" : "display-none"}>Loading...</div>
            </div>
            <div>
                <div className="search-box">
                    <input
                        type="text"
                        ref={inputRef}
                        className='search-input'
                        placeholder='Describe what you want to see!!'
                    />
                    <div className="generate-btn" onClick={imageGenerator}>
                        Generate
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImageGenerator;
