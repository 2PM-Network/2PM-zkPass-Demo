"use client";

import React from "react";
import Context from "@/context/Context";

import BackToTop from "../backToTop";
import HeaderDashboard from "@/components/Header/HeaderDashboard";
import Modal from "@/components/Common/Modal";
import FinancialDashboard from "@/components/FinancialReport/FinancialDashboard";
import ZkpassBinance from "@/components/FinancialReport/ZkpassBinance";

const BalanceFinancialPage = () => {
  const [messages, setMessages] = React.useState([]);

  return (
    <>
      <main className="page-wrapper rbt-dashboard-page">
        <div className="rbt-panel-wrapper">
          <Context>
            <HeaderDashboard display="" />
            <Modal />

            <div className="rbt-main-content">
              <div className="rbt-daynamic-page-content">
                <div className="rbt-dashboard-content">
                  <div className="content-page">
                    <div className="chat-box-section">
                      <ZkpassBinance messages={messages} />
                      <FinancialDashboard messages={messages} setMessages={setMessages} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <BackToTop />
          </Context>
        </div>
      </main>
    </>
  );
};

export default BalanceFinancialPage;
