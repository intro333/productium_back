import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  GatewayMetadata,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Header, Logger } from '@nestjs/common';

export interface GatewayMetadataExtended extends GatewayMetadata {
  handlePreflightRequest: (req, res) => void;
}

const options = {
  handlePreflightRequest: (req, res) => {
    const headers = {
      'Access-Control-Allow-Headers': 'Content-Type, authorization, x-token',
      // 'Access-Control-Allow-Origin': req.headers.origin,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Max-Age': '1728000',
      'Content-Length': '0',
    };
    res.writeHead(200, headers);
    res.end();
  },
} as GatewayMetadataExtended;

@WebSocketGateway(options)
// @WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('AppGateway');

  @Header('Access-Control-Allow-Origin', '*')
  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): void {
    this.server.emit('msgToClient', payload);
  }

  @Header('Access-Control-Allow-Origin', '*')
  afterInit(server: Server) {
    this.logger.log('Init');
  }

  @Header('Access-Control-Allow-Origin', '*')
  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @Header('Access-Control-Allow-Origin', '*')
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
