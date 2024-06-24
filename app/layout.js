"use client";
import '../styles/globals.css';
import React, { useEffect } from "react";
import { Sora } from "@next/font/google";
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { cookieStorage, createStorage, cookieToInitialState } from 'wagmi';
import { sepolia, scrollSepolia } from 'wagmi/chains';
import Web3ModalProvider from '../context/Web3ModalProvider';

import "bootstrap/scss/bootstrap.scss";

// ========= Plugins CSS START =========
import "../public/css/plugins/feature.css";
import "../public/css/plugins/fontawesome-all.min.css";
import "../public/css/plugins/animation.css";
import "../node_modules/sal.js/dist/sal.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-tooltip/dist/react-tooltip.css";
// ========= Plugins CSS END =========

const sora = Sora({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
})

import "../public/scss/style.scss";

const walletMetadata = {
  name: '2PM.Network',
  description: 'Connect with your wallet',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID


const neox = {
  id: 12227331,
  name: 'Neo X',
  nativeCurrency: { name: 'GAS', symbol: 'GAS', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://neoxseed1.ngd.network/'] },
  },
  blockExplorers: {
    default: { name: 'NeoXScan', url: 'https://xt3scan.ngd.network/' },
  },
  contracts: {
  },
}

const chains = [sepolia, scrollSepolia, neox]

const config = defaultWagmiConfig({
  chains,
  projectId,
  walletMetadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
})

export default function RootLayout({ children }) {
  const initialState = config;

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <html lang="en">
      <Web3ModalProvider initialState={initialState}>
        <body className={sora.className} suppressHydrationWarning={true}>
          {children}
        </body>
      </Web3ModalProvider>
    </html>
  );
}
