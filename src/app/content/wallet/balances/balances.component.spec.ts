// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import {Component, Directive} from '@angular/core';
import {WalletBalancesComponent} from './balances.component';
import {AlertService} from '../../../services/alert.service';
import {MatDialog} from '@angular/material';
import {SdacService} from '../../../services/sdac.service';
import {UIService} from '../../../services/ui.service';

@Injectable()
class MockAlertService { }
      
@Injectable()
class MockSdacService { }
      
@Injectable()
class MockUIService { }
      
(<any>window).Date = jest.fn();
      
describe('WalletBalancesComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        WalletBalancesComponent
      ],
      providers: [
        {provide: AlertService, useClass: MockAlertService},
        MatDialog,
        {provide: SdacService, useClass: MockSdacService},
        {provide: UIService, useClass: MockUIService},
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(WalletBalancesComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });
  
    
  it('should run #ngOnInit()', async () => {
    // const result = component.ngOnInit();
  });
        
  it('should run #getAccountHistory()', async () => {
    // const result = component.getAccountHistory();
  });
        
  it('should run #transferXsd()', async () => {
    // const result = component.transferXsd();
  });
        
  it('should run #redeemRylt()', async () => {
    // const result = component.redeemRylt();
  });
        
  it('should run #vestXsd()', async () => {
    // const result = component.vestXsd();
  });
        
  it('should run #withdrawVest()', async () => {
    // const result = component.withdrawVest();
  });
        
  it('should run #cancelWithdraw()', async () => {
    // const result = component.cancelWithdraw();
  });
        
});
