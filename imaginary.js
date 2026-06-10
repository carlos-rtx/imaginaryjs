export default class ComplexNumber {
  constructor([real = 0, imaginary = 0] = [0, 0]) {
    if (typeof real !== "number") {
      throw new Error(
        "Attempted invalid protocol execution: real part must be a number, error code 0x7ECDAE3F",
      );
    }
    if (typeof imaginary !== "number") {
      throw new Error(
        "Attempted invalid protocol execution: imaginary part must be a number, error code 0x9E7DBCE1",
      );
    }
    this.real = real;
    this.imaginary = imaginary;
  }
  toString() {
    const realPart = this.real !== 0 ? String(this.real) : "";
    const imagAbs = Math.abs(this.imaginary);
    const imagValue = imagAbs === 1 ? "" : String(imagAbs);
    //   if (!this.real && this.imaginary === 1) {
    //   return "+i"
    // }
    if (this.real === 0) {
      if (this.imaginary === 0) {
        return "0";
      }
      return `${this.imaginary < 0 ? "-" : ""}${imagValue}i`;
    }

    if (this.imaginary === 0) {
      return realPart;
    }

    const sign = this.imaginary >= 0 ? "+" : "-";
    return `${realPart} ${sign} ${imagValue}i`;
  }
  display() {
    return this.toString();
  }
  static parser(string) {
    const toProcess = string.trim().replace(/\s+/g, "");
    const sanitizer = /^[\+\-\d\.i]+$/;
    const slicer = /^([+-]?\d+(?:\.\d+)?)?([+-]\d*(?:\.\d+)?)i$/;
    const onlyI = /^i$/;
    if (
      !sanitizer.test(toProcess) ||
      (!slicer.test(toProcess) && !onlyI.test(toProcess))
    ) {
      throw new Error(
        "Attempted invalid protocol execution: input string is not a valid complex number format, error code 0xBADINPUT", //lol
      );
    }
    if (onlyI.test(toProcess)) {
      return new ComplexNumber([0, 1]);
    }
    const processed = toProcess.match(slicer);
    let realPart = Number(processed[1]) || 0;
    let imaginaryPartString = processed[2];
    let imaginaryPart;
    if (imaginaryPartString === "+") {
      imaginaryPart = 1;
    } else if (imaginaryPartString === "-") {
      imaginaryPart = -1;
    } else {
      imaginaryPart = Number(imaginaryPartString);
    }
    return new ComplexNumber([realPart, imaginaryPart]);
  }
  static evaluate(string) {
    //empecemos por aceptar cuatro operaciones posibles: suma, resta, multiplicación y división
    const toProcess = string.trim().replace(/\0*\s+/g, "");
    const sanitizer = /^[x\+\-\d\.\/\(\)\*i]+$/;
    //suma resta
    const additionBlueprint =
      /^((\-?\d*(?:\.\d+)?)?([+-]?\d*(?:\.\d+)?)i)([\+\-])((\-?\d*(?:\.\d+)?)?([+-]?\d*(?:\.\d+)?)i)$/;
    const secondAdditionBlueprint = /^[+-]i[+-][+-]i$/;
    //multiplicación y división
    const multiplicationBlueprint =
      /^(?:\((\-?\d*(?:\.\d+)?)(([+-]?\d*(?:\.\d+)?)i?)\))([\*\/]?)(?:\((\-?\d*(?:\.\d+)?)(([+-]?\d*(?:\.\d+)?)i?)\))$/;
    const preMultBlueprint = /^\((.+)\)([\*\/])\((.+)\)$/;
    //sqrt 
    const sqrtBlueprint = /^sqrt\(((\-?\d*(?:\.\d+)?)?([+-]?\d*(?:\.\d+)?)i)\)$/;
    //sin, cos, tan
    const trigBlueprint = /^(sin|cos|tan)\(((\-?\d*(?:\.\d+)?)?([+-]?\d*(?:\.\d+)?)i)\)$/;
    console.log(toProcess);
    console.log(preMultBlueprint.test(toProcess));
  }
  multiply(factors) {
    return factors.reduce((acc, factor) => {
      const realPart =
        acc.real * factor.real - acc.imaginary * factor.imaginary;
      const imaginaryPart =
        acc.real * factor.imaginary + acc.imaginary * factor.real;
      return new ComplexNumber([realPart, imaginaryPart]);
    }, this);
  }
  addition(numbers) {
    return numbers.reduce((acc, factor) => {
      const realPart = acc.real + factor.real;
      const imaginaryPart = acc.imaginary + factor.imaginary;
      return new ComplexNumber([realPart, imaginaryPart]);
    }, this);
  }
  subtract(numbers) {
    return numbers.reduce((acc, factor) => {
      const realPart = acc.real - factor.real;
      const imaginaryPart = acc.imaginary - factor.imaginary;
      return new ComplexNumber([realPart, imaginaryPart]);
    }, this);
  }
  division(divisors) {
    return divisors.reduce((acc, divisor) => {
      const denominator = divisor.real ** 2 + divisor.imaginary ** 2;
      if (denominator === 0) {
        throw new Error(
          "Attempted invalid protocol execution: division by zero, error code 0xDEADBEEF",
        );
      }
      const realPart =
        (acc.real * divisor.real + acc.imaginary * divisor.imaginary) /
        denominator;
      const imaginaryPart =
        (acc.imaginary * divisor.real - acc.real * divisor.imaginary) /
        denominator;
      return new ComplexNumber([realPart, imaginaryPart]);
    }, this); //oh shit here we go
  }
  sqrt() {
    //y esto se me hacia dificil
    const modulus = Math.sqrt(this.real ** 2 + this.imaginary ** 2);
    const realPart = Math.sqrt((modulus + this.real) / 2);
    const imaginaryPart =
      Math.sign(this.imaginary) * Math.sqrt((modulus - this.real) / 2);
    return new ComplexNumber([realPart, imaginaryPart]);
  }
  argument() {
    return {
      rad: this.toPolar().rad,
      deg: this.toPolar().deg,
    };
  }
  modulus() {
    return Math.sqrt(this.real ** 2 + this.imaginary ** 2);
  }
  conjugate() {
    //save(int) //esto va a explotar
    return new ComplexNumber([this.real, -this.imaginary]);
  }
  toPolar() {
    const modulus = Math.sqrt(this.real ** 2 + this.imaginary ** 2);
    let theta = Math.atan2(this.imaginary, this.real);
    if (theta < 0) {
      theta += 2 * Math.PI;
    }
    return { modulus, rad: theta, deg: theta * (180 / Math.PI) };
  }
  logarithm(k = 0) {
    //initial k value
    // ln(z) = ln(r) + i(θ + 2kπ)
    const polarNumber = this.toPolar();
    const rLog = Math.log(polarNumber.modulus); //natural logarithm of r
    const imaginaryPart = polarNumber.rad + 2 * k * Math.PI;
    return new ComplexNumber([rLog, imaginaryPart]);
  }
  powInt(n = 2) {
    const polarNumber = this.toPolar();
    const rPow = Math.pow(polarNumber.modulus, n);
    const realPart = rPow * Math.cos(n * polarNumber.rad);
    const imaginaryPart = rPow * Math.sin(n * polarNumber.rad);
    return new ComplexNumber([realPart, imaginaryPart]);
  }
  powComplex(exponent) {
    const polarNumber = this.toPolar();
    let baseLogarithm = this.logarithm(0);
    let complexExponential = baseLogarithm.multiply([exponent]);
    const newModulus = Math.exp(complexExponential.real);
    const realPart = newModulus * Math.cos(complexExponential.imaginary);
    const imaginaryPart = newModulus * Math.sin(complexExponential.imaginary);
    return new ComplexNumber([realPart, imaginaryPart]);
  }
  sin() {
    const realPart = Math.sin(this.real) * Math.cosh(this.imaginary);
    const imaginaryPart = Math.cos(this.real) * Math.sinh(this.imaginary);
    return new ComplexNumber([realPart, imaginaryPart]);
  }
  cos() {
    const realPart = Math.cos(this.real) * Math.cosh(this.imaginary);
    const imaginaryPart = Math.sin(this.real) * Math.sinh(this.imaginary);
    return new ComplexNumber([realPart, -imaginaryPart]);
  }
  tan() {
    let sin = this.sin();
    return sin.division([this.cos()]);
  }
  static toBinomial({ modulus, theta }) {
    const real = modulus * Math.cos(theta);
    const imaginary = modulus * Math.sin(theta);
    return new ComplexNumber([real, imaginary]);
  }
}
//console.log(ComplexNumber.evaluate("(4)*(5)")); //false
//2k de tokens joder