import { Image } from "@vechaiui/react";

export default function NFT({ src, title }) {
  return (
    <div className="flex justify-center flex-col items-center">
      <div>{title}</div>
      <div className="flex flex-wrap w-full p-4 space-x-4">
        <Image
          alt="bruce wayne"
          htmlWidth={100}
          htmlHeight={100}
          className="object-cover"
          src={src}
        />
      </div>
    </div>
  );
}
