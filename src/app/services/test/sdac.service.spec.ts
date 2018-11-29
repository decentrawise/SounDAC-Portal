import { async } from '@angular/core/testing';
import { SdacService } from '../sdac.service';

describe('SdacService', () => {
  let service;


  const alertService: any = {
    // mock properties here 
  };

  const auth: any = {
    // mock properties here 
  };

  beforeEach(() => {
    service = new SdacService(alertService, auth);
  });


  it('should run #setWebSocket()', async () => {
    // const result = setWebSocket();
  });

  it('should run #getAccount()', async () => {
    // const result = getAccount(username);
  });

  it('should run #streamAccountInfo$()', async () => {
    // const result = streamAccountInfo$(username);
  });

  it('should run #getAccountContent()', async () => {
    // const result = getAccountContent(username);
  });

  it('should run #getAccountHistory()', async () => {
    // const result = getAccountHistory(username);
  });

  it('should run #getWitnesses()', async () => {
    // const result = getWitnesses();
  });

  it('should run #getStreamingPlatforms()', async () => {
    // const result = getStreamingPlatforms();
  });

  it('should run #voteStreamingPlatform()', async () => {
    // const result = voteStreamingPlatform(username, activeKey, streamingPlatform, vote);
  });

  it('should run #transferXsd()', async () => {
    // const result = transferXsd(username, password, transferTo, amount, memo);
  });

  it('should run #transferXsdtoVest()', async () => {
    // const result = transferXsdtoVest(username, activeKey, amount);
  });

  it('should run #redeemRylt()', async () => {
    // const result = redeemRylt(username, activeKey, amount);
  });

  it('should run #withdrawVesting()', async () => {
    // const result = withdrawVesting(username, password, amount);
  });

  it('should run #voteWitness()', async () => {
    // const result = voteWitness(username, password, witnessOwner, vote);
  });

  it('should run #claimBalance()', async () => {
    // const result = claimBalance(username, wif);
  });

  it('should run #postContent()', async () => {
    // const result = postContent(password, username, content);
  });

  it('should run #userExist()', async () => {
    // const result = userExist(username);
  });

});
