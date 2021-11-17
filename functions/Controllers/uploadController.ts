import { Request, Response } from "express";
import { Endpoint, S3 } from "aws-sdk";
/**
 * @param  {Request} req
 * @param  {Response} res
 */
export default async function (req: Request, res: Response) {
  if (!Array.isArray(req.files)) {
    res.send(["This is not an array of files"]);
    return;
  }
  if (Array.isArray(req.headers.auth)) {
    res.send("Auth is an array");
    return;
  }
  const auth = req.headers.auth!;
  const keys:string[] = auth.split(":");
  const accessKeyId:string = keys[0];
  const secretAccessKey :string = keys[1];
  const locations:string[] = [];
  for(let i = 0; i < req.files.length; i++) {
    const data:Express.Multer.File = req.files[i];
    const name = data.originalname;
    const type = data.mimetype;
    const file = data.buffer;
    let bucketName = req.body.bucketName!.toString();
    const path = req.body.path!.toString();
    const permission = req.body.permission!.toString();
    const spacesEndpoint = new Endpoint("nyc3.digitaloceanspaces.com" + path);
    const location:string = await upload({
      spaceEndpoint: spacesEndpoint,
      bucketName: bucketName,
      name: name,
      file: file,
      type: type,
      permission: permission,
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey
    })
    console.log("done with ", i, " Uploaded ", location);
    locations.push(location);
  }
  res.send(locations);
}
/**
 * @param  {} spaceEndpoint
 * @param  {} bucketName
 * @param  {} name
 * @param  {} file
 * @param  {} type
 * @param  {} permission
 * @param  {} accessKeyId
 * @param  {} secretAccessKey
 * @returns Promise
 */
function upload({
  spaceEndpoint,
  bucketName,
  name,
  file,
  type,
  permission,
  accessKeyId,
  secretAccessKey,
}: {
  spaceEndpoint: Endpoint;
  bucketName: string;
  name: string;
  file: Buffer | string;
  type: string;
  permission: string;
  accessKeyId: string;
  secretAccessKey: string;
}):Promise<string> {
  const s3 = new S3({
    endpoint: spaceEndpoint,
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  });
  return new Promise(function (reslove, reject) {
    s3.upload(
      {
        Bucket: bucketName,
        Key: name,
        Body: file,
        ContentType: type,
        ACL: permission,
        ContentLanguage: "English",
      },
      (err, data) => {
        if (err) reject(err);
        else reslove(data.Location);
      }
    );
  });
}
