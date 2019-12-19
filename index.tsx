import * as React from "react";
import * as ReactDOM from "react-dom";
import Print from "./components/Print";

export class App extends React.Component {
  render() {
    return (
      <>
        <Print />
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
