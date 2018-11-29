import { async } from '@angular/core/testing';
import { UserService } from '../user.service';

describe('UserService', () => {
  let service;


  const http: any = {
    // mock properties here 
  };

  beforeEach(() => {
    service = new UserService(http);
  });


  it('should run #getUsers()', async () => {
    // const result = getUsers();
  });

  it('should run #getUser()', async () => {
    // const result = getUser(id);
  });

  it('should run #addUser()', async () => {
    // const result = addUser(user);
  });

  it('should run #updateUser()', async () => {
    // const result = updateUser(user);
  });

  it('should run #deleteUser()', async () => {
    // const result = deleteUser(user);
  });

});
