import React, { useState, ReactNode, useEffect, useRef } from 'react';

interface SceneContainerProps {
  children: ReactNode;
  background?: string;
  videoBackground?: string;
}

const SceneContainer: React.FC<SceneContainerProps> = ({ 
  children, 
  background, 
  videoBackground 
}) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Debug the background props
  useEffect(() => {
    console.log('SceneContainer props:', { background, videoBackground });
  }, [background, videoBackground]);

  // Remove the cache-busting logic - we want to use exactly the same URLs that were preloaded
  // This ensures the browser uses the cached/preloaded version
  
  // Reset video loaded state when video source changes
  useEffect(() => {
    setVideoLoaded(false);
    
    // Force video to load by creating a new video element
    if (videoBackground) {
      const video = document.createElement('video');
      video.src = videoBackground;
      video.load();
    }
    
    // Reset the current video element if it exists
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [videoBackground]);

  const handleVideoLoaded = () => {
    setVideoLoaded(true);
    console.log('Video loaded:', videoBackground);
  };

  // Create the background style object properly - using the exact same URL as preloaded
  const backgroundStyle = background ? {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  } : {};

  return (
    <div 
      className={`
        relative border border-gray-300 mx-auto
        w-full h-full rounded-lg shadow-md 
        overflow-hidden
      `}
      style={!videoBackground && background ? backgroundStyle : {}}
    >
      {/* Video background */}
      {videoBackground && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            ref={videoRef}
            key={videoBackground} // Add key to force React to recreate the element when source changes
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={handleVideoLoaded}
            className={`
              w-full h-full object-cover
              ${videoLoaded ? 'opacity-100' : 'opacity-0'}
            `}
            style={{ transition: 'opacity 0.5s ease' }}
          >
            <source src={videoBackground} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Fallback to image background if video is still loading */}
          {!videoLoaded && background && (
            <div 
              className="absolute inset-0 z-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${background})` }}
            />
          )}
        </div>
      )}
      
      {/* Content overlay */}
      <div className="relative z-10 h-full rounded-lg">
        {children}
      </div>
    </div>
  );
};

export default SceneContainer;