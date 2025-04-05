import "./index.css";

import { ZeroData, ZeroProvider } from "./zero-data";

export function App() {
    return (
        <ZeroProvider>
            <ZeroData />
        </ZeroProvider>
    );
}

export default App;
