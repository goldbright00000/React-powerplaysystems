import Styled from "styled-components";

const ModalHeader = Styled.div`
padding:15px 37px 15px 37px;
background-color: #292a2e;
display:flex;
justify-content:space-between;
align-items:center;


span {
    border-right:1px solid #979797;
    line-height:30px;
}

div {



     &::after {
         border-right:1px solid red;
     }
    p{ 
        opacity: 0.6;
        font-family: Poppins;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: center;
        color: #ffffff;
     }
    
    
     h2 {
        font-family: Teko;
      font-size: 20px;
      font-weight: 600;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: center;
      color: #fb6e00;
     }
    
}






`;

const ModalFooter = Styled.div`
margin-top: 100px;
position:relative;
padding:41px  24px 26px 24px;
border-top-left-radius: 12px;
border-top-right-radius: 12px;
background-color: #292a2e;


.heading {
    h1 {

        span {
            color: #fb6e00;
        }
        font-family: Teko;
        font-size: 30px;
        font-weight: 600;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #f2f2f2;
    }
}






.close__box {
    position:absolute;
    top:25px;
    right:25px;
    color:#688fbd;
    font-size:25px;
    cursor:pointer;
}


`;

const Boosters = Styled.div`

display:flex;
flex-wrap:wrap;
justify-content:space-between;
align-items:center;


`;

const BoosterWrapper = Styled.div`
cursor:pointer;
 margin-top:20px;
 margin-bottom:20px;
text-align:center;

.imageHolder {

    position:relative;


    .lock {
        position:absolute;
        bottom:2px;
        right:20px;
    }
}


p {
    margin-top:4px;
    font-family: Teko;
  font-size: 18px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;

  color: #f2f2f2;
}

.socails {

 display:flex;
   

  p {
    margin-top:6px;
      margin-right:4px;
    font-family: Poppins;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    text-align:left;
    letter-spacing: normal;
    
  }
}



.numberBox {
    margin-top:6px;


    p{
        display:flex;
justify-content:center;
align-items:center;
      
        border-radius: 10px;
        background-color: rgba(104, 143, 189, 0.3);
        width: 80px;
        height: 28px;
  font-family: Poppins;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;

  color: #f2f2f2;


    }
}

`;

export { ModalHeader, ModalFooter, Boosters, BoosterWrapper };
