import {config, Getter, Provider} from '@loopback/core';
import * as AWS from 'aws-sdk';
import {CloudfrontBindings} from '../keys';

export class CloudfrontProvider implements Provider<AWS.CloudFront> {
  constructor(
    @config.getter({fromBinding: CloudfrontBindings.CONFIG})
    private getCloudfrontConfig: Getter<
      AWS.CloudFront.Types.ClientConfiguration | undefined
    >,
  ) {}

  async value() {
    const options = await this.getCloudfrontConfig();

    return new AWS.CloudFront(options);
  }
}
