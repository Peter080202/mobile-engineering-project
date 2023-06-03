import {categories} from '../../services/constants';
import SelectDropdown from 'react-native-select-dropdown';
import React from 'react';
import {StyleSheet} from 'react-native';

type DropdownProps = {
  options: string[];
  dropdownRef: React.RefObject<SelectDropdown>;
  defaultValue: string | undefined;
  setValue:
    | React.Dispatch<React.SetStateAction<string | undefined>>
    | React.Dispatch<React.SetStateAction<string | number | undefined>>;
};

export default function Dropdown({
  options,
  dropdownRef,
  defaultValue,
  setValue,
}: DropdownProps) {
  return (
    <SelectDropdown
      data={options}
      ref={dropdownRef}
      defaultValue={defaultValue}
      onSelect={(selectedValue: string) => setValue(selectedValue)}
      buttonTextAfterSelection={(selection: string) => selection}
      rowTextForSelection={(selection: string) => selection}
      defaultButtonText={'---'}
    />
  );
}
