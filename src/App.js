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
import { extendTheme, colors } from "@vechaiui/react";

const cool = {
  id: "cool",
  type: "dark",
  colors: {
    bg: {
      base: colors.coolGray["900"],
      fill: colors.coolGray["900"],
    },
    text: {
      foreground: colors.coolGray["100"],
      muted: colors.coolGray["300"],
    },
    primary: colors.cyan,
    neutral: colors.coolGray,
  },
};

export const midnight = {
  id: "midnight",
  type: "dark",
  colors: {
    bg: {
      base: colors.trueGray["900"],
      fill: colors.trueGray["900"],
    },
    text: {
      foreground: colors.trueGray["100"],
      muted: colors.trueGray["300"],
    },
    primary: colors.rose,
    neutral: colors.trueGray,
  },
};

const theme = extendTheme({
  cursor: "pointer",
  colorSchemes: {
    cool,
    midnight,
  },
});

function App() {
  const [address, setAddress] = useState("");
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("This can take a while");
  const [showMessage, setShowMessage] = useState(false);
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) - 120;

  const container = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "25px",
    flexDirection: "column",
    gap: "10px",
  };
  const title = { fontSize: "25px" };
  const nftsCotnainer = { display: "flex", flexWrap: "wrap", width: "270px" };
  const footer = {position:'absolute',left:0,bottom:0,right:0,top:`${vh}px`};

  const handleMessage = (message) => {
    setMessage(message);
    setShowMessage(true);
  };

  const handleGetNft = () => {
    try {
      setLoading(true);
      handleMessage("This can take a while");
      fetch(`http://localhost:4444/nft?address=${address}`)
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
          {nfts.map((nft,index) => {
            return <NFT key={index} src={nft.image} title={nft.title}></NFT>;
          })}
        </div>
      </div>
      <div className="flex justify-center align-center" style={footer}>by kintell33</div>
    </VechaiProvider>
  );
}

export default App;
