export function drawGrid(grid, axes, labels, scale, offsetX, offsetY, svg) {
    grid.innerHTML = "";
    axes.innerHTML = "";
    labels.innerHTML = "";

    const step = 20 * scale;

    for (let x = -offsetX % step; x < svg.clientWidth; x += step) {
        let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", x);
        line.setAttribute("y1", 0);
        line.setAttribute("x2", x);
        line.setAttribute("y2", svg.clientHeight);
        line.setAttribute("stroke", "gray");
        grid.appendChild(line);

        let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", x + 2);
        text.setAttribute("y", svg.clientHeight - 2);
        text.textContent = Math.round((x + offsetX) / scale / 20);
        labels.appendChild(text);
    }
    for (let y = -offsetY % step; y < svg.clientHeight; y += step) {
        let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", 0);
        line.setAttribute("y1", y);
        line.setAttribute("x2", svg.clientWidth);
        line.setAttribute("y2", y);
        line.setAttribute("stroke", "gray");
        grid.appendChild(line);

        let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", 2);
        text.setAttribute("y", y - 2);
        text.textContent = Math.round((y + offsetY) / scale / 20 * -1);
        labels.appendChild(text);
    }

    let axesLineY = document.createElementNS("http://www.w3.org/2000/svg", "line");

    axesLineY.setAttribute("x1", 0);
    axesLineY.setAttribute("y1", 0);
    axesLineY.setAttribute("x2", 0);
    axesLineY.setAttribute("y2", svg.clientHeight);
    axesLineY.setAttribute("stroke", "gray");
    axes.appendChild(axesLineY);

    let axesLineX = document.createElementNS("http://www.w3.org/2000/svg", "line");

    axesLineX.setAttribute("x1", 0);
    axesLineX.setAttribute("y1", svg.clientHeight);
    axesLineX.setAttribute("x2", svg.clientWidth);
    axesLineX.setAttribute("y2", svg.clientHeight);
    axesLineX.setAttribute("stroke", "gray");
    axes.appendChild(axesLineX);
}
