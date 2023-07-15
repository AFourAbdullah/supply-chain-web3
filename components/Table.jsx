import React from "react";

const Table = ({ AllShipmentsData, setCreateShipmentModal }) => {
  const convertTime = (time) => {
    const newTime = new Date(time);
    const dateTime = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(newTime);
    return dateTime;
  };
  console.log(AllShipmentsData);
  return (
    <div className="px-4 md:px-8 max-w-screen-xl mx-auto">
      <div className="md:flex items-start justify-between">
        <div className="max-w-lg">
          <h3 className="font-bold text-gray-800 text-xl sm:text-2xl">
            Create Shipment
          </h3>
          <p className=" text-gray-600 mt-2">
            Lorem ipsum is a placeholder text commonly used to demonstrate the
            visual form of a document or a typeface without relying on
            meaningful content.
          </p>
        </div>
        <div className="mt-3 md:mt-0">
          <p
            className="py-2 px-4 inline-block cursor-pointer text-white duration-150 font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 md:text-sm rounded-lg md:inline-flex"
            onClick={() => setCreateShipmentModal(true)}
          >
            Add Tracking
          </p>
        </div>
      </div>
      <div className="shadown-sm rounded-lg border overflow-x-auto mt-12">
        <table className="text-left table-auto text-sm w-full">
          <thead className="border-b text-gray-600 bg-gray-50 font-medium">
            <tr key="">
              <th className="py-3 px-6">Sender</th>
              <th className="py-3 px-6">Receiver</th>
              <th className="py-3 px-6">Pickup Time</th>
              <th className="py-3 px-6">Distance</th>
              <th className="py-3 px-6">Delivery Time</th>
              <th className="py-3 px-6">Price</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6">Paid</th>
            </tr>
          </thead>
          <tbody className=" text-gray-600 divide-x">
            {AllShipmentsData?.map((shipment, idx) => (
              <tr key={idx}>
                <td className="px-4 py-6 whitespace-nowrap">
                  {shipment.sender.slice(0, 15)}..
                </td>
                <td className="px-4 py-6 whitespace-nowrap">
                  {shipment.reciver.slice(0, 15)}..
                </td>
                <td className="px-4 py-6 whitespace-nowrap">
                  {convertTime(shipment.pickUpTime)}..
                </td>
                <td className="px-4 py-6 whitespace-nowrap">
                  {shipment.distance} Km
                </td>
                <td className="px-4 py-6 whitespace-nowrap">
                  {shipment.deliveryTime}
                </td>
                <td className="px-4 py-6 whitespace-nowrap">
                  {shipment.price}
                </td>
                <td className="px-4 py-6 whitespace-nowrap">
                  {shipment.status == 0
                    ? "Pending"
                    : shipment.status == 1
                    ? "In Transmit"
                    : "Delivered"}
                </td>
                <td className="px-4 py-6 whitespace-nowrap">
                  {shipment.isPaid ? "Completed" : "Not Completed"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
