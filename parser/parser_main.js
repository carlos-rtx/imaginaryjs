import patterns from './regex.js';
export default function evaluate(string) {
    const toProcess = string.trim().replace(/\0*\s+/g, "");
    if (!patterns.sanitizer.test(toProcess)) {
      throw new Error("something")
    }
    switch (toProcess) {
      case patterns.secondAddition.test(toProcess):
        let [_, a, operator, b] = toProcess.match(patterns.secondAddition);
        a = 1
        b = 1
        if (operator === "+") {
          return new ComplexNumber([0, a]).addition(new ComplexNumber([0, b]));
        } else if (operator === "-") {
          return new ComplexNumber([0, a]).subtraction(new ComplexNumber([0, b]));
        } else {
          throw new Error("Invalid operator");
        }
      case patterns.addition.test(toProcess):
      default:
        throw new Error("Invalid input");
    }
    
}
