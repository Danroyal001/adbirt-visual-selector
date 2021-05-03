import { Response } from "express";

const setCors = (resObject: {
  res: Response<any>;
}) => {
  resObject.res.setHeader('Access-Control-Allow-Origin', '*');
  resObject.res.setHeader('Access-Control-Request-Method', '*');
  resObject.res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  resObject.res.setHeader('Access-Control-Allow-Headers', '*');
}

export default setCors;

// completed
