const { SSMClient, GetParameterCommand } = require("@aws-sdk/client-ssm");


async function getParameterValue(client, paramName) {
    const getParameterCommand = new GetParameterCommand({
        Name: paramName,
        WithDecryption: true
    })

    const response = await client.send(getParameterCommand)
    const value = (response.Parameter || {}).Value

    return value
}


module.exports.templateTags = [{
    name: 'aws_ssm_param',
    displayName: 'AWS SSM Parameter',
    description: 'AWS SSM Parameter',
    args: [
        {
            displayName: 'Parameter name',
            description: 'Parameter name',
            type: 'string'
        }
    ],
    async run (context, paramName) {
        const ssmClient = new SSMClient({})
        const paramValue = await getParameterValue(ssmClient, paramName)

        return paramValue
    }
}];
