import Styled from "styled-components";

const Main = Styled.section`
           color:white;
             max-width: 550px;
             margin:0 auto;
          
.stick {
    position:sticky;
    top:70px;
    z-index:200;
  background-color:#1e1e1e;
 
    .details {
      padding:0;-
    }
}
`;

const StandingWrapper = Styled.div`
background-color: #17181a;
`;

export { Main, StandingWrapper };
