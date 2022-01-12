import { createGlobalStyle } from "styled-components";
// import pathFont from "./assets/fonts/Merriweather-Black.tff";

export const GlobalStyles = createGlobalStyle`
    body {
        min-height: 100%; 
        min-width: 100%; 
        padding: 0; 
        margin: 0;
        /* font-family: 'Merriweather', sans-serif; */

    }

    @font-face {
        font-family: 'Merriweather';
    }

    @font-face {
        font-family: 'Merriweather';
        src: local(Merriweather-BlackItalic),url('./assets/fonts/Merriweather-BlackItalic.tff')
    }

    @font-face {
        font-family: 'Merriweather';
        src: local(Merriweather-Bold),url('./assets/fonts/Merriweather-BlackItalic.tff')
    }

    @font-face {
        font-family: 'Merriweather';
        src: local(Merriweather-BoldItalic),url('./assets/fonts/Merriweather-BoldItalic.tff')
    }

    @font-face {
        font-family: 'Merriweather';
        src: local(Merriweather-Light),url('./assets/fonts/Merriweather-Light.tff')
    }

    @font-face {
        font-family: 'Merriweather';
        src: local(Merriweather-LightItalic),url('./assets/fonts/Merriweather-LIghtItalic.tff')
    }

    @font-face {
        font-family: 'Merriweather';
        src: local(Merriweather-Regular),url('./assets/fonts/Merriweather-Regular.tff')
    }
`;
