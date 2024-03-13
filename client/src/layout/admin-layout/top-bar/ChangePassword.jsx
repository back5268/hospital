import { InputFormDetail } from '@components/form';
import { ChangePasswordValidation } from '@lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormDetail } from '@components/base';
import { changePasswordApi } from '@api/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@context/AuthContext';

const defaultValues = {
  password: '',
  newPassword: ''
};

const ChangePassword = (props) => {
  const navigate = useNavigate();
  const { show, setShow } = props;
  const { setUserInfo, setIsAuthenticated, userInfo } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(ChangePasswordValidation),
    defaultValues
  });

  const handleData = (data) => {
    return data;
  };

  return (
    <FormDetail
      title="mật khẩu"
      show={show}
      setShow={() => {
        setShow(false);
        reset();
      }}
      isUpdate={true}
      updateApi={changePasswordApi}
      handleData={handleData}
      handleSubmit={handleSubmit}
      onSuccess={() => {
        setUserInfo({});
        setIsAuthenticated(false);
        localStorage.removeItem('token');
        navigate('/auth/signin');
      }}
    >
      <div className={'flex flex-col gap-2'}>
        <InputFormDetail id="password" label="Mật khẩu cũ (*)" register={register} errors={errors} type="password" className="!w-full" />
        <InputFormDetail
          id="newPassword"
          label="Mật khẩu mới (*)"
          register={register}
          errors={errors}
          type="password"
          className="!w-full"
        />
      </div>
    </FormDetail>
  );
};

export default ChangePassword;
