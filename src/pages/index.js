import React, { useContext, useEffect, useState } from "react";
import { trackingContext } from "../../context/TrackingContext";
import {
  Table,
  StartShipment,
  Services,
  Profile,
  CompleteShipment,
  GetShipment,
  Form,
} from "../../components";

const index = () => {
  const {
    currentUser,
    getAllShipment,
    getShipment,
    startShipment,
    completeShipment,
    createShipment,
    getShipmentCount,
  } = useContext(trackingContext);

  //state variables
  const [startShipmentModal, setstartShipmentModal] = useState(false);
  const [CreateShipmentModal, setCreateShipmentModal] = useState(false);
  const [CompleteShipmentModal, setCompleteShipmentModal] = useState(false);
  const [GetShipmentModal, setGetShipmentModal] = useState(false);
  const [OpenProfile, setOpenProfile] = useState(false);

  //data variables
  const [AllShipmentsData, setAllShipmentsData] = useState([]);
  //fetching data
  useEffect(() => {
    const getCampaignData = getAllShipment();
    return async () => {
      const allData = await getCampaignData;
      setAllShipmentsData(allData);
    };
  }, []);
  return (
    <>
      <Services
        setGetShipmentModal={setGetShipmentModal}
        setCompleteShipmentModal={setCompleteShipmentModal}
        setstartShipmentModal={setstartShipmentModal}
        setOpenProfile={setOpenProfile}
      />
      <Table
        AllShipmentsData={AllShipmentsData}
        setCreateShipmentModal={setCreateShipmentModal}
      />
      <Form
        CreateShipmentModal={CreateShipmentModal}
        setCreateShipmentModal={setCreateShipmentModal}
        createShipment={createShipment}
      />
      <Profile
        setOpenProfile={setOpenProfile}
        OpenProfile={OpenProfile}
        currentUser={currentUser}
        getShipmentCount={getShipmentCount}
      />
      <CompleteShipment
        completeShipment={completeShipment}
        setCompleteShipmentModal={setCompleteShipmentModal}
        CompleteShipmentModal={CompleteShipmentModal}
      />
      <GetShipment
        getShipment={getShipment}
        GetShipmentModal={GetShipmentModal}
        setGetShipmentModal={setGetShipmentModal}
      />

      <StartShipment
        startShipmentModal={startShipmentModal}
        setstartShipmentModal={setstartShipmentModal}
        startShipment={startShipment}
      />
    </>
  );
};

export default index;
