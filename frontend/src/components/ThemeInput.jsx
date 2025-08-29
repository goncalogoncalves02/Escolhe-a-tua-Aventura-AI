import {useState} from "react";

function ThemeInput({onSubmit}) {
    const [theme, setTheme] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!theme.trim()) {
            setError("O Tema não pode estar vazio");
            return
        }
        onSubmit(theme);
    }

    return <div className="theme-input-container">
        <h2>Gera a tua aventura</h2>
        <p>Escreve o tema da tua aventura interativa</p>

        <form onSubmit={handleSubmit}>
            <div className="input-group">
                <input
                    type="text"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    placeholder="Escreve o tema da tua aventura (ex: medieval, ficção científica, mistério...)"
                    className={error ? "error" : ""}
                />
                {error && <p className="error-text">{error}</p>}
            </div>
            <button type="submit" className='generate-btn'>
                Gerar Aventura
            </button>
        </form>
    </div>
}

export default ThemeInput;