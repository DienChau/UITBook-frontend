import { Box, Center, CheckIcon, Select, View } from "native-base";
import RNPickerSelect from "react-native-picker-select";
import React from "react";

const SelectAddress = ({ type, value, setValue, options }) => {
  let provinces = [];
  let district = [];
  let village = [];
  if (type == "provinces") {
    options?.map((i) => {
      provinces.push({
        label: i.province_name,
        value: { id: i.province_id, name: i.province_name },
      });
    });
  } else if (type == "districts") {
    options?.map((i) => {
      district.push({
        label: i.district_name,
        value: { id: i.district_id, name: i.district_name },
      });
    });
  } else if ((type = "villages")) {
    options?.map((i) => {
      village.push({
        label: i.ward_name,
        value: { id: i.ward_id, name: i.ward_name },
      });
    });
  }

  return (
    <Box>
      {type == "provinces" ? (
        <>
          <RNPickerSelect
            onValueChange={(value) => {
              setValue(value);
            }}
            items={provinces}
          />
        </>
      ) : type == "districts" ? (
        <>
          <RNPickerSelect
            onValueChange={(value) => {
              setValue(value);
              console.log("value", value);
            }}
            items={district}
          />
        </>
      ) : (
        <>
          <RNPickerSelect
            onValueChange={(value) => {
              setValue(value);
            }}
            items={village}
          />
        </>
      )}
    </Box>
  );
};

export default SelectAddress;
