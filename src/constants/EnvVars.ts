/**
 * Environments variables declared here.
 */

/* eslint-disable node/no-process-env */

export default {
    NodeEnv: (process.env.NODE_ENV ?? ""),
    Port: (process.env.PORT ?? 0),
    CookieProps: {
        Key: "ExpressGeneratorTs",
        Secret: (process.env.COOKIE_SECRET ?? ""),
        // Casing to match express cookie options
        Options: {
            httpOnly: true,
            signed: true,
            path: (process.env.COOKIE_PATH ?? ""),
            maxAge: Number(process.env.COOKIE_EXP ?? 0),
            domain: (process.env.COOKIE_DOMAIN ?? ""),
            secure: (process.env.SECURE_COOKIE === "true"),
        },
    },
    Jwt: {
        Secret: (process.env.JWT_SECRET ??  ""),
        // exp at the same time as the cookie
        Exp: (process.env.COOKIE_EXP ?? ""),
    },
    ORM:{
        Dialect: (process.env.ORM_DIALECT ??  ""),
        Host: (process.env.ORM_HOST ??  ""),
        Port: (Number(process.env.ORM_PORT) ??  0),
        Database: (process.env.ORM_DATABASE ??  ""),
        User: (process.env.ORM_USER ??  ""),
        Password: (process.env.ORM_PASSWORD ??  ""),
    },
    Auth:{
        SecretKey: ((process.env.AUTH_SECRET ??  "")),
        HttpHeader: ((process.env.AUTH_HTTP_HEADER ??  "")),
    },
} as const;
