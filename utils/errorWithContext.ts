
// utils/error.ts

interface ErrorWithContext extends Error {
    functionName?: string;
    timestamp?: string;
}



const createErrorWithContext = (
    error: Error,
    functionName: string
): ErrorWithContext => {
    const errorWithContext = error as ErrorWithContext;
    errorWithContext.functionName = functionName;
    errorWithContext.timestamp = new Date().toISOString();
    return errorWithContext;
};


export default createErrorWithContext