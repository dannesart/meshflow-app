import axios from "axios";

let token: string;
const getToken = async () => {
  if (token) return token;
  const options = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: '{"client_id":"hxatYZ5ZU9wzNRplTMDf3NTKpR7Zzksc","client_secret":"dtEaosZMuW09biS1i0j_wfh0j53XoJ4scMnll6Azd1wpcErGxGuDddHPiOS-sknb","audience":"https://meshflow.eu.auth0.com/api/v2/","grant_type":"client_credentials"}',
  };

  const response: { access_token: string; token_type: string } = await axios(
    "https://meshflow.eu.auth0.com",
    options
  );
  if (response && response.access_token) {
    token = response.access_token;
    return token;
  }
  return false;
};

export default defineEventHandler(async (e) => {
  const token = await getToken();
  var options = {
    method: "GET",
    url: "https://meshflow.eu.auth0.com/api/v2/users-by-email",
    params: { email: "dannesart@live.com" },
    headers: { authorization: `Bearer ${token}` },
  };

  return false;
});
