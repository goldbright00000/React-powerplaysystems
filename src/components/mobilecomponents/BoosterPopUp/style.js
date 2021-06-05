import Styled from "styled-components";

const ModalWrapper = Styled.div`
position:relative;
border-radius: 8px;
box-shadow: 0 2px 24px 0 rgba(0, 0, 0, 0.3);
background-color: #44464d;

padding:30px 18px;
width: 347px;
height: 240px;


h1 {
    font-family: Teko;
  font-size: 28px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  color: #fb6e00;
}


p {
    font-family: Teko;
  font-size: 28px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  color: #f2f2f2;
}


.close__box {
    position:absolute;
    top:25px;
    right:25px;
    color:#f2f2f2;
    font-size:15px;
    
}

`;

const BoxBooster = Styled.div`
width: 100px;
height: 90px;
border-radius: 8px;
background-color:${props =>
  props.margin === false
    ? "rgba(251, 110, 0, 0.1)"
    : "rgba(242, 242, 242, 0.1)"} ;
display:flex;
justify-content:center;
align-items:center;
margin-right:${props => (props.margin === false ? "0px" : "6px")};
border: ${props => (props.margin === false ? "solid 1px #fb6e00" : "none")};



`;
export { ModalWrapper, BoxBooster };
