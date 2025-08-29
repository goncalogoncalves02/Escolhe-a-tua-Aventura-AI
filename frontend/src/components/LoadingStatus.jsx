function LoadingStatus({theme}) {
    return <div className ="loading-container">
        <h2>A Gerar a história do tema {theme} </h2>

        <div className="loading-animation">
            <div className="spinner"></div>
        </div>

        <p className="loading-info">
            Por favor, aguarde enquanto a IA cria a sua história...
        </p>
    </div>
}

export default LoadingStatus;