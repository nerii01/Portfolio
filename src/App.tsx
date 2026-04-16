import CodeSandbox from "./components/code/CodeSandbox";
import Code from "./assets/codes/UPlayer.cpp?raw";

function App() {
  return (
    <>
      <div style={{ padding: "10px", boxSizing: "border-box" }}>
        <CodeSandbox
          Header={"Includes"}
          Code={Code.slice(315, 371)}
          HeadingColor={"rgba(120, 120, 120, 0.43)"}
        />
        <br></br>

        <CodeSandbox
          Header={"Read File"}
          Code={Code.slice(373, 547)}
        />
      </div>
    </>
  );
}

export default App;
