import React from "react";

const VideoGallery = () => {
  return (
    <div className="video-gallery" id="video">
      <h1>Videos for Becoming a Web Developer</h1>
      <div className="video-grid">
        <div className="video">
          <iframe
            width="350"
            height="300"
            src="https://www.youtube.com/embed/ajdRvxDWH4w?si=a9aD5NiBoSjyfhcA"
            title="YouTube video player"
    
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="video">
          <iframe
            width="350"
            height="300"
            src="https://www.youtube.com/embed/hlGoQC332VM?si=e68Sn6DMw-nafEP_"
            title="YouTube video player"
         // Changed from 'frameborder'
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin" // Changed from 'referrerpolicy'
            allowFullScreen // Changed from 'allowfullscreen'
          ></iframe>
        </div>
        <div className="video">
          <iframe
            width="350"
            height="300"
            src="https://www.youtube.com/embed/eILUmCJhl64?si=xdQhX9n0DFiYv3B3"
            title="YouTube video player"
       
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin" // Changed from 'referrerpolicy'
            allowFullScreen // Changed from 'allowfullscreen'
          ></iframe>
        </div>
        <div className="video">
          <iframe
            width="350"
            height="315"
            src="https://www.youtube.com/embed/6VbETTS67rM?si=kUv_mr4OUBwhVfBz"
            title="YouTube video player"
           
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin" // Changed from 'referrerpolicy'
            allowFullScreen // Changed from 'allowfullscreen'
          ></iframe>
        </div>
        <div className="video">
          <iframe
            width="350"
            height="315"
            src="https://www.youtube.com/embed/EAR7De6Goz4?si=R1KNAkULWihzjcz9"
            title="YouTube video player"
         
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin" // Changed from 'referrerpolicy'
            allowFullScreen // Changed from 'allowfullscreen'
          ></iframe>
        </div>
        <div className="video">
          <iframe
            width="350"
            height="315"
            src="https://www.youtube.com/embed/N2FnB3HiDDU?si=6Z6en7PbzsT76Wxo"
            title="YouTube video player"
        
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin" // Changed from 'referrerpolicy'
            allowFullScreen // Changed from 'allowfullscreen'
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default VideoGallery;
