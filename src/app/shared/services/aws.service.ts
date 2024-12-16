import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
  ScanCommand,
  DynamoDBDocumentClient,
} from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import {
  TranslateClient,
  TranslateTextCommand,
  TranslateTextCommandOutput,
} from '@aws-sdk/client-translate';

import { environment } from '@env/environment';
import { GlobalService } from '@services/global.service';
import { CommonService } from '@services/common.service';

// const postBody = {
//   name: 'John Doe',
//   employeeid: 123455,
// };
// const params = {
//   ExpressionAttributeNames: { // used to make filter properties dynamic key references
//     "#key": "name",
//     "#id": "employeeid"
//   },
//   ExpressionAttributeValues: { // used to make filter properties dynamic value references
//     ":nameValueRef": "John Doe",
//     ":employeeIdValueRef": postBody?.employeeid,
//   },
//   Key: { PK: postBody?.employeeid },
//   // OR
//   KeyConditionExpression: "PK = :employeeIdValueRef",
// };

@Injectable({
  providedIn: 'root',
})
export class AWSService {
  constructor(private commonService: CommonService) {}
  private readonly awsClientCredentials = {
    region: environment?.region,
    credentials: {
      accessKeyId: environment?.accessKeyId,
      secretAccessKey: environment?.secretAccessKey,
    },
  };

  private readonly tableName = 'multi-lang-hra';
  private readonly dynamoClient = new DynamoDBClient({
    ...this.awsClientCredentials,
  });
  ddbDocClient = DynamoDBDocumentClient.from(this.dynamoClient);

  private readonly translateClient = new TranslateClient({
    ...this.awsClientCredentials,
  });

  addDataToTable(postbody: Record<string, any>): Observable<{
    success: boolean;
    message: string;
    data: Record<string, any>;
  }> {
    const uniqueId = uuidv4();

    return new Observable((observer) => {
      try {
        this.ddbDocClient
          .send(
            new PutCommand({
              TableName: this.tableName,
              Item: {
                id: uniqueId,
                ...postbody,
              },
            })
          )
          .then(() => {
            observer.next({
              success: true,
              message: 'Data has been added successfully',
              data: { uniqueId },
            });
          })
          .catch((error) => {
            observer.error({
              success: false,
              message: error.message || 'Something went wrong',
              data: null,
            });
          })
          .finally(() => {
            observer.complete();
          });
      } catch (error: any) {
        observer.error({
          success: false,
          message: error.message || 'Something went wrong',
          data: null,
        });
        observer.complete();
      }
    });
  }

  getDataFromTable(id: string = ''): Observable<{
    success: boolean;
    message: string;
    data: any;
  }> {
    return new Observable((observer) => {
      try {
        const command: any = id
          ? new GetCommand({
              TableName: this.tableName,
              Key: {
                PK: id,
              },
            })
          : new ScanCommand({
              TableName: this.tableName,
            });
        this.ddbDocClient
          .send(command)
          .then((response) => {
            observer.next({
              success: true,
              message: 'Data has been fetched successfully',
              data: response,
            });
          })
          .catch((error) => {
            observer.error({
              success: false,
              message: error.message || 'Something went wrong',
              data: null,
            });
          })
          .finally(() => {
            observer.complete();
          });
      } catch (error: any) {
        observer.error({
          success: false,
          message: error.message || 'Something went wrong',
          data: null,
        });
        observer.complete();
      }
    });
  }

  updateDataInTable(
    id: string,
    postbody: Record<string, any>
  ): Observable<{
    success: boolean;
    message: string;
    data: Record<string, any>;
  }> {
    return new Observable((observer) => {
      try {
        this.ddbDocClient
          .send(
            new UpdateCommand({
              TableName: this.tableName,
              Key: {
                PK: id,
              },
              UpdateExpression: 'SET #data = :data',
              ExpressionAttributeNames: {
                '#data': 'data',
              },
              ExpressionAttributeValues: {
                ':data': postbody,
              },
            })
          )
          .then(() => {
            observer.next({
              success: true,
              message: 'Data has been updated successfully',
              data: postbody,
            });
          })
          .catch((error) => {
            observer.error({
              success: false,
              message: error.message || 'Something went wrong',
              data: null,
            });
          })
          .finally(() => {
            observer.complete();
          });
      } catch (error: any) {
        observer.error({
          success: false,
          message: error.message || 'Something went wrong',
          data: null,
        });
        observer.complete();
      }
    });
  }

  deleteDataFromTable(id: string): Observable<{
    success: boolean;
    message: string;
    data: any;
  }> {
    return new Observable((observer) => {
      try {
        this.ddbDocClient
          .send(
            new DeleteCommand({
              TableName: this.tableName,
              Key: {
                PK: id,
              },
            })
          )
          .then(() => {
            observer.next({
              success: true,
              message: 'Data has been deleted successfully',
              data: null,
            });
          })
          .catch((error) => {
            observer.error({
              success: false,
              message: error.message || 'Something went wrong',
              data: null,
            });
          })
          .finally(() => {
            observer.complete();
          });
      } catch (error: any) {
        observer.error({
          success: false,
          message: error.message || 'Something went wrong',
          data: null,
        });
        observer.complete();
      }
    });
  }

  translateText({
    TargetLanguageCode,
    Text,
  }: {
    TargetLanguageCode: string;
    Text: string;
  }): Observable<{
    success: boolean;
    message: string;
    data: any;
  }> {
    this.commonService.setLoaderState(true);
    return new Observable((observer) => {
      try {
        this.translateClient
          .send(
            new TranslateTextCommand({
              SourceLanguageCode: 'en',
              TargetLanguageCode,
              Text,
            })
          )
          .then((response: TranslateTextCommandOutput) => {
            observer.next({
              success: true,
              message: 'Data has been deleted successfully',
              data: response,
            });
          })
          .catch((error) => {
            observer.error({
              success: false,
              message: error.message || 'Something went wrong',
              data: null,
            });
          })
          .finally(() => {
            observer.complete();
            this.commonService.setLoaderState(false);
          });
      } catch (error: any) {
        observer.error({
          success: false,
          message: error.message || 'Something went wrong',
          data: null,
        });
        observer.complete();
        this.commonService.setLoaderState(false);
      }
    });
  }
}
