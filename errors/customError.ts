

class CustomError extends Error{
    statusCode: number;
    code: string;
    functionName: string; 

    constructor(message: string, statusCode: number, code: string, functionName: string){
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.functionName = functionName;
        
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}

export default CustomError;