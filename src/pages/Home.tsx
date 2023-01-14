import { Control, useForm } from "react-hook-form";
import DateTimePicker from "../components/forms/DateTimePicker";
import TextField, { TextFieldTypes } from "../components/forms/TextField";
import Layout from "../components/layouts/Layout";
import { InputType } from "../types/inputType";

enum FormNames {
  TIME = "time",
  START_DATE = "startDate",
  END_DATE = "endDate",
}

interface FormValues {
  [FormNames.TIME]: string;
  [FormNames.START_DATE]: Date;
  [FormNames.END_DATE]: Date;
}

const initialData = { time: "0" };

const Home = () => {
  const {
    handleSubmit,
    control,
    setValue,
    register,
    formState: { errors, isDirty },
  } = useForm<FormValues>({
    defaultValues: initialData,
  });

  return (
    <Layout>
      <div>Home</div>
      <TextField
        required
        name={FormNames.TIME}
        control={control as unknown as Control}
        containerClass="w-full sm:w-80"
        placeholder="Drying Time"
        type={TextFieldTypes.OUTLINED}
        inputType={InputType.Text}
        label="Time"
        extraClass="w-full"
        labelClass="mt-4.5 mb-2"
        error={errors[FormNames.TIME]}
      />
      <div className="flex gap-2 items-center px-5">
        <div>
          <DateTimePicker
            {...register(FormNames.START_DATE)}
            control={control as unknown as Control}
            label="Start Date"
            required
          />
        </div>
        <div>
          <DateTimePicker
            {...register(FormNames.END_DATE)}
            control={control as unknown as Control}
            label="End Date"
            required
            extraClass="mt-4"
          />
        </div>
      </div>
    </Layout>
  );
};
export default Home;
