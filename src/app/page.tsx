import Header from "./components/header";
import QuickSearch from "./components/quickSearch";
import RecommendedTrips from "./components/recommendedTrips";

export default function Home() {
  return (
    <div className="flex flex-col gap-5 m-auto max-w-screen-xl">
      <Header/>
      <QuickSearch/>
      <RecommendedTrips/>
    </div>
  );
}
