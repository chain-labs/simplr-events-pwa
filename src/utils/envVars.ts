const google_measurement_id = process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID;
const web3Auth_client_id = process.env.NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID;

if (!google_measurement_id || !web3Auth_client_id) {
  console.log({
    google_measurement_id,
    web3Auth_client_id,
  });
  throw new Error("Environment Variables not set");
}

export const ENVS = {
  GOOGLE_MEASUREMENT_ID: google_measurement_id,
  WEB3_AUTH_CLIENT_ID: web3Auth_client_id,
};
