import Styled from "styled-components";

const PoolWrapper = Styled.div`

.wrap {

    display:flex;
    justify-content:center;
    align-items:center;
    border-radius: 8px;
  box-shadow: 0 2px 24px 0 rgba(0, 0, 0, 0.3);
  background-color: #292a2e;
margin:0 auto;
  width: 347px;
  height: 110px;


  div {
    text-align:center;

    h1 {
      font-family: Teko;
  font-size: 42px;
  font-weight: bold;
 
 

  color: #fb6e00;
  margin:0;
    }

     p{
       margin:0;
      font-family: Poppins;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      
      color: #979797;
     }
  }
}


.liveGame {
  
  padding-top:32px;
  padding-bottom:43px;
  display:flex;
  justify-content:center;
  align-items:center;


  img {
    margin-right:8px;
  }
  h3 {
    font-family: Poppins;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #f2f2f2;
  }
}
  
`;

const CardWrapper = Styled.div`

padding-bottom:50px;

.heading {
  margin:0 auto;
padding-left:15px;
padding-right:15px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  width: 347px;
height: 50px;
border-radius: 4px;
box-shadow: 0 4px 17px 4px rgba(0, 0, 0, 0.08);
background-color: #292a2e;

p {
  font-family: Poppins;
  font-size: 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 2;
  letter-spacing: normal;
  color: #ffffff;

}

}

.players {
 
  &:last-child {
 
  }
  display:flex;
  justify-content:space-between;
  align-items:center;
  width: 347px;
  height: 50px;
  border-radius: 4px;
  box-shadow: 0 4px 17px 4px rgba(0, 0, 0, 0.08);
  background-color: #292a2e;
  margin:0 auto;
  padding-left:15px;
  padding-right:15px;
  margin-top:8px;

  p {
    font-family: Poppins;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2;
  letter-spacing: normal;
  color: #f2f2f2;
  }



  button {
    border:none;
    width: 60px;
    height: 28px;
    border-radius: 8px;
    font-family: Poppins;
    font-size: 12px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #000000;
    background-color: #688fbd;
  }


}


.active {
  border-radius: 4px;
  border: solid 1px rgba(251, 110, 0, 0.4);
  background-color: rgba(251, 110, 0, 0.2);

  p{
    font-family: Poppins;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.71;
  letter-spacing: normal;
  color: #fb6e00;
  }

  button {
    background-color: #fb6e00;
  }
}
`;

export { PoolWrapper, CardWrapper };
