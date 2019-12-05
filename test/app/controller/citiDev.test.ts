import assert = require('assert')
import { AccessToken } from 'citi-oauth';
// tslint:disable-next-line:no-submodule-imports
import { app } from 'egg-mock/bootstrap';
import nock from 'nock';
import { deleteTokens, getTokenRedisKey } from '../../../app/common/citi-helper';
import { injectCitiOAuthOptions } from '../../../app/middleware/citi/injectCitiOAuthOptions';

// tslint:disable-next-line:no-big-function
describe('test/app/controller/citiDev.test.ts', () => {
  it('should fail with 401 if not logged in', async () => {
    const result = await app
      .httpRequest()
      .get('/citi-dev/cards')
      // tslint:disable-next-line:no-duplicate-string
      .set('accept', 'application/json')
      .expect(401);

    assert.deepStrictEqual(result.body.code, 'credentials_required');
  });

  it('should get all cards if logged in ', async () => {
    app.router.get(
      '/test-citi-dev/cards',
      injectCitiOAuthOptions(app),
      app.controller.citiDev.cards.getList,
    );

    app.mockContext({ state: { user: '1234' } });
    app.mockService('user', 'get', () => ({ uid: '12345' }));
    await app.redis.set(
      getTokenRedisKey('12345'),
      JSON.stringify({ access_token: '9999', expires_in: 1800 }),
    );

    // tslint:disable-next-line:no-duplicate-string
    nock('https://sandbox.apihub.citi.com')
      .get('/gcb/api/v1/cards?cardFunction=ALL')
      .reply(200, [{ a: 'a' }]);

    // app.mockHttpclient(
    //   'https://sandbox.apihub.citi.com/gcb/api/v1/cards?cardFunction=ALL',
    //   {data: []}
    // )

    const result = await app
      .httpRequest()
      .get('/test-citi-dev/cards')
      .set('accept', 'application/json')
      .expect(200);

    assert(result.body.length > 0);
  });

  it("gets user's token", async () => {
    await app.redis.set('access-token-citi-1234', 'test');

    const res = await app.redis.get('access-token-citi-1234');
    assert(res === 'test');

    const result = await app
      .httpRequest()
      .get('/citi-dev/token?uid=1234')
      .set('accept', 'application/json')
      .expect(200);

    assert(result.body, 'test');
  });

  it('saves the token', async () => {
    // tslint:disable-next-line:no-duplicate-string
    nock('https://sandbox.apihub.citi.com')
      .post('/gcb/api/authCode/oauth2/token/sg/gcb')
      .reply(200, {
        access_token: '123456',
        expires_in: 1800,
        scope: 'customers_profiles',
      });

    nock('https://sandbox.apihub.citi.com')
      .get('/gcb/api/v1/customers/profiles')
      .reply(200, {
        emails: [{ emailAddress: 'jie.tian@hotmail.com' }],
      });

    const result = await app
      .httpRequest()
      .get('/passport/citi/callback?code=1234')
      .set('accept', 'application/json')
      .expect(302);

    assert(
      result.text ===
        'Redirecting to /passport/citi/passport-relay?state=undefined.',
    );

    const res = await app.redis.get('access-token-citi-jie.tian@hotmail.com');
    assert.deepStrictEqual(
      (JSON.parse(res!) as AccessToken).access_token,
      '123456',
    );
  });

  it('get all onboarding products', async () => {
    nock('https://sandbox.apihub.citi.com')
      .post('/gcb/api/clientCredentials/oauth2/token/sg/gcb')
      .reply(200, {
        access_token: '1234',
        expires_in: 1800,
      });

    nock('https://sandbox.apihub.citi.com')
      .get('/gcb/api/v1/apac/onboarding/products?')
      .reply(200, { data: '1234' });

    const result = await app
      .httpRequest()
      .get('/citi-dev/onboarding/products')
      .set('accept', 'application/json')
      .expect(200);

    assert.deepStrictEqual(result.body, { data: '1234' });
  });

  // tslint:disable-next-line:no-big-function
  it('should apply', async () => {
    const applied = {
      applicationId: 'ZOW9IO793854',
      applicationStage: 'PRESCREENING',
      controlFlowId:
        '6e3774334f724a2b7947663653712f52456f524c41797038516a59347a437549564a77755676376e616a733d',
    };

    // tslint:disable-next-line:no-duplicate-string
    nock('https://sandbox.apihub.citi.com')
      .post('/gcb/api/authCode/oauth2/token/sg/gcb')
      .reply(200, {
        access_token: '123456',
        expires_in: 1800,
        scope: 'customers_profiles',
      });

    nock('https://sandbox.apihub.citi.com')
      .post('/gcb/api/v1/apac/onboarding/products/unsecured/applications')
      .reply(200, applied);

    app.mockCsrf();
    const result = await app
      .httpRequest()
      .post('/citi-dev/onboarding/apply')
      .send({
        product: {
          creditCardProduct: {
            productCode: 'VC830',
            sourceCode: 'WW5ARCE1',
            organization: '888',
            logo: '830',
            requestCreditShield: 'false',
            embossName: 'Matthew Hyden',
            billingAddress: 'OFFICE_ADDRESS',
            cardDeliveryAddress: 'OFFICE_ADDRESS',
            pinDeliveryAddress: 'OFFICE_ADDRESS',
            giftCode: 'gc123',
            creditLimitIncreaseIndicator: true,
          },
        },
        applicant: {
          ocr: {
            ocrReferenceNumber: 'OCR456789434538922',
          },
          motherMaidenName: 'Lisa',
          name: {
            salutation: 'MR',
            givenName: 'Matthew',
            middleName: 'Du',
            surname: 'Hayden',
            localEnglishGivenName: 'Matthew',
            localEnglishSurname: 'Hayden',
            aliasName: 'Matt',
            saluteBy: 'SURNAME',
          },
          demographics: {
            gender: 'MALE',
            dateOfBirth: '1972-09-15',
            placeOfBirth: 'Sydney',
            countryOfBirth: 'SG',
            nationality: 'SG',
            domicileCountryCode: 'SG',
            permanentResidencyCountryCode: 'SG',
            maritalStatus: 'MARRIED',
            residencyStatus: 'OWN_HOUSE',
            residenceType: 'BUNGALOW',
            taxDomicileCountryCode: 'SG',
            spokenLanguageCode: 'ENGLISH',
            correspondenceLanguageCode: 'ENGLISH',
          },
          address: [
            {
              addressType: 'OFFICE_ADDRESS',
              addressLine1: '40A Orchard Road',
              addressLine2: '#99-99 Macdonald House',
              addressLine3: 'Orchard Avenue 2',
              addressLine4: 'Street 65',
              cityName: 'Singapore',
              state: 'AM',
              postalCode: '345346',
              provinceCode: 'Singapore',
              countryCode: 'SG',
              okToMail: true,
              residenceDurationInYears: 5,
              residenceDurationInMonths: 4,
              countrySpecificAddress: {
                unitNumber: '99',
                floorNumber: '18',
                blockNumber: '19',
                buildingName: 'Estella',
                estateName: 'Marine Parade',
                streetNumber: '52',
                streetName: 'Marine Parade',
                town: 'SG',
              },
            },
          ],
          email: [
            {
              emailAddress: 'matt.hayden@gmail.com',
              okToEmail: true,
              isPreferredEmailAddress: true,
            },
          ],
          phone: [
            {
              phoneType: 'HOME_PHONE_NUMBER',
              phoneCountryCode: '65',
              areaCode: '0',
              phoneNumber: '64042321',
              okToSms: true,
              okToCall: true,
            },
          ],
          contactPreference: {
            sendSmsAdviceFlag: true,
            sendEmailAdviceFlag: true,
            preferredMailingAddress: 'HOME_ADDRESS',
            eStatementEnrollmentFlag: true,
          },
          contactConsent: {
            okToCall: true,
            okToMail: true,
            okToSms: true,
          },
          financialInformation: {
            hasForeseeableFinancialChanges: true,
            expenseDetails: [
              {
                expenseType: 'RENT_PAID',
                expenseAmount: 590.25,
                frequency: 'MONTHLY',
              },
            ],
            incomeDetails: [
              {
                incomeType: 'DECLARED_FIXED',
                fixedAmount: 7590.25,
                variableAmount: 1590.25,
                frequency: 'MONTHLY',
                otherIncomeDescription: 'Rent',
              },
            ],
            existingLoanDetails: [
              {
                monthlyInstallmentAmount: 250.25,
                outstandingBalanceAmount: 5000.25,
              },
            ],
          },
          education: {
            highestEducationLevel: 'MASTER',
            yearOfGraduation: '2003',
            studentId: 'STID234567',
            university: 'NUS',
          },
          employmentDetails: [
            {
              employerName: 'Citi Bank',
              jobTitle: 'POLITICIAN',
              occupationCode: 'ADMIN_SUPPORT_CLERICAL',
              industryCode: 'ENVIRONMENTAL_CONTROLS',
              employmentDurationInYears: 5,
              employmentDurationInMonths: 3,
              employmentStatus: 'EMPLOYED',
              monthsInPreviousEmployment: 5,
              yearsInPreviousEmployment: 4,
              accountantName: 'Javier',
              accountantFirmName: 'ACME',
              yearsInIndustry: 5,
              monthsInIndustry: 6,
            },
          ],
          identificationDocumentDetails: [
            {
              idType: 'PASSPORT',
              idNumber: 'S42258011',
              idExpiryDate: '2027-04-11',
              idIssueDate: '2017-04-12',
              idIssuePlace: 'SG',
              idIssueState: 'AM',
              idIssueCountry: 'SG',
              isPrimaryId: true,
            },
          ],
          additionalData: {
            numberOfDependents: '3',
            staffIndicator: true,
            businessNature: 'TRAVEL_AGENCIES',
            emergencyContactName: 'Pearline',
            emergencyContactPhoneNumber: '6164042321',
            overLimitConsentFlag: true,
            countrySpecificGroup: {
              bumiputraIndicator: true,
              disabilityIndicator: true,
              unionPayCardNumber: '5555666600008888',
              taxFileNumber: '656456737',
            },
            referralGivenName: 'Maxwell',
            referralSurname: 'Gate',
          },
          partnerCustomerDetails: {
            partnerCustomerInternalId: 'ZOW9IO793855',
            partnerCustomerId: 'P011100000125',
          },
          consentDetails: [
            {
              consentType: 'PDP_CONSENT',
              isConsentGiven: true,
            },
            {
              consentType: 'PARTNER_CONSENT',
              isConsentGiven: true,
            },
          ],
          selfDeclaration: {
            totalActiveCreditCardLimitAmount: 23000.25,
            anticipatedIncomeDecreaseCode: 'Yes',
            loanTakenIndicator: true,
            monthlyRepaymentForAllExtLoans: 5000.25,
          },
          kycInformation: {
            selfPublicFigureDeclarationFlag: true,
            publicFigureOfficeStatus: 'Active',
            publicFigureOfficeDetails: 'Department of education and training',
            publicFigureOfficeStartDate: '2017-04-12',
            publicFigureOfficeEndDate: '2020-04-11',
            isRelatedToSeniorPublicFigure: true,
            relatedSeniorPublicFigureName: 'Dan Lee',
            relatedSpfCountryOfGovernment: 'SG',
            relatedSeniorPublicFigureDepartment: 'Ministry',
            relationshipWithSeniorPublicFigure: 'Father',
            relatedSeniorPublicFigureLastName: 'Lee',
            usTaxStatus: 'EXCEPTED_NFFE',
            usTaxId: 'US234567',
          },
        },
      })
      .set('accept', 'application/json')
      .expect(200);

    assert.deepStrictEqual(result.body, applied);
  });
});

describe.skip('delete tokens', () => {
  afterEach(() => nock.cleanAll());
  it('delete', async () => {
    await app.redis.set('access-token-citi-5678', 'test');

    const res = await app.redis.get('access-token-citi-5678');
    assert(res === 'test');

    await deleteTokens(app)('');

    const res2 = await app.redis.get('access-token-citi-5678');
    assert(res2 === null);
  });
});

describe.skip('retry', () => {
  afterEach(() => nock.cleanAll());
  it('should get application status even failed once', async () => {
    nock('https://sandbox.apihub.citi.com')
      .get('/gcb/api/v1/apac/onboarding/products/unsecured/applications/1234')
      .reply(401, 'Request failed with status code 401');

    nock('https://sandbox.apihub.citi.com')
      .post('/gcb/api/clientCredentials/oauth2/token/sg/gcb')
      .reply(200, { access_token: '5678', expires_in: 18000 });

    nock('https://sandbox.apihub.citi.com')
      .get('/gcb/api/v1/apac/onboarding/products/unsecured/applications/1234')
      .reply(200, {});

    await app.redis.set(
      // tslint:disable-next-line:max-line-length
      'access-token-citi-https://sandbox.apihub.citi.com/gcb/api/clientCredentials/oauth2/token/sg/gcb?grant_type=client_credentials&scope=%2Fapi',
      JSON.stringify({
        access_token: '1234',
        expires_in: 180000,
        created_at: Date.now(),
      }),
    );
    const result = await app
      .httpRequest()
      .get('/citi-dev/onboarding/get-application-status/1234')
      .set('accept', 'application/json')
      .expect(200);

    assert.deepStrictEqual(result.body, {});
  });
});
