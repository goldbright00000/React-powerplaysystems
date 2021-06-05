import Styled from "styled-components";

const BannerWrapper = Styled.section`

    background: url(/images/baseball-player.png);
    background-position: right 28px bottom 5px;
    background-size: contain;
    background-repeat: no-repeat;
    background-color: #17181a;
    margin-top:-1px;

    h1{
        padding-top: 95px;
        margin-bottom: 6px;
        font-family: "Teko", sans-serif;
        font-size: 42px;
        line-height: 45px;
        font-weight: bold;
        color: #f2f2f2;
        .color {
            color: #fb6e00;
        }
    }
    h2{
        margin-bottom: 30px;
       
            font-family: "Teko", sans-serif;
            font-size: 20px;
            line-height: 24px;
            font-weight: 600;
            color: #f2f2f2;
          

        .ten{
            margin-left: 5px;
        }
        .tens{
            font-size: 14px;
            font-weight: 200;
            font-family: 'Poppins', sans-serif;
            color: rgba(242, 242, 242, 0.6);
        }
    }



`;

export { BannerWrapper };
