import {Binding, config, Getter, inject, Provider} from '@loopback/core';
import {CloudFront} from 'aws-sdk';
import {CloudFrontBindings, CloudFrontSignerConfig} from '../keys';

export class CloudFrontSignerProvider implements Provider<CloudFront.Signer> {
  constructor(
    @config.getter({fromBinding: CloudFrontBindings.SIGNER_CONFIG})
    private getCloudfrontSignerConfig: Getter<CloudFrontSignerConfig>,
  ) {}

  @inject.binding()
  private binding: Binding<unknown>;

  async value() {
    const options = await this.getCloudfrontSignerConfig();

    if (options == null) {
      throw new Error(
        `Cloudfornt signer is not configured. Please configure ${this.binding.key}.`,
      );
    }

    const {keyPairId, privateKey} = options;

    return new CloudFront.Signer(keyPairId, privateKey);
  }
}
