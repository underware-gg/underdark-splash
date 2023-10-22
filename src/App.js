import { useState } from 'react';
import './App.css';
import DungeonEntrance from './screens/dungeon/DungeonEntrance';
import IntroScreen from './screens/intro/IntroScreen';

function App() {
    const [isSecondScreen, setIsSecondScreen] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleClick = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setIsSecondScreen(true);
            setIsTransitioning(false);
        }, 500);
    };

    if (!isSecondScreen) {
        return (
            <div className={isTransitioning ? 'fade-exit-active' : 'fade-exit'}>
                <IntroScreen onClick={handleClick} />
            </div>
        );
    } else {
        return (
            <div className={isTransitioning ? 'fade-enter' : 'fade-enter-active'}>
                <DungeonEntrance />
            </div>
        );
    }
}

export default App;