import * as yup from 'yup';

export const deliveryPersonnelValidationSchema = yup.object().shape({
  vehicle_type: yup.string().required(),
  license_number: yup.string().required(),
  availability_status: yup.string().required(),
  user_id: yup.string().nullable().required(),
});
