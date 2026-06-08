# ImaginaryJS

A small JavaScript library for working with complex numbers in binomial and polar form.

## Overview

`ComplexNumber` is a class that supports:
- creation from real and imaginary parts
- text conversion with `toString()` and `display()`
- parsing complex numbers from strings
- arithmetic operations: addition, subtraction, multiplication, division
- advanced operations: square root, complex logarithm, polar conversion, powers, and complex trigonometry

## Usage

```js
import ComplexNumber from './imaginaryjs.js';

const z = new ComplexNumber([3, 4]);
console.log(z.toString()); // "3 + 4i"

const parsed = ComplexNumber.parser('5 - 2i');
console.log(parsed.real, parsed.imaginary);
```

## API

WIP

### Constructor

`new ComplexNumber([real = 0, imaginary = 0])`

Creates a new complex number instance.

### Instance methods

- `toString()` - returns a formatted complex number string
- `display()` - alias for `toString()`
- `multiply(factors)` - multiply this complex number by an array of other complex numbers
- `addition(numbers)` - add an array of complex numbers to this one
- `subtract(numbers)` - subtract an array of complex numbers from this one
- `division(divisors)` - divide this complex number by an array of divisors
- `sqrt()` - compute the principal square root
- `argument()` - return the current argument in radians and degrees
- `conjugate()` - return the complex conjugate
- `toPolar()` - convert this number to polar coordinates
- `logarithm(k = 0)` - compute the complex logarithm with branch `k`
- `powInt(n = 2)` - raise the number to an integer power
- `powComplex(exponent)` - raise the number to another complex exponent
- `sin()` - complex sine
- `cos()` - complex cosine
- `tan()` - complex tangent

### Static methods

- `ComplexNumber.parser(string)` - parse a complex number string into a `ComplexNumber`
- `ComplexNumber.toBinomial({ modulus, theta })` - convert polar coordinates back to binomial form

## Error codes

- `0x7ECDAE3F` - real part must be a number
- `0x9E7DBCE1` - imaginary part must be a number
- `0xBADINPUT` - invalid parser input
- `0xDEADBEEF` - division by zero

