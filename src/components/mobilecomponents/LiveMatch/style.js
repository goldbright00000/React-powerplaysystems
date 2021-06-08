import Styled from "styled-components";

const MatchWrapper = Styled.div`
width:100%;
position: sticky;
bottom: 0;
background-color: #292a2e;

z-index:300;

.live {
    position:relative;
    padding-top:37px;
padding-bottom:21px;
}

.cash {
   
    text-align: center;
   p {
    font-family: Poppins;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.17;
    letter-spacing: normal;
    
    color: #f2f2f2;

   }

   h2 {
    font-family: Teko;
    font-size: 20px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #fb6e00; 
   }


}

.score {

.scoreFirst {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h2 {

        font-family: Poppins;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #fb6e00;

      

    }
    span {
        
        font-family: Teko;
        font-size: 20px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #fb6e00;
      
              }
}
    

.leader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    p{
        font-family: Poppins;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: var(--white-60);

    }

    span {
        font-family: Teko;
  font-size: 20px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: var(--white-60);
        
     }

}


  
}
`;

const Rank = Styled.div`
cursor:pointer;
position:absolute;
top:-29px;
left: 30%;
    margin-right: 30%;
    display: flex;
    align-items: center;

.box {
    margin-right:27px;
    width: 190px;
    height: 34px; 
    border-radius: 8px;
      box-shadow: 0 2px 14px 0 rgba(0, 0, 0, 0.5);
      background-color: #e03c2d;
    
      display:flex;
      justify-content:center;
      align-items:center;
    .cricle {
        margin-right:8px;
     width: 10px;
     height: 10px;
     background-color: #f2f2f2;
     border-radius:100%;
    }
 
     p{
         margin-right:8px;
         font-family: Poppins;
   font-size: 14px;
   font-weight: 500;
   font-stretch: normal;
   font-style: normal;
   line-height: normal;
   letter-spacing: normal;
   color: #ffffff;
 
   
     }
 
     h2 {
         font-family: Poppins;
         font-size: 20px;
         font-weight: bold;
         font-stretch: normal;
         font-style: normal;
         line-height: normal;
         letter-spacing: normal;
         color: #ffffff;
     }
 
 



}


.menuButton {
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    width: 58px;
  height: 58px;
  border-radius: 100%;
  box-shadow: 0 2px 24px 0 rgba(0, 0, 0, 0.5);
  background-color: #202124;
  box-shadow: 0 0 12px 10px rgba(17, 17, 17, 0.2);
  background-image: linear-gradient(158deg, #333232 9%, #000000 92%);


span {
    margin-bottom:4px;
    width: 6px;
  height: 6px;
  background-color: #fb6e00;
  border-radius:100%;

  
}

}
  

`;

export { MatchWrapper, Rank };
