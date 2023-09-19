import type { NextApiRequest, NextApiResponse } from 'next';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // s3 client
    const s3 = new S3Client({
        credentials: {
            accessKeyId: process.env.MY_AWS_ACCESS_KEY as string,
            secretAccessKey: process.env.MY_AWS_SECRET_KEY as string,
        },
        region: 'ap-northeast-2'
    });
    const s3Bucket = process.env.MY_AWS_S3_BUCKET as string;

    if (req.method === 'POST') {
        const fileName = req.body.fileName;
        const fileType = req.body.fileType;

        if (req.body.action === 'putSignedUrl') {
            const putParams = {
                Bucket: s3Bucket,
                Key: fileName,
                ContentType: fileType
            }

            const url = await getSignedUrl(s3, new PutObjectCommand(putParams), { expiresIn: 3600 });

            return res.status(200).json({
                url: url,
                message: "putSignedUrl succeeded."
            });
        }
    }
    else if (req.method === 'GET') {
        const fileName = req.query.fileName as string;

        if (req.query.action === 'getSignedUrl') {
            const getParams = {
                Bucket: s3Bucket,
                Key: fileName,
            }

            const url = await getSignedUrl(s3, new GetObjectCommand(getParams), { expiresIn: 3600 });

            return res.status(200).json({
                url: url,
                message: "getSignedUrl succeeded."
            })
        }
    }
}