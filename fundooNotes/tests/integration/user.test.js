import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import HttpStatus from 'http-status-codes';

import app from '../../src/index';
let jwToken;
//------------------> for clearing the collection
describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => {});
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });
//------------------>registration
  describe('registration', () => {
    it('given user details in registration should be saved in database', (done) => {
      const inputBody =  {
        "firstname" : "Saran",
        "lastname" : "Yellanki",
        "email": "saran.yellanki12@gmail.com",
        "password": "newPassTest"
      }
      request(app)
        .post('/api/v1/users/newUser')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
          done();
        });
    });
    it('given user details in registration should be saved in database', (done) => {
      const inputBody =  {
        "firstname" : 123 ,
        "lastname" : "Yellanki",
        "email": "saran.yellanki12@gmail.com",
        "password": "newPassTest"
      }
      request(app)
        .post('/api/v1/users/newUser')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
          done();
        });
    });
  });
//-------------->login
  describe('login', () => {
    it('given user details for login should return 200', (done) => {
      const inputBody =  {
        "email": "saran.yellanki12@gmail.com",
        "password": "newPassTest"
      }
      request(app)
        .post('/api/v1/users/login')
        .send(inputBody)
        .end((err, res) => {
          jwToken = res.body.data
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
    // it('given user details in registration should be saved in database', (done) => {
    //   const inputBody =  {
    //     "firstname" : 123 ,
    //     "lastname" : "Yellanki",
    //     "email": "saran.yellanki12@gmail.com",
    //     "password": "newPassTest"
    //   }
    //   request(app)
    //     .post('/api/v1/users/newUser')
    //     .send(inputBody)
    //     .end((err, res) => {
    //       expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
    //       done();
    //     });
    // });
  });
  //----------------> creating a note
  describe('notes', () => {
    it('given user details for login should return 200', (done) => {
      const inputBody =  {
        "Title": "Hello",
        "Decription": "Hey"
      }
      request(app)
        .post('/api/v1/notes')
        .send(inputBody)
        .set('Authorization', `Bearer ${jwToken}`)
        .end((err, res) => {
          //jwToken = res.body.data
          expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
          done();
        });
    });
    // it('given user details in registration should be saved in database', (done) => {
    //   const inputBody =  {
    //     "firstname" : 123 ,
    //     "lastname" : "Yellanki",
    //     "email": "saran.yellanki12@gmail.com",
    //     "password": "newPassTest"
    //   }
    //   request(app)
    //     .post('/api/v1/users/newUser')
    //     .send(inputBody)
    //     .end((err, res) => {
    //       expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
    //       done();
    //     });
    // });
  });
  //------------------> get all notes
  describe('/notes', () => {
    it('given token should retrieve all the notes of the user ', (done) => {
      request(app)
        .get('/api/v1/notes')
        .set('Authorization', `Bearer ${jwToken}`)
        .end((err, res) => {
          //jwToken = res.body.data
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  })  
//-------------------->get note by id
  describe('/notes/_id', () => {
    it('given token should retrieve the note of the particular id ', (done) => {
      request(app)
        .get('/api/v1/notes/_id')
        .set('Authorization', `Bearer ${jwToken}`)
        .end((err, res) => {
          //jwToken = res.body.data
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  })  

  //----------------->updating the note
  describe('notes/_id', () => {
    it('given token should update the given note of the particular id', (done) => {
      const inputBody =  {
        "Title": "Heyy",
        "Decription": "Hello"
      }
      request(app)
        .put('/api/v1/notes/_id')
        .send(inputBody)
        .set('Authorization', `Bearer ${jwToken}`)
        .end((err, res) => {
          //jwToken = res.body.data
          expect(res.statusCode).to.be.equal(HttpStatus.ACCEPTED);
          done();
        });
    });
  })
  //----------------> DELETING THE NOTE
  describe('/notes/_id', () => {
    it('given token should delete the note of the particular id ', (done) => {
      request(app)
        .delete('/api/v1/notes/_id')
        .set('Authorization', `Bearer ${jwToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.ACCEPTED);
          done();
        });
    });
  })  
});
