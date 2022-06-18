import React, { useState } from 'react';
import DropDown from "react-native-paper-dropdown";

export default function SingleDropdown({
  label, mode, value, setValue, list
}) {
  const [show, setShow] = useState(false);

  return (
    <DropDown
      label={label}
      mode={mode}
      visible={show}
      showDropDown={() => setShow(true)}
      onDismiss={() => setShow(false)}
      value={value}
      setValue={setValue}
      list={list}
    />
  )
}
