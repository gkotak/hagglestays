import { useState } from "react";
import HaggleStayNav from "@/components/HaggleStayNav";
import SearchScreen from "@/screens/SearchScreen";
import FlexibilityScreen from "@/screens/FlexibilityScreen";
import ResultsScreen from "@/screens/ResultsScreen";
import CommitmentScreen from "@/screens/CommitmentScreen";
import NegotiationScreen from "@/screens/NegotiationScreen";
import ConfirmationScreen from "@/screens/ConfirmationScreen";
import { Hotel } from "@/data/mockData";

type Screen = "search" | "flexibility" | "results" | "commitment" | "negotiation" | "confirmation";

const screenIndex: Record<Screen, number> = {
  search: 0, flexibility: 1, results: 2, commitment: 3, negotiation: 4, confirmation: 5,
};

const Index = () => {
  const [screen, setScreen] = useState<Screen>("search");
  const [tradeOffs, setTradeOffs] = useState<string[]>([]);
  const [selectedHotels, setSelectedHotels] = useState<Hotel[]>([]);
  const [confirmedHotel, setConfirmedHotel] = useState<Hotel | null>(null);
  const [confirmedPrice, setConfirmedPrice] = useState(0);
  const [confirmedFee, setConfirmedFee] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      <HaggleStayNav currentStep={screenIndex[screen]} />
      {screen === "search" && <SearchScreen onSearch={() => setScreen("flexibility")} />}
      {screen === "flexibility" && (
        <FlexibilityScreen
          onContinue={(sel) => {
            setTradeOffs(sel);
            setScreen("results");
          }}
        />
      )}
      {screen === "results" && (
        <ResultsScreen
          onSelect={(hotels) => {
            setSelectedHotels(hotels);
            setScreen("commitment");
          }}
        />
      )}
      {screen === "commitment" && (
        <CommitmentScreen
          hotels={selectedHotels}
          tradeOffs={tradeOffs}
          onCommit={() => setScreen("negotiation")}
        />
      )}
      {screen === "negotiation" && (
        <NegotiationScreen
          hotels={selectedHotels}
          onChooseDeal={(hotel, price, fee) => {
            setConfirmedHotel(hotel);
            setConfirmedPrice(price);
            setConfirmedFee(fee);
            setScreen("confirmation");
          }}
        />
      )}
      {screen === "confirmation" && confirmedHotel && (
        <ConfirmationScreen
          hotel={confirmedHotel}
          negotiatedPrice={confirmedPrice}
          fee={confirmedFee}
          onRestart={() => setScreen("search")}
        />
      )}
    </div>
  );
};

export default Index;
