import React, { useState } from 'react';
import DropDown from "react-native-paper-dropdown";

type DropdownItem = {
  value: number;
  label: string;
}

interface Props {
  label: string;
  mode: "outlined" | "flat" | undefined;
  value: DropdownItem;
  list: DropdownItem[];
  setValue: React.Dispatch<React.SetStateAction<DropdownItem>>;
}

export default function SingleDropdown({
  label, mode, value, setValue, list
}: Props) {
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
