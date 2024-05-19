const VehicleType2WList = [
    "bike",
    "scooty"
];

const VehicleType4WList = [
    "car",
    "taxi"
];

const VehicleTypeCommercialList = [
    "truck",
    "bus"
];

const getVehicleType = (vehicle) =>{
    let requiredType = "CommercialVehicle";
    VehicleType2WList.forEach(type => {
        if(String(vehicle).toLowerCase().includes(type)){
            requiredType = "2W";
        }
    });

    VehicleType4WList.forEach(type => {
        if(String(vehicle).toLowerCase().includes(type)){
            requiredType = "4W";
        }
    });

    return requiredType;
}

module.exports={
    getVehicleType
}