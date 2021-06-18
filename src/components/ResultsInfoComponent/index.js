import React, { useState } from "react";
import PropTypes from "prop-types";
import Accordian from "../Accordian";
import Power from "../../assets/power-play-sidebar-icon.png";
import Token from "../../assets/points-collected.png";
import Bitcoin from "../../assets/bitcoin.png";
import Ethereum from "../../assets/ethereum.png";
import { printLog } from "../../utility/shared";

const data = [
  {
    cashTitle: "Total: ",
    cash: "$4500",
    dataTitle: "USD Cash Prizes",
    type: "cashBalance",
    balanceType: "cash",
    iconWithTitle: Token,
  },
  {
    cashTitle: "Total : ",
    cash: "5,000",
    dataTitle: "Power Token Prizes",
    type: "tokenBalance",
    balanceType: "pwrs",
    iconWithTitle: Power,
  },
  {
    cashTitle: "Total: ",
    cash: "$4500",
    dataTitle: "Bitcoin Prizes",
    type: "btcBalance",
    balanceType: "eth",
    iconWithTitle: Bitcoin,
  },
  {
    cashTitle: "Total: ",
    cash: "$4500",
    dataTitle: "Ethereum Prizes",
    type: "ethBalance",
    balanceType: "btc",
    iconWithTitle: Ethereum,
  },
];

function ResultsInforComponent(props) {
  const [activeTab, setActiveTab] = useState();
  const { isMobile = false, balance = {}, transactions = [] } = props || {};
  const onClickAccordian = (index) => {
    setActiveTab(activeTab === null ? index : null);
    printLog(balance);
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
            (transaction) =>
              transaction.balance_type == v.balanceType &&
              transaction?.transaction_type_details?.type === "Prize"
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
