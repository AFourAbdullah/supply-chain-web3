import React, { useState } from "react";

const Form = ({
  CreateShipmentModal,
  setCreateShipmentModal,
  createShipment,
}) => {
  const [shipment, setShipment] = useState({
    receiver: "",
    pickupTime: "",
    price: "",
    distance: "",
  });
  const createItem = async () => {
    try {
      await createShipment(shipment);
    } catch (error) {
      console.log(error);
    }
  };
  return CreateShipmentModal ? (
    <div className="fixed inset-0 overflow-y-auto z-10">
      <div
        className="fixed inset-0  w-full h-full bg-black opacity-40"
        onClick={() => setCreateShipmentModal(false)}
      ></div>
      <div className="flex items-center px-4 py-8 min-h-screen">
        <div className="relative w-full bg-white rounded-md shadow-lg mx-auto p-4 max-w-lg">
          <div className="flex justify-end">
            <button
              className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
              onClick={() => setCreateShipmentModal(false)}
            >
              {Str1}
            </button>
          </div>
          <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
            <h4 className="text-gray-700 text-lg font-medium">
              Track Product,Create Shipment
            </h4>
            <p className="text-[15px] text-gray-500">
              Easiest and most secure way to create and track the shipments
            </p>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mt-3 relative">
                <input
                  type="text"
                  placeholder="receiver"
                  className="text-gray-500 w-full bg-transparent pl-5 pr-3 py-2 outline-none border shadow-sm rounded-lg focus:border-indigo-600"
                  onChange={(e) =>
                    setShipment({ ...shipment, receiver: e.target.value })
                  }
                />
              </div>
              <div className="mt-3 relative">
                <input
                  type="date"
                  placeholder="Pick Up Time"
                  className="text-gray-500 w-full bg-transparent pl-5 pr-3 py-2 outline-none border shadow-sm rounded-lg focus:border-indigo-600"
                  onChange={(e) =>
                    setShipment({ ...shipment, pickupTime: e.target.value })
                  }
                />
              </div>
              <div className="mt-3 relative">
                <input
                  type="text"
                  placeholder="Price"
                  className="text-gray-500 w-full bg-transparent pl-5 pr-3 py-2 outline-none border shadow-sm rounded-lg focus:border-indigo-600"
                  onChange={(e) =>
                    setShipment({ ...shipment, price: e.target.value })
                  }
                />
              </div>
              <div className="mt-3 relative">
                <input
                  type="text"
                  placeholder="Distance"
                  className="text-gray-500 w-full bg-transparent pl-5 pr-3 py-2 outline-none border shadow-sm rounded-lg focus:border-indigo-600"
                  onChange={(e) =>
                    setShipment({ ...shipment, distance: e.target.value })
                  }
                />
              </div>
              <button
                onClick={() => createItem()}
                className="block w-full mt-3 text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-sm font-medium py-3 px-4 rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2"
              >
                Create Shipment
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

export default Form;
