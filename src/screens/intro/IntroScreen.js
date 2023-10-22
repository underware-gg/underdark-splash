import { useRef } from 'react';
import background from "../../media/frame1@3x.png";
import logo from "../../media/logo.gif";
import musicAmbient from "../../media/music-title.mp3";
import './IntroScreen.css';

function IntroScreen(props) {
    const audioRefAmbient = useRef(null);

    var firstClick = true;

    const handleClick = (e) => {
        if (firstClick) {
            audioRefAmbient.current.play();
            firstClick = false;
        } else {
            props.onClick()
        }
    }

    return (
        <div onClick={handleClick}>
            <img className="backgroundImage" src={background} alt="Background" />
            <img className="logo" src={logo} alt="Logo" />
            <div className="textContainer">
                <p className="verse">Something ill under Kurnkornor stirs,</p>
                <p className="verse">down those crumbling old manor stairs,</p>
                <p className="verse">dark tar that claws and sucks the light,</p>
                <p className="verse">a ghastly duck no-one can fight,</p>
                <p className="verse">yet all in life and death be fair,</p>
                <p className="verse">there's gold and treasure buried there</p>
                <p className="verse">(click twice to start)</p>
            </div>
            <div className="foregroundImage" alt="Foreground" />
            <audio ref={audioRefAmbient} autoPlay loop>
                <source src={musicAmbient} type="audio/mpeg" />
            </audio>
        </div>
    );
    
    
}

export default IntroScreen;
