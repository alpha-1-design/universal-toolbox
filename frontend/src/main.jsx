import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/global.css";
import { Analytics } from "@vercel/analytics/react";

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null }; }
  componentDidCatch(error) { this.setState({ error }); }
  render() {
    if (this.state.error) return (
      <div style={{ padding: 24, fontFamily: "monospace", background: "#0d1117", color: "#f85149", minHeight: "100vh" }}>
        <h2>Runtime Error:</h2>
        <pre style={{ whiteSpace: "pre-wrap", fontSize: 12 }}>{this.state.error.toString()}</pre>
        <pre style={{ whiteSpace: "pre-wrap", fontSize: 11, color: "#8b949e" }}>{this.state.error.stack}</pre>
      </div>
    );
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
    <App />
    <Analytics />
  </ErrorBoundary>
);
