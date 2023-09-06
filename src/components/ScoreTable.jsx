import React from "react";

function ScoreTable({ joueurs, lancers, handleScoreChange, handleSubmitScore }) {
  return (
    <section className="div2">
      <h2>Scores :</h2>
      <table>
        <thead>
          <tr>
            {joueurs.map((joueur) => (
              <th key={joueur.id}>{joueur.nom}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {joueurs.map((joueur, index) => (
              <td key={joueur.id}>
                <input
                  type="number"
                  value={lancers[index]}
                  onChange={(event) => handleScoreChange(event, index)}
                />
                <button onClick={() => handleSubmitScore(index)}>Valider</button>
              </td>
            ))}
          </tr>
          <tr>
            {joueurs.map((joueur) => (
              <td key={joueur.id}>
                {joueur.score > 0 ? joueur.score : 0}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </section>
  );
}

export default ScoreTable;
