import axios from "axios";
import { TUser } from "~/models/user";

let token: string;
const getToken = async () => {
  if (token) return token;
  const options = {
    headers: { "content-type": "application/json" },
  };

  const response: { access_token: string; token_type: string } =
    await axios.post(
      "https://meshflow.eu.auth0.com",
      '{"client_id":"hxatYZ5ZU9wzNRplTMDf3NTKpR7Zzksc","client_secret":"dtEaosZMuW09biS1i0j_wfh0j53XoJ4scMnll6Azd1wpcErGxGuDddHPiOS-sknb","audience":"https://meshflow.eu.auth0.com/api/v2/","grant_type":"client_credentials"}',
      options
    );
  if (response && response.access_token) {
    token = response.access_token;
    return token;
  }
  return false;
};

export default defineEventHandler(async (e) => {
  // const token = await getToken();
  // const body = await readBody(e);
  // var options = {
  //   method: "GET",
  //   params: { email: body.id },
  //   headers: { authorization: `Bearer ${token}` },
  // };

  // const response = await axios(
  //   "https://meshflow.eu.auth0.com/api/v2/users-by-email",
  //   options
  // );
  const user: TUser = {
    name: "John Doe",
    email: "temp@email.com",
    id: "temp-id",
  };
  return user;
  // return false;
});
