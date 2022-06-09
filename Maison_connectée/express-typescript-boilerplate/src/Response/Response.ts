/*function ApiResponse()
{

}*/

export class ApiResponse {
    response : string;
    data?: Record<string, any>;
    error?: Error;

constructor(response: string, data?: Record<string, any>, error?: Error) {
    this.response=response;
    this.data=data;
    this.error=error;
}
}

/*
type ApiResponse = {
    response: string
    data?: Record<string, any>
    error?: Error
}

//export default ApiResponse;
*.*/