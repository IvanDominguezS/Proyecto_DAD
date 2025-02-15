export const Pagina_Juegos = () => {
    const handleMouseEnter = () => {
        document.body.style.overflow = 'hidden';
    }

    const handleMouseLeave = () => {
        document.body.style.overflow = '';
    }

    return (
        <div>
            <h2>Colección de juegos</h2>

            <iframe
                src="src\assets\games\back-attacker\index.html"
                height={600}
                width={600}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            />
            <br />
            <iframe
                src="src\assets\games\everyones-sky.html"
                height={600}
                width={600}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            />
            <br />
            <iframe
                src="src\assets\games\nano-wirebot\index.html"
                height={600}
                width={600}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            />
        </div>
    )
}
