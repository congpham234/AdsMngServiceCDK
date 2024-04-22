import { Stack, StackProps } from 'aws-cdk-lib';
import { IRepository, Repository } from 'aws-cdk-lib/aws-ecr';
import { IRole } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';


export interface EcrStackProps extends StackProps {
  // vpc: IVpc;
  readonly serviceRole: IRole;
}

export class EcrStack extends Stack {
  public readonly ecrRepository: IRepository;

  constructor(scope: Construct, id: string, props: EcrStackProps) {
    super(scope, id, props);
    this.ecrRepository = new Repository(this, 'AdsMngServiceEcrRepoId', {
      repositoryName: 'adsmngservice-ecr-repo',
    });
    this.ecrRepository.grantPull(props.serviceRole);
  }
}
