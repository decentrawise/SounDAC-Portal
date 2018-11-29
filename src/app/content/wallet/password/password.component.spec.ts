// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import {Component, Directive} from '@angular/core';
import {WalletPasswordComponent} from './password.component';
import {AuthService} from '../../../services/auth.service';
import {AlertService} from '../../../services/alert.service';
import {FormBuilder} from '@angular/forms';
import {UIService} from '../../../services/ui.service';

@Injectable()
class MockAuthService { }
      
@Injectable()
class MockAlertService { }
      
@Injectable()
class MockUIService { }
      
describe('WalletPasswordComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        WalletPasswordComponent
      ],
      providers: [
        {provide: AuthService, useClass: MockAuthService},
        {provide: AlertService, useClass: MockAlertService},
        FormBuilder,
        {provide: UIService, useClass: MockUIService},
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(WalletPasswordComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });
  
    
  it('should run #passwordMatch()', async () => {
    // const result = component.passwordMatch();
  });
        
  it('should run #updatePassword()', async () => {
    // const result = component.updatePassword();
  });
        
});