import patterns from './regex.js';
export default function evaluate(string) {
    const toProcess = string.trim().replace(/\0*\s+/g, "");
    if (!patterns.sanitizer.test(toProcess)) {
      throw new Error("something")
    }
    const matches = [
      { regex: patterns.preMult, handler: (m) => {
        const x = ComplexNumber.parse(m[1]);
        const y = ComplexNumber.parse(m[3]);
        return x.multiply(y);
      }},
      { regex: patterns.sqrt, handler: (m) => {
        const value = m[2];
        return ComplexNumber.sqrt(value);
      }},
      { regex: patterns.trig, handler: (m) => {
        const functionName = m[1];
        const value = m[2];
        const complexValue = ComplexNumber.parse(value);
        return complexValue[functionName]();
      }},
      { regex: patterns.multiplication, handler: (m) => {
        const x = m[1];
        const y = m[4];
        return x.multiply(y);
      }},
      { regex: patterns.secondAddition, handler: (m) => {
        let [_, a_str, op, b_str] = m;
        const a = ComplexNumber.parse(a_str);
        const b = ComplexNumber.parse(b_str);
        return op === "+" ? a.add(b) : a.sub(b);
      }},
      { regex: patterns.addition, handler: (m) => {
        const a = ComplexNumber.parse(m[1]);
        const operator = m[2];
        const b = ComplexNumber.parse(m[3]);

        if (operator === "+") {
          return a.add(b);
        } else if (operator === "-") {
          return a.sub(b);
        } else {
          throw new Error("Invalid operator");
        }
      }}
    ];

    for (const { regex, handler } of matches) {
      const match = toProcess.match(regex);
      if (match) {
        return handler(match);
      }
    }

    throw new Error("Invalid input format or unsupported operation");
    
}
//please read imaginary.js bro it cant be that hard