import * as functions from "firebase-functions";
import setCors from './util/setCors';
import _ssr from './util/ssr';

export const ssr = functions.https.onRequest(async (req, res) => {
  const url = req.query.url as string;

  const html = await _ssr(url);

  setCors({res});

  res.status(200).type('text/html').send(html);

});
