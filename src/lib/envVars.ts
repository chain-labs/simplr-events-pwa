const checkEnvVar = (name: string, value: string | undefined): string => {
  if (!value) {
    console.error(`Environment variable ${name} is not defined`);
    return "";
  }
  return value;
};

export const envVars = {
  googleMeasurementId: checkEnvVar(
    "NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID",
    process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID
  ),
  web3AuthClientId: checkEnvVar(
    "NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID",
    process.env.NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID
  ),
  isTestNetwork: process.env.NEXT_PUBLIC_TEST_NETWORK === "true",
  googleClientId: checkEnvVar(
    "NEXT_PUBLIC_GOOGLE_CLIENT_ID",
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
  ),
  googleVerifier: checkEnvVar(
    "NEXT_PUBLIC_GOOGLE_VERIFIER",
    process.env.NEXT_PUBLIC_GOOGLE_VERIFIER
  ),
  etherspotApiKey: checkEnvVar(
    "NEXT_PUBLIC_ETHERSPOT_API_KEY",
    process.env.NEXT_PUBLIC_ETHERSPOT_API_KEY
  ),
  subgraphUrl: checkEnvVar(
    "NEXT_PUBLIC_SUBGRAPH_URL",
    process.env.NEXT_PUBLIC_SUBGRAPH_URL
  ),
};
