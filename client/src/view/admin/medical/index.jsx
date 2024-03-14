import React, { useState } from 'react';
import { InputFormV2 } from '@components/form';
import { useGetParams } from '@hook';
import { DataFilter, FormList } from '@components/base';
import { useNavigate } from 'react-router-dom';
import { useGetApi } from '@hook/useGetApi';
import { listMedicalApi } from '@api/medical';

const Filter = ({ setParams }) => {
  const [filter, setFilter] = useState({});

  return (
    <DataFilter filter={filter} setFilter={setFilter} setParams={setParams} className={'xs:w-full lg:w-9/12'}>
      <InputFormV2
        value={filter.name}
        onChange={(e) => setFilter({ ...filter, name: e.target.value })}
        label="Tìm kiếm theo tên bệnh nhân"
      />
    </DataFilter>
  );
};

const Medicals = () => {
  const navigate = useNavigate();
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const data = useGetApi(listMedicalApi, params, [])

  const columns = [
    { label: 'Tên bệnh nhân', field: 'patients_name'},
    { label: 'Lịch sử chẩn đoán', field: 'diagnosis_history' },
    { label: 'Lịch sử điều trị', field: 'treatment_history' },
    { label: 'Dị ứng', field: 'allergies' },
    { label: 'Thuốc đang dùng', field: 'current_medication' },
  ];

  return (
    <FormList
      title="Quản lý hồ sơ khám bệnh"
      data={data}
      totalRecord={data?.length}
      columns={columns}
      params={params}
      setParams={setParams}
      baseActions={['insert', 'detail']}
      actionsInfo={{ onViewDetail: (item) => navigate(`/medicals/detail/${item.medical_record_id}`) }}
      headerInfo={{ onInsert: () => navigate('/medicals/insert') }}
    >
      <Filter setParams={setParams} />
    </FormList>
  );
};

export default Medicals;
