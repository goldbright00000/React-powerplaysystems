import Styled from "styled-components";

const SwapWrapper = Styled.div`
padding:72px 14px 0px 14px;
position:relative;
.heading {
    text-align: center;

   h2 {
    font-family: Teko;
    font-size: 44px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.25;
    letter-spacing: normal;
    color: #f2f2f2;
    
   }

    p {
        font-family: Poppins;
        font-size: 16px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
     
        color: #f2f2f2;
    }

    h1 {
        margin:22px auto 0px auto;
        display:flex;
        justify-content:center;
        align-items:Center;
        width: 184px;
  height: 34px;
        border-radius: 4px;
  background-color: #fb6e00;
  font-family: Poppins;
  font-size: 20px;
  font-weight: 700;
  font-stretch: normal;
  font-style: normal;
 
  letter-spacing: normal;
  text-align: center;
  color: #111111;
    }

}


.close__box {
    position:absolute;
    top:25px;
    right:25px;
    color:#f2f2f2;
    font-size:20px;
}
`;

const SearchFields = Styled.div`
margin-top:${props => (props.space === true ? "0px" : "30px")} ;
padding-bottom:${props => (props.space === true ? "20px" : "0px")} ;
display:flex;

    align-items: center;
    justify-content: center;

.input__search {
   
    position:relative;
  

  input {
     
      border:none;
      width: 216px;
      padding:10px 13px 13px 13px;
    border-radius: 12px;
    background-color: #35363a;
    &::placeholder {
        padding-left:20px;
        font-family: Poppins;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #909192;
    }
  }

    img {
       
        position:absolute;
        top:15px;
        left:10px;
        width:15px;
        height:15px;
    }
}


.select__feilds {
position:relative;
    
margin-left:10px;
select {

    padding-left:16px;

    height: 46px;

    border:none;
    border-radius: 12px;
    background-color: #35363a;
    width: 121px;
    font-family: Poppins;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #f2f2f2;
   
    /* Appearance: none will hide the default arrow */
    appearance: none;
    /* Best to include the browser prefix for cross-browser compatibility */
    -webkit-appearance: none;
    -moz-appearance: non
   
 
}


img {
    position:absolute;
    top:20px;
    right:12px;
}

}

`;

const PlayerWrapper = Styled.div`
     position:relative;
width: 347px;
height: 184px;
margin: 20px auto;
padding: 16px 16px 12px;
border-radius: 5px;
box-shadow: 0 8px 25px 0 rgba(127, 127, 127, 0.06);
background-color: #292a2e;


.heading {

    h2 {
        span {
            margin-right:15px;
            font-weight: 900;
  font-style: italic;
        }
        font-family: Poppins;
  font-size: 18px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #688fbd;
  text-align:left;
    }
}


table {
    margin-top:10px;
        border-left:solid 3px #688fbd;

    thead {
       
    th {
      display:inline-block; 
   margin-right:30px;
  opacity: 0.6;
  font-family: Poppins;
  font-size: 10px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #f2f2f2;


  &:first-child {
      margin-left:11px;
  }
    }

    }

    tbody {
        display:inline-block; 
       td {
        margin-right:21px;
        display:inline-block; 
        font-family: Poppins;
        font-size: 16px;
        font-weight: 600;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: center;
        color: #f2f2f2;
        &:first-child {
            margin-left:11px;
        }
       }

    }
}


P {
    margin-top:10px;
    font-family: Poppins;
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #f2f2f2;

  span {
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


button {
    position:absolute;
    top:16px;
    right:16px;
 img {
     margin-right:6px;
 }

    display:flex;
    align-items:center;
    justify-content:center;
    border:none;
    width: 96px;
    height: 36px;
    border-radius: 8px;
    background-color: #688fbd;
    font-family: Poppins;
    font-size: 14px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #f2f2f2;
  }


`;

const Icons = Styled.div`
margin-top:10px;
  display:flex;
  div {
      display:flex;
  align-items:center;

  img {
      margin-right:4px;
  }
  p{
      margin:0;
      margin-right:16px;
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

export { SwapWrapper, SearchFields, PlayerWrapper, Icons };
