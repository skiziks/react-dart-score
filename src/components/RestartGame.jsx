import React from "react";

function RestartGame({ nouveauScore, handlePartieEnChange, recommencerPartie }) {
    return (
        <section className="div3">
            <h2>Recommencer la partie :</h2>
            <article className="articleRecommencer">
                <label>
                    Nouveau score de la partie :
                    <input
                        type="number"
                        value={nouveauScore}
                        onChange={(event) => handlePartieEnChange(event)}
                    />
                </label>
                <button onClick={recommencerPartie}>Recommencer la partie</button>
            </article>

        </section>
    );
}

export default RestartGame;
