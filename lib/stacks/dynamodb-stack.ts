import { RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { AttributeType, BillingMode, ITable, Table } from 'aws-cdk-lib/aws-dynamodb';
import { IRole } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { SERVICE_NAME } from '../config/constants';

export interface DynamodbStackProps extends StackProps {
  // VPC thingy to add here
  readonly serviceRole: IRole;
}

export class DynamodbStack extends Stack {
  public readonly destinationsTable: ITable;
  public readonly itinerariesTable: ITable;

  constructor(scope: Construct, id: string, props: DynamodbStackProps) {
    super(scope, id, props);

    // Destinations Table
    this.destinationsTable = new Table(this, `${SERVICE_NAME}DestinationsTable`, {
      tableName: 'Destinations',
      partitionKey: { name: 'destId', type: AttributeType.STRING },
      billingMode: BillingMode.PAY_PER_REQUEST,
    });

    // this.destinationsTable.grantReadWriteData(props.serviceRole);
    this.exportValue(this.destinationsTable.tableArn);

    // Itineraries Table
    this.itinerariesTable = new Table(this, `${SERVICE_NAME}ItinerariesTable`, {
      tableName: 'Itineraries',
      partitionKey: { name: 'itineraryId', type: AttributeType.STRING },
      billingMode: BillingMode.PAY_PER_REQUEST,
    });

    // this.itinerariesTable.grantReadWriteData(props.serviceRole);
    this.exportValue(this.itinerariesTable.tableArn);
  }
}
