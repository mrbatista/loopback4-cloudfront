# loopback4-cloudfront

## Installation

Install CloudfrontComponent using `npm`;

```sh
$ npm install loopback4-cloudfront
```

## Basic Use

Configure and load CloudfrontComponent in the application constructor
as shown below.

```ts
import {CloudFrontComponent, CloudfrontComponentOptions} from 'loopback4-cloudfront';
// ...
export class MyApplication extends BootMixin(ServiceMixin(RepositoryMixin(RestApplication))) {
  constructor(options: ApplicationConfig = {}) {
    // To configure component
    this.configure(CloudFrontBindings.COMPONENT).to({
      enableCloudFront: false, // Default to true
      enableCloudFrontSigner: true // Default to false
    });

    // To configure Cloudfront
    this.configure(CloudFrontBindings.CLOUD_FRONT_CONFIG).to(...);
    });

    // To configure Cloudfront Signer
    this.configure(CloudFrontBindings.SIGNER_CONFIG).to({
        keyPairId: 'your_keyPairId',
        privateKey: 'your_privateKey',
      });
    });

    this.component(CloudfrontComponent);
    // ...
  }
  // ...
}
```
