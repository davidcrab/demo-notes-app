import handler from "./util/handler";
import dynamoDb from "./util/dynamodb";

export const main = handler(async (event) => {
    const params = {
        TableName: process.env.TABLE_NAME,
        // Key defines the partition key and sort key of the item to be removed 
        Key: {
            userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId, // the id of the author 
            noteId: event.pathParameters.id, // the id of the ntoe from the path 
        },
    };

    await dynamoDb.delete(params);

    return { status: true };
})