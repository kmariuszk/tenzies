function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "#FFFFFF"
    }

    const dots = [];

    for (let i = 0; i < props.value; i++) {
        dots.push(<span key={i} className="dot"></span>)
    }

    return (
        <div
            className="dice"
            style={styles}
            onClick={props.holdDice}
        >
            {dots}
        </div>
    )
}

export default Die;