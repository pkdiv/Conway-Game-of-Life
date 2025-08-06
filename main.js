let pyodide = null;
let loader = document.getElementById("loader");
let canvas = document.getElementById('life');
let ctx = canvas.getContext("2d");

async function main() {

    pyodide = await loadPyodide();
    await pyodide.loadPackage(["numpy", "scipy"]);
    
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const response = await fetch("main.py");
    const pythonCode = await response.text();
    pyodide.runPython(pythonCode);

    const updateGame = pyodide.globals.get("genLoop");

    function draw(grid) {
        const cellSize = 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                if (grid[y][x]) {
                    ctx.fillStyle = "black";
                    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
                }
            }
        }

    }

    function animate() {
        const result = updateGame();  // Calls Python `update()`
        draw(result.toJs());          // Convert Py proxy to JS array
        requestAnimationFrame(animate);
    }

    loader.style.display = "none";
    canvas.style.display = "block"

    animate();

}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

main();