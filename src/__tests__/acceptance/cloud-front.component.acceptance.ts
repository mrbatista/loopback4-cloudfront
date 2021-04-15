import {Application} from '@loopback/core';
import {expect} from '@loopback/testlab';
import {CloudFrontComponent} from '../../component';
import {CloudFrontBindings} from '../../keys';

describe('CloudFrontComponent', () => {
  let app: Application;

  describe('Default configuration', () => {
    before(givenAppWithDefaultConfig);

    it('does not bind a cloud front provider', async () => {
      expect(app.isBound(CloudFrontBindings.CLOUD_FRONT)).to.be.true();
      const cloudFront = await app.get(CloudFrontBindings.CLOUD_FRONT);
      expect(cloudFront).to.be.ok();
      expect(cloudFront.createDistribution).to.be.Function();
    });

    it('binds a cloud front signer', async () => {
      expect(app.isBound(CloudFrontBindings.SIGNER)).to.be.false();
    });

    async function givenAppWithDefaultConfig() {
      app = givenApplication();
      app.component(CloudFrontComponent);
    }
  });

  describe('Custom configuration', () => {
    before(givenAppWithCustomConfig);

    it('does not bind a cloud front provider', async () => {
      expect(app.isBound(CloudFrontBindings.CLOUD_FRONT)).to.be.false();
    });

    it('binds a cloud front signer', async () => {
      app.configure(CloudFrontBindings.SIGNER_CONFIG).to({
        keyPairId: 'fake_keyPairId',
        privateKey: 'fake_privateKey',
      });

      expect(app.isBound(CloudFrontBindings.SIGNER)).to.be.true();

      const cloudFrontSigner = await app.get(CloudFrontBindings.SIGNER);
      expect(cloudFrontSigner).to.be.ok();
      expect(cloudFrontSigner.getSignedUrl).to.be.Function();
    });

    async function givenAppWithCustomConfig() {
      app = givenApplication();
      app.configure(CloudFrontBindings.COMPONENT).to({
        enableCloudFront: false,
        enableCloudFrontSigner: true,
      });
      app.component(CloudFrontComponent);
    }
  });

  function givenApplication() {
    return new Application();
  }
});
