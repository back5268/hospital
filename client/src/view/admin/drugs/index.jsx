import React, { useState } from 'react';
import { InputFormV2 } from '@components/form';
import { useGetParams } from '@hook';
import { DataFilter, FormList } from '@components/base';
import { useNavigate } from 'react-router-dom';
import { listDrugApi } from '@api/drug';
import { useGetApi } from '@hook/useGetApi';

const Filter = ({ setParams }) => {
  const [filter, setFilter] = useState({});

  return (
    <DataFilter filter={filter} setFilter={setFilter} setParams={setParams} className={'xs:w-full lg:w-9/12'}>
      <InputFormV2
        value={filter.keySearch}
        onChange={(e) => setFilter({ ...filter, keySearch: e.target.value })}
        label="Tìm kiếm theo tên, mã thuốc"
      />
    </DataFilter>
  );
};

const Drugs = () => {
  const navigate = useNavigate();
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const data = useGetApi(listDrugApi, {}, [])
  console.log(data);

  const columns = [
    { label: 'Tên thuốc', field: 'name'},
    { label: 'Mã thuốc', field: 'code_value' },
    { label: 'Giá', field: 'price' },
    { label: 'Tác dụng phụ', field: 'side_effect' },
  ];

  return (
    <FormList
      title="Quản lý thuốc"
      data={data}
      totalRecord={data?.length}
      columns={columns}
      params={params}
      setParams={setParams}
      baseActions={['insert', 'detail']}
      actionsInfo={{ onViewDetail: (item) => navigate(`/drugs/detail/${item.medication_id}`) }}
      headerInfo={{ onInsert: () => navigate('/drugs/insert') }}
      statusInfo={{}}
    >
      <Filter setParams={setParams} />
    </FormList>
  );
};

export default Drugs;
