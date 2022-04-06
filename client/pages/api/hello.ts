// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../config/db.js";
import excuteQuery from '../../config/db.js';

type Data = {
  name: String;
  desc: String;
};

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   res.status(200).json({ name: 'John Doe' })
// }

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const result = await excuteQuery({
        query: 'SELECT * FROM FONT',
        values: ["123", "456"],
    });
    console.log( result );
} catch ( error ) {
    console.log( error );
}
  // try {
  //   const user = await db.query("SELECT * FROM FONT");
  //   res.status(200).json(user);
  //   console.log(user)[0];
  // } catch (e) {
  //   res.status(500).end();
  //   console.log(e);
  // }
}
