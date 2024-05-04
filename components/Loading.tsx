import React from "react";
import SyncLoader from "react-spinners/SyncLoader";

const Loading = () => {
  return (
    <div className="h-full w-full flex md:block items-center justify-center text-center">
      <SyncLoader size={10} color="#7E22CE" />
    </div>
  );
};

export default Loading;
