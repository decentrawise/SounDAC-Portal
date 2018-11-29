import { async } from '@angular/core/testing';
import { AuthService } from '../auth.service';

describe('AuthService', () => {
  let service;


  const http: any = {
    // mock properties here 
  };

  const router: any = {
    // mock properties here 
  };

  const afs: any = {
    // mock properties here 
  };

  const afAuth: any = {
    // mock properties here 
  };

  const alert: any = {
    // mock properties here 
  };

  const userService: any = {
    // mock properties here 
  };

  const ui: any = {
    // mock properties here 
  };

  beforeEach(() => {
    service = new AuthService(http, router, afs, afAuth, alert, userService, ui);
  });


  it('should run #register()', async () => {
    // const result = register(user);
  });

  it('should run #login()', async () => {
    // const result = login(user);
  });

  it('should run #email()', async () => {
    // const result = email(email);
  });

  it('should run #logout()', async () => {
    // const result = logout();
  });

  it('should run #isUser()', async () => {
    // const result = isUser(user);
  });

  it('should run #isManagement()', async () => {
    // const result = isManagement(user);
  });

  it('should run #isAdmin()', async () => {
    // const result = isAdmin(user);
  });

  it('should run #checkAuthorization()', async () => {
    // const result = checkAuthorization(user, allowedRoles);
  });

  it('should run #updateRole()', async () => {
    // const result = updateRole(key);
  });

  it('should run #setSocket()', async () => {
    // const result = setSocket();
  });

  it('should run #getPrivateKeys()', async () => {
    // const result = getPrivateKeys(username, password);
  });

  it('should run #updateAccountKeys()', async () => {
    // const result = updateAccountKeys(username, password, newPassword);
  });

});
