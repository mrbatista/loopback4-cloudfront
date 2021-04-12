import {BindingKey, CoreBindings} from '@loopback/core';
import {CloudfrontComponent} from './component';

export interface CloudfrontSignerConfig {
  keyPairId: string;
  privateKey: string;
}

/**
 * Binding keys used by this component.
 */
export namespace CloudfrontBindings {
  export const COMPONENT = BindingKey.create<CloudfrontComponent>(
    `${CoreBindings.COMPONENTS}.CloudfrontComponent`,
  );
  export const PROVIDER = BindingKey.create<AWS.CloudFront>('aws.cloudfront');
  export const SIGNER_PROVIDER = BindingKey.create<AWS.CloudFront.Signer>(
    'aws.cloudfront.signer',
  );
  export const CONFIG = BindingKey.create<AWS.CloudFront.Types.ClientConfiguration>(
    'aws.cloudfront.config',
  );
  export const SIGNER_CONFIG = BindingKey.create<CloudfrontSignerConfig>(
    'aws.cloudfront.signer.config',
  );
}
