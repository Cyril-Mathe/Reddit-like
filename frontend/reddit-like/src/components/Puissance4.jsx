import { useEffect, useState, useRef } from "react";

export default function Connect4Page() {
  const [pyodide, setPyodide] = useState(null);
  const [output, setOutput] = useState("");
  const inputRef = useRef(null);

  
  useEffect(() => {
    const initPyodide = async () => {
      const py = await window.loadPyodide();
      await py.loadPackage("micropip");
      await py.runPythonAsync(`
import sys
class JSWriter:
    def write(self, s):
        from js import window
        window.dispatchEvent(window.CustomEvent.new("py-output", { "detail": s }))
    def flush(self): pass
sys.stdout = JSWriter()
sys.stderr = JSWriter()
`);
      const response = await fetch("/assets/puissance4.py");
      const code = await response.text();
      await py.runPythonAsync(code);
      py.runPythonAsync("jeu = TicTacToe()");
      setPyodide(py);
    };
    initPyodide();
    window.addEventListener("py-output", (e) => {
      setOutput((prev) => prev + e.detail);
    });
  }, []);

  const handlePlay = async () => {
    if (!pyodide) return;
    const colonne = inputRef.current.value;
    inputRef.current.value = "";
    try {
      await pyodide.runPythonAsync(`
col = int(${colonne}) - 1
valid, row = jeu.coup(1, col)
if valid:
    jeu.computer_play()
print(jeu)
`);
    } catch (e) {
      setOutput((prev) => prev + "\nErreur : " + e.message);
    }
  };

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">P Four</h1>
      <pre className="bg-black p-2 rounded mb-4">{output}</pre>
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="number"
          placeholder="Colonne (1-7)"
          className="p-2 text-black"
        />
        <button onClick={handlePlay} className="bg-blue-500 px-4 py-2 rounded">
          Jouer
        </button>
      </div>
    </div>
  );
}
