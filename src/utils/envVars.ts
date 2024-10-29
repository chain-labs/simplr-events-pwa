const google_measurement_id = process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID;
const web3Auth_client_id = process.env.NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID;
const test_network = process.env.NEXT_PUBLIC_TEST_NETWORK;
const google_verifier = process.env.NEXT_PUBLIC_GOOGLE_VERIFIER;
const google_client_id = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

if (!google_verifier) {
  throw new Error('Google Verifier Environment Variable not set');
}
if (!google_client_id) {
  throw new Error('Google Client ID Environment Variable not set');
}
if (!google_measurement_id) {
  throw new Error('Google Measurement ID Environment Variable not set');
}
if (!web3Auth_client_id) {
  throw new Error('Web3Auth Client ID Environment Variable not set');
}

export const ENVS = {
  GOOGLE_MEASUREMENT_ID: google_measurement_id,
  WEB3_AUTH_CLIENT_ID: web3Auth_client_id,
  TEST_NETWORK: test_network,
  GOOGLE_VERIFIER: google_verifier,
  GOOGLE_CLIENT_ID: google_client_id,
};
