import React from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const DateTimePicker = ({
  isDatePickerVisible,
  time,
  onConfirm,
  onCancel,
  is24Hour,
  maximumDate,
  minimumDate,
}) => {
  return (
    <DateTimePickerModal
      display="spinner"
      themeVariant="dark"
      is24Hour={is24Hour}
      onCancel={onCancel}
      onConfirm={onConfirm}
      maximumDate={maximumDate}
      minimumDate={minimumDate}
      isDarkModeEnabled={true}
      neutralButtonLabel="Clear"
      mode={time ? 'time' : 'date'}
      isVisible={isDatePickerVisible}
    />
  );
};

export default React.memo(DateTimePicker);
