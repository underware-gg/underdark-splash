import logo from '../../media/webbackground.png';
import musicAmbient from "../../media/music-ambient.mp3";
import underdarkPoem from "../../media/underdark-poem.mp3";
import React, { useRef, useEffect, useState } from 'react';
import './DungeonEntrance.css';
import ZoomImage from '../../components/zoomimage/ZoomImage';

function DungeonEntrance() {
    const maskRef = useRef(null);
    var isZooming = false;

    const audioRefAmbient = useRef(null);
    const audioRefVoice = useRef(null);

    const fadeVolume = (audioRef, targetVolume, duration = 3500) => {
        let startVolume = audioRef.current.volume;
        let startTime = Date.now();

        const fade = () => {
            let elapsed = Date.now() - startTime;
            let progress = elapsed / duration;

            if (progress < 1) {
                audioRef.current.volume = startVolume + (targetVolume - startVolume) * progress;
                requestAnimationFrame(fade);
            } else {
                audioRef.current.volume = targetVolume;
            }
        };

        requestAnimationFrame(fade);
    };


    const handleMouseMove = (e) => {
        if (!isZooming) {
            maskRef.current.style.setProperty('--x', `${e.clientX}px`);
            maskRef.current.style.setProperty('--y', `${e.clientY}px`);
        }
    };

    const handleZoomEvent = (data) => {
        isZooming = true;

        maskRef.current.style.animation = 'shakeZoomGradient 7s forwards';

        let targetVolume = 0
        fadeVolume(audioRefAmbient, targetVolume);

        fadeVolume(audioRefVoice, targetVolume);
    };

    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    const DURATION = 1000;
    let startTime;

    function animateRadius(timestamp) {
        if (!startTime) startTime = timestamp;

        const elapsed = timestamp - startTime;
        const percentage = Math.min(elapsed / DURATION, 1);
        const easedPercentage = easeInOutQuad(percentage);

        const minRadius = 150;
        const maxRadius = window.innerWidth;
        const radius = (1 - easedPercentage) * (maxRadius - minRadius) + minRadius;

        maskRef.current.style.setProperty('--radius', `${radius}px`);

        if (percentage < 1) {
            requestAnimationFrame(animateRadius);
        }
    }

    useEffect(() => {
        requestAnimationFrame(animateRadius);

        maskRef.current.style.setProperty('--x', `${window.innerWidth / 2}px`);
        maskRef.current.style.setProperty('--y', `${window.innerHeight / 2}px`);  
        
    }, []);

    return (
        <div onMouseMove={handleMouseMove}>
            <audio ref={audioRefAmbient} autoPlay loop >
                <source src={musicAmbient} type="audio/mpeg" />
            </audio>
            <audio ref={audioRefVoice} autoPlay loop >
                <source src={underdarkPoem} type="audio/mpeg" />
            </audio>
            <ZoomImage src={logo} alt="Zoomable Image" onZoom={handleZoomEvent} />
            <div className="mask" ref={maskRef} ></div>
        </div>
    )
}

export default DungeonEntrance;
