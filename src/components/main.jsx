import React, { useState } from "react";
import ScoreTable from "./ScoreTable";
import RestartGame from "./RestartGame";

function Main() {
    const initialScores = 301; // Score initial

    const [joueurs, setJoueurs] = useState([
        {
            id: 0,
            nom: "Joueur 1",
            score: initialScores,
        },
        {
            id: 1,
            nom: "Joueur 2",
            score: initialScores,
        },
    ]);

    const [partieEn, setPartieEn] = useState(initialScores);
    const [lancers, setLancers] = useState(["", ""]);
    const [nouveauScore, setNouveauScore] = useState(""); // Nouveau score de la partie

    const handleNomChange = (event, joueurIndex) => {
        const updatedJoueurs = [...joueurs];
        updatedJoueurs[joueurIndex].nom = event.target.value;
        setJoueurs(updatedJoueurs);
    };

    const handlePartieEnChange = (event) => {
        setNouveauScore(event.target.value);
    };

    const handleScoreChange = (event, joueurIndex) => {
        const updatedLancers = [...lancers];
        updatedLancers[joueurIndex] = event.target.value;
        setLancers(updatedLancers);
    };

    const handleSubmitScore = (joueurIndex) => {
        const scoreLancer = parseInt(lancers[joueurIndex]);
        if (!isNaN(scoreLancer) && scoreLancer >= 0) {
            const updatedJoueurs = [...joueurs];
            updatedJoueurs[joueurIndex].score -= scoreLancer;
            setJoueurs(updatedJoueurs);

            const updatedLancers = [...lancers];
            updatedLancers[joueurIndex] = "";
            setLancers(updatedLancers);

            if (updatedJoueurs[joueurIndex].score <= 0) {
                const gagnant = updatedJoueurs[joueurIndex].nom;
                const date = new Date().toLocaleDateString().replaceAll("/", "-");
                const nomFichier = `${joueurs[0].nom}-${joueurs[1].nom}_${gagnant}_${date}.json`;

                const historiquePartie = {
                    joueur1: joueurs[0].nom,
                    joueur2: joueurs[1].nom,
                    gagnant: gagnant,
                    historique: [...joueurs.map((joueur) => joueur.score)],
                };

                const blob = new Blob([JSON.stringify(historiquePartie)], {
                    type: "application/json",
                });

                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = nomFichier;
                a.click();
                window.URL.revokeObjectURL(url);
            }
        }
    };

    const recommencerPartie = () => {
        if (!isNaN(nouveauScore) && nouveauScore > 0) {
            const nouveauScoreInt = parseInt(nouveauScore);
            setPartieEn(nouveauScoreInt);
            const nouveauJoueurs = [...joueurs];
            nouveauJoueurs.forEach((joueur) => {
                joueur.score = nouveauScoreInt;
            });
            setJoueurs(nouveauJoueurs);
        }
    };

    return (
        <div className="parent">
            <section className="div1">
                <h2>Noms des joueurs :</h2>
                <label>
                    Joueur 1 :
                    <input
                        onChange={(event) => handleNomChange(event, 0)}
                        type="text"
                        value={joueurs[0].nom}
                    />
                </label>
                <label>
                    Joueur 2 :
                    <input
                        onChange={(event) => handleNomChange(event, 1)}
                        type="text"
                        value={joueurs[1].nom}
                    />
                </label>
            </section>
            <ScoreTable
                joueurs={joueurs}
                lancers={lancers}
                handleScoreChange={handleScoreChange}
                handleSubmitScore={handleSubmitScore}
            />
            <RestartGame
                nouveauScore={nouveauScore}
                handlePartieEnChange={handlePartieEnChange}
                recommencerPartie={recommencerPartie}
            />
        </div>
    );
}

export default Main;
