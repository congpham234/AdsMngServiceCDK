import { Stack, StackProps } from 'aws-cdk-lib';
import { IRepository, Repository } from 'aws-cdk-lib/aws-ecr';
import { Construct } from 'constructs';


export type EcrStackProps = StackProps

export class EcrStack extends Stack {
  public readonly ecrRepository: IRepository;

  constructor(scope: Construct, id: string, props: EcrStackProps) {
    super(scope, id, props);
    this.ecrRepository = new Repository(this, 'AdsMngServiceEcrRepoId', {
      repositoryName: 'adsmngservice-ecr-repo',
    });
  }
}
