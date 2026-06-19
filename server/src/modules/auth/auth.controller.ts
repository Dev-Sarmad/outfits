import type { Request, Response, NextFunction } from "express";
const register = (request: Request, response: Response, next: NextFunction) => {
    try{
        
    }
    catch(error){
        next(error)
    }
};

export { register };
