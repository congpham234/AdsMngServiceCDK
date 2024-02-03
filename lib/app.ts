import { App } from 'aws-cdk-lib';
import { createStacks } from './support/stack-creator';

const app = new App();

createStacks(app);

app.synth();