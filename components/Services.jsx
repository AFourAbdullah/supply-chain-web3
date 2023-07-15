import React from "react";
import Images from "../Images";
import Image from "next/image";

const Services = ({
  setGetShipmentModal,
  setOpenProfile,
  setstartShipmentModal,
  setCompleteShipmentModal,
}) => {
  const team = [
    { avatar: Images.compShipment },
    { avatar: Images.getShipment },
    { avatar: Images.startShipment },
    { avatar: Images.userProfile },
    { avatar: Images.shipCount },
    { avatar: Images.send },
  ];
  const openBoxModal = (text) => {
    if (text === 1) {
      setCompleteShipmentModal(true);
    } else if (text === 2) {
      setGetShipmentModal(true);
    } else if (text === 3) {
      setstartShipmentModal(true);
    } else if (text === 4) {
      setOpenProfile(true);
    }
  };
  return (
    <section className="py-0 pb-14">
      <div className="px-4 md:px-8 max-w-screen-xl mx-auto ">
        <div className="mt-12">
          <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {team.map((item, i) => (
              <li key={i}>
                <div
                  onClick={() => openBoxModal(i + 1)}
                  className="w-full h-60 md:h-56 sm:h-52 cursor-pointer"
                >
                  <Image
                    src={item.avatar}
                    className="w-full h-full object-cover shadow-md rounded-xl object-center "
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Services;
