import { IOAuthClientConfiguration, OAuthClient } from '../../OAuthClient';
import { InMemoryOAuthLib } from './InMenoryOAuthLib';

describe('OAuthClient', () => {
	const testConfig: IOAuthClientConfiguration = {
		consumerKey: 'ck',
		consumerSecret: 'cs',
		oauthSecret: 'os',
		oauthToken: 'ot',
		apiBaseUrl: 'abu',
		apiBasePath: 'abp',
		oauthRequestTokenPath: 'ortp',
		oauthAccessTokenPath: 'oatp',
		signatureMethod: 'sigm',
		accept: 'acceps',
		userAgent: 'ua'
	};

	describe('when it errors', () => {
		describe('on GETS', () => {
			describe('with 404s', () => {
				it('the error object conforms', async () => {
					const inMemoryOAuth = new InMemoryOAuthLib();

					// This is what the API returns
					inMemoryOAuth.callbackResultsForNextCall({
						statusCode: 404,
						data: 'The resource you\'re looking for cannot be found'
					}, `The resource you're looking for cannot be found`, { statusCode: 404 });

					const oAuth = new OAuthClient(testConfig, inMemoryOAuth);

					expect.assertions(2);

					try {
						await oAuth.get('a/404/endpoint');
					} catch (error) {
						expect(error.statusCode).toBe(404);
						expect(error.body).toBe('The resource you\'re looking for cannot be found');
					}
				});
			});

		});
		describe('on DELETES', () => {
			describe('with 404s', () => {
				it('the error object conforms', async () => {
					const inMemoryOAuth = new InMemoryOAuthLib();

					// This is what the API returns
					inMemoryOAuth.callbackResultsForNextCall({
						statusCode: 404,
						data: 'The resource you\'re looking for cannot be found'
					}, `The resource you're looking for cannot be found`, { statusCode: 404 });

					const oAuth = new OAuthClient(testConfig, inMemoryOAuth);

					expect.assertions(2);

					try {
						await oAuth.delete('a/404/endpoint');
					} catch (error) {
						expect(error.statusCode).toBe(404);
						expect(error.body).toBe('The resource you\'re looking for cannot be found');
					}
				});
			});

		});
		describe('on PUT', () => {
			describe('with 404s', () => {
				it('the error object conforms', async () => {
					const inMemoryOAuth = new InMemoryOAuthLib();

					// This is what the API returns
					inMemoryOAuth.callbackResultsForNextCall({
						statusCode: 404,
						data: 'The resource you\'re looking for cannot be found'
					}, `The resource you're looking for cannot be found`, { statusCode: 404 });

					const oAuth = new OAuthClient(testConfig, inMemoryOAuth);

					expect.assertions(2);

					try {
						await oAuth.put('a/404/endpoint', { phil: 'washere' });
					} catch (error) {
						expect(error.statusCode).toBe(404);
						expect(error.body).toBe('The resource you\'re looking for cannot be found');
					}
				});
			});

		});
	});
});
