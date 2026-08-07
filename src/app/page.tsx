import Header from "./components/header";
import QuickSearch from "./components/quickSearch";
import RecommendedTrips from "./components/recommendedTrips";
import Testimonials from "./components/testimonials";
import Newsletter from "./components/newsletter";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 m-auto max-w-screen-xl pb-10">
      <Header/>
      <QuickSearch/>
      <RecommendedTrips/>
      <Testimonials/>
      <Newsletter/>
    </div>
  );
}
