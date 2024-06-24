import BackToTop from "./backToTop";
import HomePage from "./home/page";

export const metadata = {
  title: "2PM.Network",
  description: "2PM.Network - Public, Privacy, Models",
};

export default function Home() {
  return (
    <main>
      <HomePage />
      <BackToTop />
    </main>
  );
}
