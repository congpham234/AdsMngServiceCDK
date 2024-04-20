import { Stack, StackProps } from 'aws-cdk-lib';
import { IRole } from 'aws-cdk-lib/aws-iam';
import { Bucket, BlockPublicAccess, BucketEncryption } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export interface S3StackProps extends StackProps {
  readonly serviceRole: IRole;
}

export class S3Stack extends Stack {
  readonly clientImageBucket: Bucket;

  constructor(scope: Construct, id: string, props: S3StackProps) {
    super(scope, id, props);
    this.clientImageBucket = new Bucket(this, 'ClientImageBucketId', {
      bucketName: 'client-image-bucket-id',
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      encryption: BucketEncryption.S3_MANAGED,
    });

    this.clientImageBucket.grantReadWrite(props.serviceRole);
  }
}
