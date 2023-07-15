import React, { useState } from "react";
import { Str1 } from ".";

const StartShipment = ({
  startShipmentModal,
  setstartShipmentModal,
  startShipment,
}) => {
  const [product, setProduct] = useState({
    reciever: "",
    index: "",
  });
  const startShipmentFunc = () => {
    startShipment(product);
  };
  return startShipmentModal ? (
    <div className="fixed inset-0 overflow-y-auto z-10">
      <div
        className="fixed inset-0  w-full h-full bg-black opacity-40"
        onClick={() => setstartShipmentModal(false)}
      ></div>
      <div className="flex items-center px-4 py-8 min-h-screen">
        <div className="relative w-full bg-white rounded-md shadow-lg mx-auto p-4 max-w-lg">
          <div className="flex justify-end">
            <button
              className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
              onClick={() => setstartShipmentModal(false)}
            >
              {Str1}
            </button>
          </div>
          <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
            <h4 className="text-gray-700 text-lg font-medium">
              Start The Shipment
            </h4>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mt-3 relative">
                <input
                  type="text"
                  placeholder="Receiver"
                  className="text-gray-500 w-full bg-transparent pl-5 pr-3 py-2 outline-none border shadow-sm rounded-lg focus:border-indigo-600"
                  onChange={(e) =>
                    setProduct({ ...product, reciever: e.target.value })
                  }
                />
              </div>
              <div className="mt-3 relative">
                <input
                  type="text"
                  placeholder="Id"
                  className="text-gray-500 w-full bg-transparent pl-5 pr-3 py-2 outline-none border shadow-sm rounded-lg focus:border-indigo-600"
                  onChange={(e) =>
                    setProduct({ ...product, index: e.target.value })
                  }
                />
              </div>

              <button
                onClick={() => startShipmentFunc()}
                className="block w-full mt-3 text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-sm font-medium py-3 px-4 rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2"
              >
                Start Shipment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default StartShipment;
