import React, { useState } from "react";
import PropTypes from "prop-types";
import Accordian from "../Accordian";
import Token from '../../assets/points-collected.png';
import Bitcoin from '../../assets/bitcoin.png';
import Ethereum from '../../assets/ethereum.png';

const data = [
  {
    cashTitle: "Total: ",
    cash: "$4500",
    dataTitle: "USD Cash Prizes",
    type: "cashBalance",
    balanceType: "cash",
    iconWithTitle: ''
  },
  {
    cashTitle: "Total Tokens: ",
    cash: "5,000",
    dataTitle: "Power Token Prizes",
    type: "tokenBalance",
    balanceType: "token",
    iconWithTitle: Token
  },
  {
    cashTitle: "",
    cash: "$4500",
    dataTitle: "Bitcoin Prizes",
    type: "tokenBalance",
    balanceType: "token",
    iconWithTitle: Bitcoin
  },
  {
    cashTitle: "",
    cash: "$4500",
    dataTitle: "Ethereum Prizes",
    type: "tokenBalance",
    balanceType: "token",
    iconWithTitle: Ethereum
  },
];

function ResultsInforComponent(props) {
  const [activeTab, setActiveTab] = useState();
  const { isMobile = false, balance = {}, transactions = {} } = props || {};
  const onClickAccordian = (index) => {
    setActiveTab(activeTab === null ? index : null);
    console.log(balance);
  };


  return (
    <>
      {data.map((v, ind) => (
        <Accordian
          title={v.dataTitle}
          visible={ind === activeTab}
          onClick={() => onClickAccordian(ind)}
          cashTitle={v.cashTitle}
          cash={balance[v.type]}
          key={ind.toString()}
          isMobile={isMobile}
          transactions={transactions?.filter(
            (transaction) => transaction.balance_type == v.balanceType
          )}
          iconWithTitle={v.iconWithTitle}
        />
      ))}
    </>
  );

}

ResultsInforComponent.propTypes = {
  isMobile: PropTypes.bool,
};

export default ResultsInforComponent;
