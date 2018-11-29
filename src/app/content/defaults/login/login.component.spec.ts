// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import {Component, Directive} from '@angular/core';
import {LoginComponent} from './login.component';
import {FormBuilder} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {UIService} from '../../../services/ui.service';

@Injectable()
class MockAuthService { }
      
@Injectable()
class MockUIService { }
      
describe('LoginComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent
      ],
      providers: [
        FormBuilder,
        {provide: AuthService, useClass: MockAuthService},
        {provide: UIService, useClass: MockUIService},
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });
  
    
  it('should run #login()', async () => {
    // const result = component.login();
  });
        
});
