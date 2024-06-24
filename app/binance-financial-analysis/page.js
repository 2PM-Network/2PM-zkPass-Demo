import BackToTop from "../backToTop";
import BalanceFinancialPage from "./index";

export const metadata = {
  title: "Binance Balance Analysis - 2PM.Network",
  description: "2PM.Network - Public, Privacy, Models",
};

const ImageGeneratorLayout = () => {
  return (
    <>
      <BalanceFinancialPage />
      <BackToTop />
    </>
  );
};

export default ImageGeneratorLayout;
