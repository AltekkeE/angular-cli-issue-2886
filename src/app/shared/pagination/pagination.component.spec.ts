import { FormsModule }         from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PaginationComponent } from './pagination.component';

import { newEvent } from '../../test';

let component: PaginationComponent;
let fixture: ComponentFixture<PaginationComponent>;
let debugElement: DebugElement;
let element: HTMLElement;
let nextPageElement: DebugElement;
let previousPageElement: DebugElement;
let pageNumberElement: HTMLInputElement;

describe('Component: Pagination', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [PaginationComponent], // declare the test component
            imports: [FormsModule]
        });

        fixture = TestBed.createComponent(PaginationComponent);

        component = fixture.componentInstance; // PaginationComponent test instance
        debugElement = fixture.debugElement.query(By.css('.pagination'));
        element = debugElement.nativeElement;
        nextPageElement = fixture.debugElement.query(By.css('.next'));
        previousPageElement = fixture.debugElement.query(By.css('.previous'));
        pageNumberElement = fixture.debugElement.query(By.css('input')).nativeElement;

        component.currentPage = 1;
        fixture.autoDetectChanges();
    });

    it('should start at page 1', () => {
        expect(component.currentPage).toBe(1);
    });

    it('should default to 10 pages', () => {
        expect(component.pageCount()).toBe(50);
    });

    it('should increase the page by 1 and fire pageChange eventwhen next is clicked', () => {
        let outputTriggered = false;
        component.currentPage = 2;

        const currentPage: number = component.currentPage;
        component.pageChange.subscribe(() => outputTriggered = true);

        nextPageElement.triggerEventHandler('click', null);
        expect(outputTriggered).toBe(true, 'pageChange event fired');
        expect(component.currentPage).toBe(currentPage + 1);
    });

    it('should decrease the page by 1 and fire pageChange event when previous is clicked', () => {
        let outputTriggered = false;
        component.currentPage = 2;
        const currentPage: number = component.currentPage;
        component.pageChange.subscribe(() => outputTriggered = true);

        previousPageElement.triggerEventHandler('click', null);

        expect(outputTriggered).toBe(true, 'pageChange event fired');
        expect(component.currentPage).toBe(currentPage - 1);
    });

    it('should not go to page zero', () => {
        component.currentPage = 1;

        previousPageElement.triggerEventHandler('click', null);
        expect(component.currentPage).toBe(1);
    });

    it('should not go past pageCount()', () => {
        component.currentPage = component.pageCount();

        nextPageElement.triggerEventHandler('click', null);
        expect(component.currentPage).toBe(component.pageCount());
    });

    it('should change the page number when the user inputs a value', () => {
        let outputTriggered = false;
        component.pageChange.subscribe(() => outputTriggered = true);
        let targetValue = 5;

        pageNumberElement.value = targetValue.toString();
        pageNumberElement.dispatchEvent(newEvent('input'));

        let event: FocusEvent = new FocusEvent('blur');
        pageNumberElement.dispatchEvent(event);

        expect(outputTriggered).toBe(true, 'pageChange event fired');
        expect(component.currentPage).toBe(5);

    });

    it('should not allow a negative page number', () => {
        let targetValue = -1;
        pageNumberElement.value = targetValue.toString();
        pageNumberElement.dispatchEvent(newEvent('input'));

        // Trigger ui event to simulate blur
        pageNumberElement.dispatchEvent(new FocusEvent('blur'));

        expect(component.currentPage).toBe(1);
    });

    it('should disable the previous button when at lower limit', () => {
        pageNumberElement.value = '1';
        pageNumberElement.dispatchEvent(newEvent('input'));

        pageNumberElement.dispatchEvent(new FocusEvent('blur'));
        fixture.detectChanges();

        expect(component.previousDisabled).toBe(true);
        expect(previousPageElement.nativeElement.disabled).toBe(true);
        expect(component.nextDisabled).toBe(false);
        expect(nextPageElement.nativeElement.disabled).toBe(false);
    });

    it('should disable the next button when at upper limit', () => {
        pageNumberElement.value = component.pageCount().toString();
        pageNumberElement.dispatchEvent(newEvent('input'));

        pageNumberElement.dispatchEvent(new FocusEvent('blur'));

        fixture.detectChanges();
        expect(component.previousDisabled).toBe(false);
        expect(previousPageElement.nativeElement.disabled).toBe(false);
        expect(component.nextDisabled).toBe(true);
        expect(nextPageElement.nativeElement.disabled).toBe(true);
    });

    it('next and previous buttons should be enabled when 1 < currentPage < pageCount()', () => {
        pageNumberElement.value = '5';
        pageNumberElement.dispatchEvent(newEvent('input'));

        pageNumberElement.dispatchEvent(new FocusEvent('blur'));
        fixture.detectChanges();

        expect(component.previousDisabled).toBe(false);
        expect(previousPageElement.nativeElement.disabled).toBe(false);
        expect(component.nextDisabled).toBe(false);
        expect(nextPageElement.nativeElement.disabled).toBe(false);
    });

});
