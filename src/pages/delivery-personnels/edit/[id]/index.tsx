import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getDeliveryPersonnelById, updateDeliveryPersonnelById } from 'apiSdk/delivery-personnels';
import { deliveryPersonnelValidationSchema } from 'validationSchema/delivery-personnels';
import { DeliveryPersonnelInterface } from 'interfaces/delivery-personnel';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';

function DeliveryPersonnelEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<DeliveryPersonnelInterface>(
    () => (id ? `/delivery-personnels/${id}` : null),
    () => getDeliveryPersonnelById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: DeliveryPersonnelInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateDeliveryPersonnelById(id, values);
      mutate(updated);
      resetForm();
      router.push('/delivery-personnels');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<DeliveryPersonnelInterface>({
    initialValues: data,
    validationSchema: deliveryPersonnelValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Delivery Personnels',
              link: '/delivery-personnels',
            },
            {
              label: 'Update Delivery Personnel',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Delivery Personnel
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.vehicle_type}
            label={'Vehicle Type'}
            props={{
              name: 'vehicle_type',
              placeholder: 'Vehicle Type',
              value: formik.values?.vehicle_type,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.license_number}
            label={'License Number'}
            props={{
              name: 'license_number',
              placeholder: 'License Number',
              value: formik.values?.license_number,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.availability_status}
            label={'Availability Status'}
            props={{
              name: 'availability_status',
              placeholder: 'Availability Status',
              value: formik.values?.availability_status,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/delivery-personnels')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'delivery_personnel',
    operation: AccessOperationEnum.UPDATE,
  }),
)(DeliveryPersonnelEditPage);
