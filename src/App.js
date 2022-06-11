import logo from "./logo.svg";
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

  const handleMessage = (message) => {
    setMessage(message);
    setShowMessage(true);
  };

  const handleGetNft = () => {
    try {
      console.log('calling');
      setLoading(true);
      handleMessage("This can take a while");
      fetch(`http://localhost:3001/nft?address=${address}`)
        .then((response) => {
          console.log('response', response);
          if (response.ok) {
            return response.json();
          }
          throw new Error("Something went wrong");
        })
        .then((data) => {
          console.log("data", data);
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
          {nfts.map((nft) => {
            return <NFT src={nft.image} title={nft.title}></NFT>;
          })}
        </div>
      </div>
    </VechaiProvider>
  );
}

export default App;
