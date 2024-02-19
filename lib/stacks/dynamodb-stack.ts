import { RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { AttributeType, BillingMode, ITable, Table } from 'aws-cdk-lib/aws-dynamodb';
import { IRole } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';


export interface DynamodbStackProps extends StackProps {
  // vpc: IVpc;
  readonly serviceRole: IRole;
}

export class DynamodbStack extends Stack {
  public readonly deliveryServiceDdb: ITable;

  constructor(scope: Construct, id: string, props: DynamodbStackProps) {
    super(scope, id, props);
    this.deliveryServiceDdb = new Table(this, 'DeliveryServiceDdb', {
      tableName: 'Deliveries',
      partitionKey: { name: 'OrderId', type: AttributeType.STRING },
      sortKey: { name: 'DeliveryId', type: AttributeType.STRING },
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY, // NOT recommended for production
    });

    this.deliveryServiceDdb.grantReadWriteData(props.serviceRole);
  }
}
