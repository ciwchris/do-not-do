import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    shouldShowDecisions: false;
    notDoFormGroup: FormGroup;
    doFormGroup: FormGroup;
    notDoControl = new FormControl('', Validators.required);
    doControl = new FormControl('', Validators.required);
    options: string[] = ['One', 'Two', 'Three'];
    notDoFilteredOptions: Observable<string[]>;
    doFilteredOptions: Observable<string[]>;

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.notDoFormGroup = this.formBuilder.group({
            notDoControl: this.notDoControl
        });
        this.doFormGroup = this.formBuilder.group({
            doControl: this.doControl
        });

        this.notDoFilteredOptions = this.notDoControl.valueChanges.pipe(
            startWith(''),
            map(value => this.filter(value))
        );
        this.doFilteredOptions = this.doControl.valueChanges.pipe(
            startWith(''),
            map(value => this.filter(value))
        );
    }

    hasDailyDecision() {
        return (
            this.notDoFormGroup.get('notDoControl').value.length &&
            this.doFormGroup.get('doControl').value.length
        );
    }

    private filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }
}
