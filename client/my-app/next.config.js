require('dotenv').config()

const path = require('path')
const Dotenv = require('dotenv-webpack')

module.exports = {
    target: "serverless",
    webpack: (config) => {
        config.plugins = config.plugins || [];

        config.plugins = [
            ...config.plugins,
            getDotEnv()
        ];

        return config
    }
};

const getDotEnv = () => {
    if (process.env.NODE_ENV === "production")
        return new Dotenv({
            path: path.join(__dirname, "dotenv", "production.env"),
            systemvars: true
        });
    else
        return new Dotenv({
            path: path.join(__dirname, "dotenv", "development.env"),
            systemvars: true
        });
};
