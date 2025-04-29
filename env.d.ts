
import * as integration from "./__tests__/config/factory"


declare module "vitest" {
    export interface TaskContext {
        integration: typeof integration;
        request: Request  
    }
}