import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/index';

describe('User APIs Test', () => {
  // before((done) => {
  //   const clearCollections = () => {
  //     for (const collection in mongoose.connection.collections) {
  //       mongoose.connection.collections[collection].deleteOne(() => {});
  //     }
  //   };

  //   const mongooseConnect = async () => {
  //     await mongoose.connect(process.env.DATABASE_TEST);
  //     clearCollections();
  //   };

  //   if (mongoose.connection.readyState === 0) {
  //     mongooseConnect();
  //   } else {
  //     clearCollections();
  //   }

  //   done();
  // });

  // describe('GET /users', () => {
  //   it('should return empty array', (done) => {
  //     request(app)
  //       .get('/api/v1/users')
  //       .end((err, res) => {
  //         expect(res.statusCode).to.be.equal(200);
  //         expect(res.body.data).to.be.an('array');

  //         done();
  //       });
  //   });
  // });
  describe('registration', () => {
    const inputBody =  {
      "firstname" : "Saran",
      "lastname" : "Yellanki",
      "email": "saran.yellanki12@gmail.com",
      "password": "newPassTest"
    }
    it('given user details in registration should be saved in database', (done) => {
      request(app)
        .post('/api/v1/newuser')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });
  });  
});

