import React, { useState } from 'react';
import { InputFormV2 } from '@components/form';
import { useGetParams } from '@hook';
import { DataFilter, FormList } from '@components/base';
import { useNavigate } from 'react-router-dom';
import { useGetApi } from '@hook/useGetApi';
import { listUserApi } from '@api/user';

const Filter = ({ setParams }) => {
  const [filter, setFilter] = useState({});

  return (
    <DataFilter filter={filter} setFilter={setFilter} setParams={setParams} className={'xs:w-full lg:w-9/12'}>
      <InputFormV2
        value={filter.keySearch}
        onChange={(e) => setFilter({ ...filter, keySearch: e.target.value })}
        label="Tìm kiếm theo tên nhân viên"
      />
    </DataFilter>
  );
};

const Users = () => {
  const navigate = useNavigate();
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const data = useGetApi(listUserApi, {}, [])

  const columns = [
    { label: 'Tài khoản', field: 'username'},
    { label: 'Họ tên', field: 'full_name' },
    { label: 'Email', field: 'email' },
    { label: 'Số điện thoại', field: 'phone' },
    { label: 'Mã nhân viên', field: 'code' },
    { label: 'Địa chỉ', field: 'address' },
  ];

  return (
    <FormList
      title="Danh sách nhân viên"
      data={data}
      totalRecord={data?.length}
      columns={columns}
      params={params}
      setParams={setParams}
      baseActions={['insert', 'detail']}
      actionsInfo={{ onViewDetail: (item) => navigate(`/users/detail/${item.user_id}`) }}
      headerInfo={{ onInsert: () => navigate('/users/insert') }}
    >
      <Filter setParams={setParams} />
    </FormList>
  );
};

export default Users;
