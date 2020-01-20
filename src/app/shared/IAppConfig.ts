export interface IAppConfig {
    env: {
        name: string;
        url: string;
    };
    aad: {
        tenant: string;
        clientId: string;
        signUpSignInPolicy: string;
        passwordResetPolicy: string,
        b2cScopes: string[];
    };
    apiServer: {
      user: string;
      products: string;
    };
    appInsights: {
        instrumentationKey: string
    };
}
