import { UploadImage, InputFormDetail, MultiCheckBox, SelectFormDetail, SwitchForm, TextAreaForm } from '@components/form';
import { CourseValidation } from '@lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormDetail } from '@components/base';
import { checkEqualProp } from '@utils';
import { useParams } from 'react-router-dom';
import { TETabs, TETabsContent, TETabsItem, TETabsPane } from 'tw-elements-react';
import Lessons from '@view/admin/courses/Lessons';
import {courses} from "../../../data";

const defaultValues = {
  name: '',
  code: '',
  skills: '',
  requirements: '',
  price: 0,
  sale: 0,
  description: '',
  status: 1,
  type: '',
  characteristic: []
};

const Detail = () => {
  const { _id } = useParams();
  const [image, setImage] = useState(null);
  const [buttonActive, setButtonActive] = useState('tab1');
  const isUpdate = Boolean(_id);
  const item = courses.find(c => c._id === _id)

  const handleButtonClick = (value) => {
    if (value === buttonActive) {
      return;
    }
    setButtonActive(value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(CourseValidation),
    defaultValues
  });

  useEffect(() => {
    if (isUpdate && item?._id) {
      const newItem = { ...item }
      if (newItem.image) setImage(item.image);
      const characteristic = [];
      if (newItem.isHot) characteristic.push('isHot');
      if (newItem.isNew) characteristic.push('isNew');
      newItem.characteristic = characteristic;
      if (newItem?.skills && Array.isArray(newItem.skills)) newItem.skills = newItem?.skills?.join('; ');
      if (newItem?.requirements && Array.isArray(newItem.requirements)) newItem.requirements = newItem?.requirements?.join('; ');
      for (const key in defaultValues) {
        setValue(key, newItem[key]);
      }
    }
  }, [item]);

  const handleData = (data) => {
    const skills = data.skills?.split(';') || [];
    const requirements = data.requirements?.split(';') || [];
    const isHot = data.characteristic?.includes('isHot');
    const isNew = data.characteristic?.includes('isNew');
    const newData = {
      ...data,
      skills: skills[0] ? skills : undefined,
      requirements: requirements[0] ? requirements : undefined,
      isHot,
      isNew,
      status: data.status ? 1 : 0,
      characteristic: undefined
    };
    if (image && image !== item?.image) newData.formData = { image };
    if (!image && item.image) newData.image = '';
    if (isUpdate) return { ...checkEqualProp(newData, item), status: data.status ? 1 : 0, _id };
    else return newData;
  };

  return (
    <FormDetail
      type={'normal'}
      title="khóa học"
      isUpdate={isUpdate}
      handleData={handleData}
      handleSubmit={handleSubmit}
    >
      <TETabs>
        <TETabsItem onClick={() => handleButtonClick('tab1')} active={buttonActive === 'tab1'}>
          Thông tin khóa học
        </TETabsItem>
        <TETabsItem disabled={!isUpdate} onClick={() => handleButtonClick('tab2')} active={buttonActive === 'tab2'}>
          Danh sách bài giảng
        </TETabsItem>
      </TETabs>
      <TETabsContent>
        <TETabsPane show={buttonActive === 'tab1'}>
          <div className={'flex flex-wrap'}>
            <div className="sm:w-full lg:w-4/12 p-2">
              <UploadImage label="Hình ảnh khóa học" data={image} setData={setImage} />
            </div>
            <div className="flex flex-wrap sm:w-full lg:w-8/12">
              <InputFormDetail id="name" label="Tên khóa học (*)" register={register} errors={errors} />
              <InputFormDetail id="code" label="Mã khóa học (*)" register={register} errors={errors} />
              <SelectFormDetail id="type" label="Thể loại (*)" data={[]} watch={watch} setValue={setValue} errors={errors} />
              <InputFormDetail type="number" id="price" label="Giá" register={register} errors={errors} />
              <InputFormDetail type="number" id="sale" label="Khuyến mãi" register={register} errors={errors} />
              <SwitchForm id="status" label="Trạng thái (*)" watch={watch} setValue={setValue} />
              <TextAreaForm id="skills" label="Kỹ năng học được" className="w-full p-2" watch={watch} setValue={setValue} />
              <TextAreaForm id="requirements" label="Yêu cầu" className="w-full p-2" watch={watch} setValue={setValue} />
              <TextAreaForm id="description" label="Mô tả" className="w-full p-2" watch={watch} setValue={setValue} />
              <MultiCheckBox data={[]} value={watch('characteristic')} onChange={(e) => setValue('characteristic', e)} />
            </div>
          </div>
        </TETabsPane>
        <TETabsPane show={buttonActive === 'tab2'}>
          <Lessons data={item?.lessons} />
        </TETabsPane>
      </TETabsContent>
    </FormDetail>
  );
};

export default Detail;
