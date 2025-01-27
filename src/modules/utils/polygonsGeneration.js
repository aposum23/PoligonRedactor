export function generateRandomPolygons() {
    const numPolygons = Math.floor(Math.random() * (20 - 5 + 1)) + 5;
    const polygons = [];

    for (let i = 0; i < numPolygons; i++) {
        const numPoints = Math.floor(Math.random() * (10 - 3 + 1)) + 3;
        const centerX = Math.random() * window.innerWidth;
        const centerY = Math.random() * window.innerHeight / 2.5;
        const radius = Math.random() * 50 + 20;

        const points = [];

        for (let j = 0; j < numPoints; j++) {
            const angle = (j / numPoints) * Math.PI * 2;
            const x = Math.round(centerX + Math.cos(angle) * radius);
            const y = Math.round(centerY + Math.sin(angle) * radius);
            points.push({ x, y });
        }

        polygons.push(points);
    }

    return polygons;
}