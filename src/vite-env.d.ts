/// <reference types="vite/client" />

// Permite que se detecten correctamente archivos ".csv".
declare module "*.csv" {
    const value: string;
    export default value;
}