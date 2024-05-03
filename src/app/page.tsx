import Header from "./components/header";
import QuickSearch from "./components/quickSearch";
import RecommendedTrips from "./components/recommendedTrips";


export default function Home() {
  return (
    <div className="flex flex-col m-auto max-w-7xl">
      <Header/>
      <QuickSearch/>
      <RecommendedTrips/>
    </div>
  );
}
