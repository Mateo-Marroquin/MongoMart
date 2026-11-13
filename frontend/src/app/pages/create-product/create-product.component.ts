import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import type { NewProduct, ProductArea } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';

type ProductField = 'name' | 'price' | 'stock' | 'area' | 'imgURL';

const integerValidator = (
  control: AbstractControl<number | null>,
): ValidationErrors | null =>
  control.value === null || Number.isInteger(control.value)
    ? null
    : { integer: true };

@Component({
  selector: 'app-create-product',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './create-product.component.html',
})
export class CreateProductComponent {
  private readonly productService = inject(ProductService);
  private readonly router = inject(Router);

  readonly isSubmitting = signal(false);
  readonly error = signal('');
  readonly productForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(120)],
    }),
    price: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(0),
    ]),
    stock: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(0),
      integerValidator,
    ]),
    area: new FormControl<ProductArea>('Electronics', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    imgURL: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  createProduct(): void {
    if (this.isSubmitting()) {
      return;
    }

    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const { name, price, stock, area, imgURL } = this.productForm.getRawValue();
    if (price === null || stock === null) {
      return;
    }

    const product: NewProduct = { name, price, stock, area, imgURL };
    this.isSubmitting.set(true);
    this.error.set('');
    this.productService.createProduct(product).subscribe({
      next: () => {
        void this.router.navigate(['/products']);
      },
      error: () => {
        this.error.set('No se pudo crear el producto. Intenta de nuevo.');
        this.isSubmitting.set(false);
      },
    });
  }

  fieldError(field: ProductField): string | null {
    const control = this.productForm.controls[field];
    if (!control.touched || !control.errors) {
      return null;
    }

    if (control.hasError('required')) {
      return 'Este campo es obligatorio.';
    }
    if (control.hasError('maxlength')) {
      return 'El nombre no puede superar los 120 caracteres.';
    }
    if (control.hasError('min')) {
      return 'El valor no puede ser negativo.';
    }
    if (control.hasError('integer')) {
      return 'La existencia debe ser un número entero.';
    }
    if (control.hasError('pattern')) {
      return 'Ingresa una URL válida que comience con http:// o https://.';
    }

    return 'Revisa este campo.';
  }
}
