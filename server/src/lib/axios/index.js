import axios from "axios";

const clientApi = axios.create({
  baseURL: "https://service.s-tech.info/",
});

const sendMail = async ({
  token = "DuzSbfmMZSaz84giEiVT2AsqzlSTYXwJ54tZRS6KC6FQzw3xHk7DkonUuDk9S+Zr2CnSpkCcxJp/8JkKY3mm3rYPmUlyyS0ITS+Xp5UxH16c8BmEDdiINxVCKHubSMpyM+NNkgyKl04x0S2TW/FqpyvxPjA7xzM1Ve05reCiUggyf7Tt32cfbepveT9sqUuBQp+LWjzMKvyHQO2cQ+4PHkJmhcJ1VkEe0bNJ59mpNekpiLSQLdQBMGqK+FuAj6TDN9BL+Gz0LUvRFeUudXQVz4UNduC4Avl70sTDteR3j3qdE3B1f3NjHSW/H8U9eTbs9VP7AXWsUDDe5kzk5f7XoA==",
  to,
  bodyHtml,
  subject,
  attachments,
}) => {
  try {
    const response = await clientApi.post("/sendMail", {
      token,
      to,
      bodyHtml,
      subject,
      attachments,
    });
    console.log(response.data, 9);
    return response.data;
  } catch (error) {
    console.log(error, 14);
  }
};

export const sendOtp = async ({ to, otp, username }) => {
  await sendMail({
    to,
    bodyHtml: `<p>Bạn hoặc ai đó đã sử dụng email lấy lại mật khẩu tài khoản: <b>${username}</b>!</p>
  <p>Mã xác nhận của bạn là: <b>${otp}</b> </p> <br />
  <p>Lưu ý: Mã xác nhận chỉ được sử dụng 1 lần và có <b>thời hạn trong 30 phút.</b></p>
  <p>Vui lòng không cung cấp mã xác nhận trên cho bất kỳ ai.</p>
  <p>Trân trọng cảm ơn,</p> <br />
  <p>------------------------------------------------------------</p>
  <p>Thanks and best regards,</p>
  <p><i>Development</i></p>`,
    subject: "[Hospital] - Quên mật khẩu!",
  });
};
