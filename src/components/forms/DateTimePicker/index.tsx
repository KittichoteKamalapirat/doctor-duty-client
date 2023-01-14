import dayjs, { Dayjs } from "dayjs";
import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Control, Controller } from "react-hook-form";
import getErrorMessage from "../../../utils/getErrorMessage";

import FormFieldLabel from "../FormFieldLabel";
import FormHelperText from "../FormHelperText";
import commonStyles from "./DateTimePicker.module.css";

interface Props {
  name: string;
  label?: string;
  control: Control;
  labelClass?: string;
  extraClass?: string;
  isError?: boolean;
  helperText?: string;
  required?: boolean;
  withTime?: boolean;
  placeholder?: string;
  optionalLabelStyle?: string;
  isDisabled?: boolean;
  minDate?: Date;
}

const DateTimePicker = ({
  name,
  label,
  control,
  helperText = "",
  labelClass,
  extraClass,
  required = false,
  isError: isInputError,
  withTime = false,
  placeholder,
  optionalLabelStyle = "",
  isDisabled = false,
  minDate = undefined,
}: Props) => {
  const inputDivClass = extraClass;

  return (
    <div className={inputDivClass}>
      <FormFieldLabel
        label={label}
        extraClass={labelClass}
        displayOptionalLabel={!required}
        optionalLabelStyle={optionalLabelStyle}
      />
      <Controller
        control={control}
        rules={{ required: required ? "is required" : false }}
        name={name}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { invalid, error },
        }) => {
          const isError = !!(error || invalid || isInputError);
          const errorMessage = getErrorMessage(label || name, error);

          return (
            <>
              <ReactDatePicker
                wrapperClassName={`${commonStyles.datepicker} ${
                  isError && commonStyles.error
                }`}
                onChange={onChange}
                onBlur={onBlur}
                selected={value || ""}
                aria-label={name || label}
                showTimeSelect={withTime}
                placeholderText={placeholder}
                dateFormat={withTime ? "d MMMM, yyyy, h:mm aa" : "MMMM d, yyyy"}
                minDate={minDate}
                disabled={isDisabled}
              />
              <FormHelperText
                isError={isError}
                helperText={errorMessage || helperText}
              />
            </>
          );
        }}
      />
    </div>
  );
};

export default DateTimePicker;
