import patterns from './regex.js';
export default function evaluate(string) {
    const toProcess = string.trim().replace(/\0*\s+/g, "");
    if (!patterns.sanitizer.test(toProcess)) {
      throw new Error("something")
    }
    switch (toProcess) {
      case patterns.secondAddition.test(toProcess):
        let [_, a, operator, b] = toProcess.match(patterns.secondAddition);
        if (operator === "+") {
          return new ComplexNumber([0, 1]).addition(new ComplexNumber([0, 1]));
        } else if (operator === "-") {
          return new ComplexNumber([0, 1]).subtraction(new ComplexNumber([0, 1]));
        } else {
          throw new Error("Invalid operator");
        }
      case patterns.addition.test(toProcess):
      default:
        throw new Error("Invalid input");
    }
    
}
