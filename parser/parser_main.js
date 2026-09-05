import patterns from './regex.js';
export default function evaluate(string) {
    const toProcess = string.trim().replace(/\0*\s+/g, "");
    if (!patterns.sanitizer.test(toProcess)) {
      throw new Error("something")
    }

    
}
