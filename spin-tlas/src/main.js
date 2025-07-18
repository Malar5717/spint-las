import './style.css'
import { setupGlobe, setTheme } from './globe.js';

const globeContainer = document.querySelector('#globe');
setupGlobe(globeContainer);

// Expose setTheme to HTML
window.setTheme = setTheme;
