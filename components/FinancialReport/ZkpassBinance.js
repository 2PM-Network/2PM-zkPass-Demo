"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import sal from "sal.js";

import imgPhoto from "../../public/images/logo/favicon.ico";
import TopBar from "../Common/TopBar";
import TransgateConnect from "@zkpass/transgate-js-sdk";
import { verifyEVMMessageSignature } from "./zkPassHelper";

const ZkpassBalance = () => {
  const appid = "31cce983-bb75-4bca-a7b1-b0e439676c81";
  const schema1 = "e6c99901a67f4dd498f4dd6368aac882";
  const schema2 = "9a1d39d85a1a4cc1acb13c4072488ca3";

  const [result, setResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", message: "" });

  useEffect(() => {
    sal();
  }, []);

  const start = async (schemas, appid) => {
    setLoading(true);
    try {
      const connector = new TransgateConnect(appid);

      const isAvailable = await connector.isTransgateAvailable();
      if (!isAvailable) {
        setLoading(false);
        showModalMessage("Error", "Please install zkPass TransGate");
        return;
      }

      const resultList = [];
      const verifyList = [];
      for (const schemaId of schemas) {
        const res = await connector.launch(schemaId);
        resultList.push(res);

        const verifyResult = verifyEVMMessageSignature(
          res.taskId,
          schemaId,
          res.uHash,
          res.publicFieldsHash,
          res.validatorSignature,
          res.validatorAddress
        );
        console.log("verifyResult", verifyResult);
        verifyList.push(verifyResult);
        setResult(resultList);
      }

      setLoading(false);

      if (verifyList.length === 2) {
        if (verifyList[0] === true && verifyList[1] === true) {
          showModalMessage(
            "🎉 Congratulations!",
            "You are an experienced trader. Your investment in Future assets shows maturity."
          );
        } else {
          showModalMessage(
            "💪 Room for Improvement",
            "Your trading skills still need improvement. Try diversifying your investment portfolio."
          );
        }
      }
    } catch (err) {
      setLoading(false);
      showModalMessage("Error", JSON.stringify(err));
      console.log("error", err);
    }
  };

  const showModalMessage = (title, message) => {
    setModalContent({ title, message });
    setShowModal(true);
  };

  const Modal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 p-8 rounded-2xl text-white max-w-3xl w-full transform transition-all duration-300 ease-in-out scale-95 hover:scale-100 shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-indigo-300">{modalContent.title}</h2>
        <p className="mb-6 text-gray-300">{modalContent.message}</p>

        <div className="mb-6">
          <button
            onClick={() => setShowResult(!showResult)}
            className="text-indigo-400 hover:text-indigo-300 transition duration-300 underline"
          >
            {showResult ? "Hide" : "Show"} Result Details
          </button>

          {showResult && (
            <div className="mt-4 bg-gray-700 p-4 rounded-lg">
              <div className="h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800">
                <pre className="text-sm text-gray-300 whitespace-pre-wrap break-words">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => setShowModal(false)}
            className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );

  const LoadingAnimation = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-50">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white mb-4"></div>
      <p className="text-white mb-4">Verifying your data...</p>
      <button
        onClick={() => setLoading(false)}
        className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
      >
        Cancel
      </button>
    </div>
  );

  return (
    <div className="bg-gray-900 min-h-screen text-gray-100">
      <TopBar padding={true} barImg={imgPhoto} title="Balance Financial Analysis" wdt={24} htd={24} />

      <div className="px-16">
        <h1 className="text-4xl font-bold text-white mb-4">zkPass Proof</h1>

        <div className="mb-6">
          <h2 className="text-3xl font-semibold text-gray-300 mb-2">Feature Overview</h2>
          <p className="text-gray-400">
            We used zkPass to implement this Crypto Balance Analysis tool which leverages advanced cryptographic
            techniques. It provides a comprehensive view of your cryptocurrency assets while maintaining your privacy.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-900 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-300 mb-2">Asset Verification</h3>
            <p className="text-gray-300">
              Using zkPass technology, we securely verify your cryptocurrency holdings on various blockchains without
              exposing your private information.
            </p>
          </div>

          <div className="bg-green-900 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-300 mb-2">Transaction Habit Analysis</h3>
            <p className="text-gray-300">
              Our advanced model analyzes your transaction patterns to provide personalized insights and recommendations
              for optimizing your crypto strategy.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-3xl font-semibold text-gray-300 mb-2">How It Works</h2>
          <ul className="list-decimal list-inside text-gray-500">
            <li className="text-2xl">Connect your wallet securely using zkPass protocols</li>
            <li className="text-2xl">Our system verifies your assets without accessing sensitive data</li>
            <li className="text-2xl">Advanced algorithms analyze your transaction history</li>
            <li className="text-2xl">Receive personalized insights and recommendations</li>
          </ul>
        </div>

        <div className="mt-8 text-center">
          <button
            className="bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
            onClick={() => start([schema1, schema2], appid)}
          >
            Start Your Analysis Now
          </button>
        </div>
      </div>
      {loading && <LoadingAnimation />}
      {showModal && <Modal />}
    </div>
  );
};

export default ZkpassBalance;
