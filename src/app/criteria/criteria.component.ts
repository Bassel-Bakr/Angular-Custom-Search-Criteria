import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
} from '@angular/material/form-field';

@Component({
  selector: 'app-criteria[criteria]',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.scss'],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline',
      } as MatFormFieldDefaultOptions,
    },
  ],
})
export class CriteriaComponent implements OnChanges {
  @Input()
  criteria!: Array<Item>;

  @Output()
  readonly search = new EventEmitter<unknown>();

  _form = new FormGroup({});

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    this._form = this.createForm();
  }

  submit(): void {
    this.search.emit(this._form.value);
  }

  private createForm(): FormGroup {
    const formControls = this.criteria.map((item) => {
      const validators: ValidatorFn[] = [];

      if (item.required) {
        validators.push(Validators.required);
      }

      return [
        item.key,
        new FormControl(
          {
            value: item.defaultValue ?? '',
            disabled: !!item.disabled,
          },
          validators
        ),
      ];
    });

    const formControlsObject = Object.fromEntries(formControls);

    return this.formBuilder.group(formControlsObject);
  }
}

export type Item = {
  key: string;
  label: string;
  type: ItemType;
  required?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  defaultValue?: unknown;
};

type ItemType = 'text' | 'number' | 'date' | 'boolean';

export class CriteriaBuilder {
  static counter = 0;

  createTextField(
    key: string,
    label?: string,
    options?: Omit<RequireOnly<Item, 'key'>, 'type'>
  ): Item {
    return {
      key: key,
      label: label ?? key.toUpperCase(),
      type: 'text',
      required: options?.required ?? false,
      defaultValue: options?.defaultValue ?? '',
    };
  }

  createNumberField(options: Omit<RequireOnly<Item, 'key'>, 'type'>): Item {
    return {
      key: options.key,
      label: options.label ?? options.key.toUpperCase(),
      type: 'number',
      required: options.required ?? false,
      defaultValue: options.defaultValue ?? 0,
    };
  }

  createDateField(options: Omit<RequireOnly<Item, 'key'>, 'type'>): Item {
    return {
      key: options.key,
      label: options.label ?? options.key.toUpperCase(),
      type: 'date',
      required: options.required ?? false,
      defaultValue: options.defaultValue ?? new Date(),
    };
  }
}

type RequireOnly<T extends object, K extends keyof T> = Pick<T, K> &
  Partial<Pick<T, Exclude<keyof T, K>>>;
