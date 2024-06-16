import styled, { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

* {
    padding: 0;
    margin: 0;
}

h1  {
       font-size: 1.275rem !important;
       margin: 1.5rem 0;
    }

    p {
       margin: 2rem 0;
    }
    
    ol {
        padding: 0 1rem ;
    }

body {
    background-color: #f6f6f6;

    .container {
        padding: 2rem;
        
    }

    
    
}

`;

export default GlobalStyles;
