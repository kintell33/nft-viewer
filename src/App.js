import "./App.css";
import {
  VechaiProvider,
  Button,
  Input,
  Spinner,
  Icon,
  InfoIcon,
} from "@vechaiui/react";
import NFT from "./components/NFT";
import { useState } from "react";
import { theme } from "./styles/themes";
import { footer, container, title, nftsCotnainer } from "./styles/styles";

function App() {
  const [address, setAddress] = useState("");
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("This can take a while");
  const [showMessage, setShowMessage] = useState(false);

  const handleMessage = (message) => {
    setMessage(message);
    setShowMessage(true);
  };

  const handleGetNft = () => {
    try {
      setLoading(true);
      setNfts([]);
      handleMessage("This can take a while");
      fetch(`${process.env.REACT_APP_BACKEND_URL}/nft?address=${address}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Something went wrong");
        })
        .then((data) => {
          setNfts(data);
          setLoading(false);
          setShowMessage(false);
        })
        .catch((err) => {
          handleMessage(err.message);
          setLoading(false);
        });
    } catch (err) {
      handleMessage(err.message);
    }
  };

  return (
    <VechaiProvider theme={theme} colorScheme="midnight">
      <div style={container}>
        <div style={title}>NFT Viewer on Rinkeby</div>
        <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
          <Input
            placeholder="wallet address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          ></Input>
          <Button
            onClick={() => {
              handleGetNft();
            }}
          >
            View
          </Button>
        </div>
        {!showMessage || (
          <div className="flex flex-row">
            <Icon
              as={InfoIcon}
              label="info"
              className="w-6 h-6 text-blue-500"
            />
            <p>{message}</p>
          </div>
        )}
        <div style={nftsCotnainer}>
          {loading ? <Spinner /> : ""}
          {nfts.map((nft, index) => {
            return <NFT key={index} metadata={nft.image} title={nft.title} description={nft.description}></NFT>;
          })}
        </div>
      </div>
      <div className="flex justify-center align-center" style={footer}>
        by kintell33
      </div>
    </VechaiProvider>
  );
}

export default App;
