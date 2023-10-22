import React, { useRef, useEffect, useState } from 'react';
import steps from "../../media/stairs.mp3";
import './ZoomImage.css';

const ZoomImage = ({ src, alt, onZoom }) => {
    const imageRef = useRef(null);
    const areaRef = useRef(null);
    const audioRefWalk = useRef(null);

    const [plays, setPlays] = useState(0);

    var hasZoomed = false;
    var x = 0;
    var y = 0;

    const handleZoom = (e) => {
        if (hasZoomed) {
            return;
        }
        hasZoomed = true;
        const clickedArea = e.target.id;

        if (clickedArea == "area1") {
            const imgElem = imageRef.current;

            imgElem.style.transformOrigin = `${x}px ${y}px`;
            imgElem.style.animation = 'shakeZoom 7s forwards'; //change duration

            audioRefWalk.current.play();
            if (onZoom) {
                onZoom({ message: "Zoomed in on area1", data: "Any data you want to send" });
            }
        }
    };

    useEffect(() => {
        window.addEventListener("resize", setAreaPosition);

        const handleTimeUpdate = () => {
            if (audioRefWalk.current.currentTime >= 1.65 && plays < 1) {
                audioRefWalk.current.currentTime = 0;
                setPlays(plays + 1);
                audioRefWalk.current.play();
            }
        };
        
        const audioEl = audioRefWalk.current;
        audioEl.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            audioEl.removeEventListener('timeupdate', handleTimeUpdate);
            window.removeEventListener("resize", setAreaPosition);
        };
    }, [plays]);

    const setAreaPosition = () => {
        const imgRect = imageRef.current.getBoundingClientRect();

        x = imgRect.width * 0.5;
        y = imgRect.height * 0.65;

        areaRef.current.coords = `${x},${y},75`;
    };


  return (
    <div className="zoom-container">
        <img 
            ref={imageRef}
            useMap="#image-map"
            src={src}
            alt={alt}
            onLoad={setAreaPosition}
        />
        <map name="image-map">
            <area 
                ref={areaRef}
                className='area-clickable' 
                shape="circle" 
                coords=""
                alt="Circle area" 
                href="#" 
                id="area1" 
                onClick={handleZoom} 
            />
        </map>
        <audio ref={audioRefWalk}>
            <source src={steps} type="audio/mpeg" />
        </audio>
    </div>
  );
}

export default ZoomImage;
