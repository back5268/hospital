import { UploadImage, InputFormDetail, SwitchForm, TextAreaForm } from '@components/form';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormDetail } from '@components/base';
import { useNavigate, useParams } from 'react-router-dom';
import { addDrugApi, listDrugApi } from '@api/drug';
import { useGetApi } from '@hook/useGetApi';

const defaultValues = {
  name: '',
  code_value: '',
  price: '',
  description: '',
  side_effect: '',
  status: true
};

const DetailDrug = () => {
  const navigate = useNavigate()
  const { _id } = useParams();
  const isUpdate = Boolean(_id);
  const data = useGetApi(listDrugApi, {}, []);
  const item = data.find((c) => Number(c.medication_id) === Number(_id));

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm({
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
      title="thuốc"
      isUpdate={isUpdate}
      insertApi={addDrugApi}
      handleData={handleData}
      handleSubmit={handleSubmit}
      onSuccess={() => navigate("/drugs")}
    >
      <div className={'flex flex-wrap'}>
        <InputFormDetail id="name" label="Tên thuốc (*)" register={register} errors={errors} />
        <InputFormDetail id="code_value" label="Mã thuốc (*)" register={register} errors={errors} />
        <InputFormDetail id="price" label="Giá (*)" register={register} errors={errors} />
        <InputFormDetail id="side_effect" label="Tác dụng phụ" register={register} errors={errors} />
        <SwitchForm id="status" label="Trạng thái (*)" watch={watch} setValue={setValue} />
        <TextAreaForm id="description" label="Mô tả" className="w-full p-2" watch={watch} setValue={setValue} />
      </div>
    </FormDetail>
  );
};

export default DetailDrug;
