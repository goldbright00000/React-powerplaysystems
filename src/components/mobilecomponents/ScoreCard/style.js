import Styled from "styled-components";

const CardWrapper = Styled.div`
background-color: #17181a;
margin-top:-1px;
padding-bottom:22px;

.card {
    border:none;
    background-color: #17181a;
    border-radius:0 ;


       .card-title {
           margin:0;
       }
       
}


`;

const CardHead = Styled.div`
padding:13px 15px  9px 15px;
background-color: ${props =>
  props.background === true ? "rgba(251, 110, 0, 0.06)" : "#202124"};
   display:flex;
   border-bottom: solid 3px rgba(242, 242, 242, 0.1);
   border-top-left-radius:8px;
   border-top-right-radius:8px;
.tag {
    font-family: Poppins;
    font-size: 18px;
    font-weight: bold;
    font-stretch: normal;
    font-style: italic;
    line-height: normal;
    letter-spacing: normal;
    color: #fb6e00;

}

.CardHeading {

    h1 {
        margin-left:6px;
        margin-top: -6px;
        font-family: Poppins;
  font-size: 18px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #f2f2f2;
    }

    p{
        margin-left:6px;
        font-family: Poppins;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.67;
        letter-spacing: normal;
        color: #979797;
    }
}

.collapseButton {
    margin-left:auto;

    span {
        font-family: Poppins;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: right;
        color: #979797;

        img {
            margin-left:6px;
        }
    }
}



`;

const CardBody = Styled.div`
padding-left:15px ;
padding-right:15px;
background-color: ${props =>
  props.background === true ? "rgba(251, 110, 0, 0.06)" : "#202124"};
border-bottom: solid 3px rgba(242, 242, 242, 0.1);



`;

const ScorePlay = Styled.div`
padding-bottom:20px;
    padding-top:5px;  

      h2 {
        font-family: Poppins;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: left;
        color: #fb6e00; 
      }

      p{

        font-family: Poppins;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #979797;
      }

      span {
          display:flex;
          justify-content:center;
          align-items:center;

        width: 42px;
  height: 32px;

  padding: 6px 12px;
  border-radius: 4px;
  background-color:${props =>
    props.bg === true ? "rgba(251, 110, 0, 0.1)" : "rgba(242, 242, 242, 0.1)"} ;
      }


`;

const ScorePoints = Styled.div`
padding-bottom:16px;
padding-right:15px;
.play {

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


    p{
        display:flex;
        justify-content:center;
        align-items:center;
        border-radius: 4px;
        background-color: rgba(242, 242, 242, 0.1);
        width: 92px;
  height: 32px;
    }
    

}


`;

const CardFooter = Styled.div`
padding-left:15px;
padding-right:15px;
padding-top:8px;
background-color: ${props =>
  props.background === true ? "rgba(251, 110, 0, 0.06)" : "#202124"};
padding-bottom:15px;

border-bottom-left-radius:8px;
   border-bottom-right-radius:8px;

h2 {
    font-family: Poppins;
    font-size: 12px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #fb6e00;  
    margin-bottom:3px;
}


p{
    display:flex;
    justify-content:center;
    align-items:center;
    max-width: width: 316px;
    height: 32px;
    border-radius: 4px;
  border: solid 1px #fb6e00;
  background-color: rgba(251, 110, 0, 0.1);
  font-family: Poppins;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #f2f2f2;
}

`;

export { CardWrapper, CardHead, CardBody, ScorePlay, ScorePoints, CardFooter };
