import Header from "./components/header";
import QuickSearch from "./components/quickSearch";

export default function Home() {
  return (
    <div className="flex flex-col m-auto max-w-7xl">
      <Header/>
      <QuickSearch/>
    </div>
  );
}
