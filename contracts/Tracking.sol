// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract Tracking {
    enum ShipmentStatus{
        PENDING,IN_TRANSMIT,DELIVERED
    }
    struct Shipment{
        address sender;
        address receiver;
        uint256 pickUpTime;
        uint256 deliveryTime;
        uint256 price;
        uint256 distance;
        ShipmentStatus status;
        bool isPaid;
    }
   mapping (address => Shipment[]) shipments;
   uint256 public shipmentsCount;
   

   //shipment struct for frontend
     struct ShipmentType{
        address sender;
        address receiver;
        uint256 pickUpTime;
        uint256 deliveryTime;
        uint256 price;
        uint256 distance;
        ShipmentStatus status;
        bool isPaid;
    }
    ShipmentType[] public shipmentTypes;

    //events
    event ShipmentCreated(address indexed sender,address indexed receiver,uint256 price,uint256 distance,uint256 pickupTime);
    event ShipmentInTransmit(address indexed sender,address indexed receiver,uint256 pickupTime);
    event ShipmentDelivered(address indexed sender,address indexed receiver,uint256 deliveredTime);
    event ShipmentPaid(address indexed sender,address indexed receiver,uint256 price);
    constructor(){
        shipmentsCount=0;
    }

    //smart contracts functionality started
    function createShipment(address _receiver,uint256 _price,uint256 _pickupTime,uint256 _distance)public payable {
        require(msg.value==_price,"Payment amount must match the price");
        Shipment memory shipment=Shipment(msg.sender,_receiver,_pickupTime,0,_price,_distance,ShipmentStatus.PENDING,false);
        shipments[msg.sender].push(shipment);
        shipmentsCount++;
        shipmentTypes.push(
            ShipmentType(      
        msg.sender,_receiver,_pickupTime,0,_price,_distance,ShipmentStatus.PENDING,false
  )
        );
        emit ShipmentCreated(msg.sender,_receiver,_price,_distance,_pickupTime);
    }
    function startShipment(address _sender,address _receiver,uint256 _index) public{
        //first we found that particular shipment 
        Shipment storage shipment=shipments[_sender][_index];
        ShipmentType storage typeShipment=shipmentTypes[_index];
        require(shipment.receiver==_receiver,"Invalid receiver!");

        //below line means that status should be pending else shipment has been already sent
        require(shipment.status==ShipmentStatus.PENDING,"Shipment already sent");
        shipment.status=ShipmentStatus.IN_TRANSMIT;
        typeShipment.status=ShipmentStatus.IN_TRANSMIT;
        emit ShipmentInTransmit(_sender,_receiver,shipment.pickUpTime);


    }
    function completeShipment(address _sender,address _receiver,uint256 _index)public {
        //first we found that particular shipment 
        Shipment storage shipment=shipments[_sender][_index];
        ShipmentType storage typeShipment=shipmentTypes[_index];
        require(shipment.receiver==_receiver,"Invalid receiver!");
        //below line means that status should be in transmit else shipment has not been sent
        require(shipment.status==ShipmentStatus.IN_TRANSMIT,"Shipment not in transmit!");

        //it means that if isPaid=true then reverse it so that require's warning is issued that already paid
        require(!shipment.isPaid,"Shipment Already paid");
        shipment.status=ShipmentStatus.DELIVERED;
        typeShipment.status=ShipmentStatus.DELIVERED;

        shipment.deliveryTime=block.timestamp;
        typeShipment.deliveryTime=block.timestamp;

        uint256 amount=shipment.price;
        payable(shipment.sender).transfer(amount);

        shipment.isPaid=true;
        typeShipment.isPaid=true;

        emit ShipmentDelivered(_sender,_receiver,shipment.deliveryTime);
        emit ShipmentPaid(_sender,_receiver,amount);
    }
    function getShipment(address _seller,uint256 _index) public view returns (address,address,uint256,uint256,uint256,uint256,ShipmentStatus,bool) {
        Shipment storage shipment=shipments[_seller][_index];
        return(
            shipment.sender,shipment.receiver,shipment.pickUpTime,shipment.deliveryTime,shipment.price,shipment.distance,shipment.status,shipment.isPaid
        );
    }
    function getShipmentCount(address _sender) public view returns (uint256) {
       return shipments[_sender].length;
    }
    function getAllTransactions() public view returns (ShipmentType[] memory) {
        return shipmentTypes;
    }
}