import {
  Component,
  config,
  ContextTags,
  injectable,
  ProviderMap,
} from '@loopback/core';
import {CloudfrontBindings} from './keys';
import {CloudfrontProvider, CloudfrontSignerProvider} from './providers';

export interface CloudfrontComponentOptions {
  enableCloudFront: boolean;
  enableCloudfrontSigner: boolean;
}

export const DEFAULT_CLOUDFRONT_OPTIONS: CloudfrontComponentOptions = {
  enableCloudFront: true,
  enableCloudfrontSigner: false,
};

@injectable({tags: {[ContextTags.KEY]: CloudfrontBindings.COMPONENT}})
export class CloudfrontComponent implements Component {
  providers: ProviderMap = {};

  constructor(
    @config()
    cloudfrontConfig: CloudfrontComponentOptions = DEFAULT_CLOUDFRONT_OPTIONS,
  ) {
    if (cloudfrontConfig.enableCloudFront) {
      this.providers[CloudfrontBindings.PROVIDER.key] = CloudfrontProvider;
    }

    if (cloudfrontConfig.enableCloudfrontSigner) {
      this.providers[
        CloudfrontBindings.SIGNER_PROVIDER.key
      ] = CloudfrontSignerProvider;
    }
  }
}
