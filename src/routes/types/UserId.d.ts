
import * as express from 'express';

declare global {
    namespace Express {
      interface Request {
        userId?: string,
        authToken?: string
      }
    }
  }
  
declare namespace Express {
    export interface Request {
        userId?: string,
        authToken?: string
    }
 }