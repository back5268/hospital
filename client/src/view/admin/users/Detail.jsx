import { InputFormDetail, TextAreaForm } from '@components/form';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormDetail } from '@components/base';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetApi } from '@hook/useGetApi';
import { addUserApi, listUserApi } from '@api/user';
import { SigninValidation, SignupValidation } from '@lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';

const defaultValues = {
  full_name: '',
  code: '',
  username: '',
  email: '',
  phone: '',
  address: ''
};

const DetailUser = () => {
  const navigate = useNavigate()
  const { _id } = useParams();
  const isUpdate = Boolean(_id);
  const data = useGetApi(listUserApi, {}, []);
  const item = data.find((c) => Number(c.user_id) === Number(_id));

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm({
    resolver: yupResolver(SignupValidation),
    defaultValues
  });

  useEffect(() => {
    if (isUpdate && item) {
      for (const key in defaultValues) {
        setValue(key, item[key]);
      }
    }
  }, [item]);

  const handleData = (data) => {
    if (isUpdate) return {};
    else return data;
  };

  return (
    <FormDetail
      type={'normal'}
      title="nhân viên"
      isUpdate={isUpdate}
      insertApi={addUserApi}
      handleData={handleData}
      handleSubmit={handleSubmit}
      onSuccess={() => navigate("/users")}
    >
      <div className={'flex flex-wrap'}>
        <InputFormDetail id="full_name" label="Tên nhân viên (*)" register={register} errors={errors} />
        <InputFormDetail id="username" label="Tài khoản (*)" register={register} errors={errors} />
        <InputFormDetail id="password" type="password" label="Mật khẩu (*)" register={register} errors={errors} />
        <InputFormDetail id="email" label="Email" register={register} errors={errors} />
        <InputFormDetail id="phone" label="Số điện thoại" register={register} errors={errors} />
        <InputFormDetail id="code" label="Mã nhân viên" register={register} errors={errors} />
        <TextAreaForm id="address" label="Địa chỉ" className="w-full p-2" watch={watch} setValue={setValue} />
      </div>
    </FormDetail>
  );
};

export default DetailUser;
