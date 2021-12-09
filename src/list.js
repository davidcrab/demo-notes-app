import handler from "./util/handler";
import dynamoDb from "./util/dynamodb";

export const main = handler(async (event) =>  {
    const params = {
        TableName: process.env.TABLE_NAME,
        // KeyConditionExpression defines the condition for the query 
        // - 'userId = :userId': only return items with matching 'userId' parition key
        KeyConditionExpression: "userId = :userId",
        //ExpressionAttributeValues defines the vlaue in the condition
        // - 'userID': defines 'usreId' to be the id of the author

        ExpressionAttributeValues: {
            ":userId": event.requestContext.authorizer.iam.cognitoIdentity.identityId,
        },
    };

    const result = await dynamoDb.query(params);

    // return the matching list of items in response body 
    return result.Items;
});