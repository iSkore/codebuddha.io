'use strict';

module.exports = {
    region: 'us-east-1',
    IdentityPoolId: 'us-east-1:263df2e9-293a-4a03-8597-7f4905c379db',
    UserPoolId: 'us-east-1_BeIKCdmAP',
    ClientId: '4fbkc8ett5ea1lth9nu05titgq',
    Paranoia: 7,
    endpoints: {
        auth: 'cognito-idp.us-east-1.amazonaws.com/us-east-1_BeIKCdmAP',
        S3: 'https://s3-accelerate.amazonaws.com/'
    },
    S3: {
        Bucket: 'files-codebuddha-io',
        Delimiter: '/'
    },
    DDB: {
        SUB_TZ: 'awsmanager-SUB-TZ',
        AUD_SUB: 'awsmanager-AUD-SUB'
    }
};
