// MEMBRE 3 — Récoltes : calculer la production, le rendement et le revenu.
// Fiche : fiches/3-recoltes.md · Vérifier : npm run test:recoltes

// Renvoie le total des kilos récoltés sur une parcelle. Aucune récolte : 0.
export function totalRecolte(recoltes, idParcelle) {
  return recoltes
    .filter((recolte) => recolte.parcelle === idParcelle)
    .reduce((somme, recolte) => somme + recolte.kg, 0);
}

// Renvoie le rendement en kg par hectare, arrondi à l'entier le plus proche.
// Une surface nulle ou négative est une erreur : on lance une RangeError.
export function rendement(kg, surface) {
  if (surface <= 0) {
    throw new RangeError("La surface doit être supérieure à 0");
  }
  return Math.round(kg / surface);
}

// Renvoie le revenu estimé en FCFA.
export function revenu(kg, prixKg) {
  return kg * prixKg;
}