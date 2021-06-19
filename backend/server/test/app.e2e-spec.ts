import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import * as io from 'socket.io-client';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let connectToSocketIO: () => io.Socket;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    await app.listen(0);
    const httpServer = app.getHttpServer();
    connectToSocketIO = () =>
      io.connect(`http://127.0.0.1:${httpServer.address().port}`, {
        transports: ['websocket'],
        forceNew: true,
      });
  });

  afterEach(async () => {
    await app.close();
  });

  it('should connect and disconnect', (done) => {
    const socket = connectToSocketIO();

    socket.on('connect', () => {
      socket.disconnect();
    });

    socket.on('disconnect', (reason) => {
      expect(reason).toBe('io client disconnect');
      done();
    });
    socket.on('error', done);
  });

  it('has fields lists and notes', (done) => {
    const socket = connectToSocketIO();
    socket.on('data', (responce) => {
      expect(responce).toHaveProperty('lists');
      expect(responce).toHaveProperty('notes');
      if (responce.lists.length > 0) {
        expect(responce.lists[0]).toHaveProperty('id');
        expect(responce.lists[0]).toHaveProperty('listName');
      }
      if (responce.notes.length > 0) {
        expect(responce.notes[0]).toHaveProperty('listId');
        expect(responce.notes[0]).toHaveProperty('id');
        expect(responce.notes[0]).toHaveProperty('noteName');
        expect(responce.notes[0]).toHaveProperty('dateCreate');
        expect(responce.notes[0]).toHaveProperty('deadline');
        expect(responce.notes[0]).toHaveProperty('dateComplation');
        expect(responce.notes[0]).toHaveProperty('important');
        expect(responce.notes[0]).toHaveProperty('status');
        expect(true).toEqual(true)
      }

      socket.disconnect();
      done();
    });
    socket.emit('get_lists_and_notes', 9);
  });
  it('',(done)=>{
    done()
  })
});
