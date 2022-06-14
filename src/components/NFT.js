import { Image } from "@vechaiui/react";
import { useState } from "react";

export default function NFT({ metadata, title, description }) {
  const [imageSrc, setImageSrc] = useState("");

  const handleDiscover = (metadata) => {
    setImageSrc(metadata.replace('ipfs://','https://ipfs.io/ipfs/'));
    console.log('seted');
  }

  return (
    <div className="flex justify-center flex-col items-center">
      <div>{title}</div>
      <div className="flex flex-wrap w-full p-4 space-x-4">

          <Image
            alt={description}
            htmlWidth={100}
            htmlHeight={100}
            className="object-cover"
            src={metadata.replace('ipfs://','https://ipfs.io/ipfs/')}
          />
        
      </div>
    </div>
  );
}
