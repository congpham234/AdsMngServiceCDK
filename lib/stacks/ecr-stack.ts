import { Stack, StackProps } from 'aws-cdk-lib';
import { IRepository, Repository } from 'aws-cdk-lib/aws-ecr';
import { Construct } from 'constructs';
import { SERVICE_NAME } from '../config/constants';

export type EcrStackProps = StackProps

export class EcrStack extends Stack {
  public readonly ecrRepository: IRepository;

  constructor(scope: Construct, id: string, props: EcrStackProps) {
    super(scope, id, props);
    this.ecrRepository = Repository.fromRepositoryName(this, `${SERVICE_NAME}EcrRepoId`, 'gopalbackend-ecr-repo');
  }
}
