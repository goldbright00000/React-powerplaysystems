import Styled from "styled-components";

const BoxWrapper = Styled.section`
text-align:Center;
    background-color:${props =>
      props.showTime === true ? "#17181a" : "transparent"} ;
    margin-top: ${props => (props.showTime === true ? "-1px" : "30px")};

    .row {
        align-items:center;
    }


    .services{
        padding: 7px 5px 15px;
        border-radius: 8px;
        background-color: rgba(242, 242, 242, 0.06);
        margin: 0 3px 5px;
    }

    
    .first{
     
        padding-left: ${props =>
          props.showTime === true ? "15px !important;" : "0px"} 
     }
     .third{
      
        padding-right: ${props =>
          props.showTime === true ? "15px !important" : "0px"};

        img{
            padding-top: 9px;
            padding-bottom: 4px;

        }
     }
     
     
     h2{
         margin-bottom: 44px;
         font-family: "Teko", sans-serif;
  font-size: 20px;
  line-height: 24px;
  font-weight: 600;

    color: #fb6e00;

  

  
     }

     h4 {
        font-family: "Poppins", sans-serif;
        font-size: 14px;
        line-height: 18px;
        font-weight: 200;
        color: #f2f2f2;
      }




`;

export { BoxWrapper };
