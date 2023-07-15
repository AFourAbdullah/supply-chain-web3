import React, { useState } from "react";
import { Str1 } from ".";

const GetShipment = ({
  getShipment,
  GetShipmentModal,
  setGetShipmentModal,
}) => {
  const [singleShipmentData, setSingleShipmentData] = useState();
  const [index, setindex] = useState(0);
  const getSingleShipmentData = async () => {
    const shipmentData = await getShipment(index);
    setSingleShipmentData(shipmentData);
    console.log(shipmentData);
  };
  const convertTime = (time) => {
    const newTime = new Date(time);
    const dateTime = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(newTime);
    return dateTime;
  };
  return GetShipmentModal ? (
    <div className="fixed inset-0 overflow-y-auto z-10">
      <div
        className="fixed inset-0  w-full h-full bg-black opacity-40"
        onClick={() => setGetShipmentModal(false)}
      ></div>
      <div className="flex items-center px-4 py-8 min-h-screen">
        <div className="relative w-full bg-white rounded-md shadow-lg mx-auto p-4 max-w-lg">
          <div className="flex justify-end">
            <button
              className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
              onClick={() => setGetShipmentModal(false)}
            >
              {Str1}
            </button>
          </div>
          <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
            <h4 className="text-gray-700 text-lg font-medium">
              Product Tracking Details
            </h4>
            <p className="text-[15px] text-gray-500">
              Easiest and most secure way to create and track the shipments
            </p>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mt-3 relative">
                <input
                  type="text"
                  placeholder="Id"
                  className="text-gray-500 w-full bg-transparent pl-5 pr-3 py-2 outline-none border shadow-sm rounded-lg focus:border-indigo-600"
                  onChange={(e) => setindex(e.target.value)}
                />
              </div>
              <button
                onClick={() => getSingleShipmentData()}
                className="block w-full mt-3 text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-sm font-medium py-3 px-4 rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2"
              >
                Get Shipment Details
              </button>
            </form>
            {singleShipmentData == undefined ? (
              ""
            ) : (
              <div className="text-left">
                <p>Sender:{singleShipmentData.sender.slice(0, 25)}...</p>
                <p>Receiver:{singleShipmentData.receiver.slice(0, 25)}...</p>
                <p>PickUpTime{convertTime(singleShipmentData.pickUpTime)}..</p>
                <p>
                  Delivery Time{convertTime(singleShipmentData.deliveryTime)}..
                </p>
                <p>Distance: {singleShipmentData.distance} Km</p>
                <p>Price: {singleShipmentData.price}</p>
                <p>
                  Paid:{" "}
                  {singleShipmentData.isPaid ? "Completed" : "Not Completed"}
                </p>
                <p>
                  Status :{" "}
                  {singleShipmentData.status == 0
                    ? "Pending"
                    : singleShipmentData.status == 1
                    ? "In Transmit"
                    : "Delivered"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default GetShipment;
