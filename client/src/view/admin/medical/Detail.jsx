import { InputFormDetail, TextAreaForm } from '@components/form';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormDetail } from '@components/base';
import { useNavigate, useParams } from 'react-router-dom';
import { addMedicalApi, listMedicalApi, updateMedicalApi } from '@api/medical';
import { useGetApi } from '@hook/useGetApi';

const defaultValues = {
  patients_name: '',
  diagnosis_history: '',
  treatment_history: '',
  allergies: '',
  current_medication: ''
};

const DetailMedical = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const isUpdate = Boolean(_id);
  const data = useGetApi(listMedicalApi, {}, []);
  const item = data.find((c) => Number(c.medical_record_id) === Number(_id));

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
    if (isUpdate) return { ...data, id: _id };
    else return data;
  };

  return (
    <FormDetail
      type={'normal'}
      title="hồ sơ khám bệnh"
      isUpdate={isUpdate}
      insertApi={addMedicalApi}
      updateApi={updateMedicalApi}
      handleData={handleData}
      handleSubmit={handleSubmit}
      onSuccess={() => navigate('/medicals')}
    >
      <div className={'flex flex-wrap'}>
        <InputFormDetail id="patients_name" label="Tên bệnh nhân (*)" register={register} errors={errors} />
        <InputFormDetail id="allergies" label="Dị ứng" register={register} errors={errors} />
        <InputFormDetail id="current_medication" label="Thuốc đang dùng" register={register} errors={errors} />
        <TextAreaForm id="diagnosis_history" label="Lịch sử chẩn đoán" className="w-full p-2" watch={watch} setValue={setValue} />
        <TextAreaForm id="treatment_history" label="Lịch sử điều trị" className="w-full p-2" watch={watch} setValue={setValue} />
      </div>
    </FormDetail>
  );
};

export default DetailMedical;
