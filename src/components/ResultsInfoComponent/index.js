
import React, { useState } from "react";
import PropTypes from "prop-types";
import Accordian from "../Accordian";

const data = [
  {
    cashTitle: "Total: ",
    cash: "$4500",
    dataTitle: "Cash Prize",
    type: "cashBalance",
    balanceType: "cash",
  },
  {
    cashTitle: "Total: ",
    cash: "$4500",
    dataTitle: "Collected",
    type: "tokenBalance",
    balanceType: "token",
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
        />
      ))}
    </>
  );

}

ResultsInforComponent.propTypes = {
  isMobile: PropTypes.bool,
};

export default ResultsInforComponent;
