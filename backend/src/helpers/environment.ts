const DEV_ENV = "development";

export const getEnvironment = () => {
    return process.env.NODE_ENV ?? DEV_ENV;
};

export const isDevelopmentEnvironment = () => {
    const environment = getEnvironment();
    return environment === DEV_ENV || environment === "test";
};
