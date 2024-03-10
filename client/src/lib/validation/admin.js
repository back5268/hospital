import * as yup from 'yup';

export const UserValidation = yup.object({
  email: yup.string().email('Email không đúng định dạng!').required('Email không được bỏ trống!'),
  username: yup.string().required('Tài khoản không được bỏ trống!'),
  fullName: yup.string().required('Họ tên không được bỏ trống!'),
  password: yup
    .string()
    .min(6, 'Mật khẩu cần dài ít nhất 6 ký tự!')
    .required('Mật khẩu không được bỏ trống!')
});

export const CourseValidation = yup.object({
  name: yup.string().required('Tên khóa học không được bỏ trống!'),
  code: yup.string().required('Mã khóa học không được bỏ trống!'),
  type: yup.number().required('Thể loại không được bỏ trống!')
});

export const UserInfoValidation = yup.object({
  email: yup.string().email('Email không đúng định dạng!').required('Email không được bỏ trống!'),
  username: yup.string().required('Tài khoản không được bỏ trống!'),
  fullName: yup.string().required('Họ tên không được bỏ trống!')
});

export const ChangePasswordValidation = yup.object({
  password: yup
    .string()
    .min(6, 'Mật khẩu cần dài ít nhất 6 ký tự!')
    .required('Mật khẩu không được bỏ trống!'),
  newPassword: yup
    .string()
    .min(6, 'Mật khẩu cần dài ít nhất 6 ký tự!')
    .required('Mật khẩu không được bỏ trống!')
});
