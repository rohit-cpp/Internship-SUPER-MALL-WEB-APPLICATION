import morgan from "morgan";

// Use 'combined' format for production, 'dev' for development
export const logger = morgan(process.env.NODE_ENV === "production" ? "combined" : "dev");
