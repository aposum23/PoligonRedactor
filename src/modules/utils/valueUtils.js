export function getTransformValues(element) {
    const transform = element.getAttribute('transform');
    const translateMatch = transform?.match(/translate\(([^)]+)\)/);

    if (translateMatch) {
        const [x, y] = translateMatch[1].split(',').map(Number);
        return {x, y};
    }

    return {x: null, y: null};
}