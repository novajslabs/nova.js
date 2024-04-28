import { useEffect, useState } from "react";
export function useLoadScript(src: string) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    new_script(src).then(() => {
      window.mermaid.mermaidAPI.initialize({
        securityLevel: "loose",
        startOnLoad: true,
      });
      window.mermaid.contentLoaded();
      console.log("Mermaid is ready");
      setReady(true);
    });
  }, []);
  return ready;
}

function new_script(src: string) {
  return new Promise(function (resolve, reject) {
    if (typeof window !== "undefined") {
      let script = window.document.createElement("script");
      script.src = src;
      script.addEventListener("load", function () {
        resolve();
      });
      script.addEventListener("error", function (e) {
        reject(e);
      });
      window.document.body.appendChild(script);
    }
  });
}
