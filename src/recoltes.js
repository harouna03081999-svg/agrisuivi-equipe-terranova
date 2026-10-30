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

// Renvoie du revenu estimé en FCFA.
export function revenu(kg, prixKg) {
  return kg * prixKg;
}

// Renvoie une ligne de bilan par parcelle, dans le même ordre que parcelles.
// Chaque ligne : { id, producteur, culture, kg, rendement, revenu }
export function bilanRecoltes(parcelles, recoltes, cultures) {
  return parcelles.map((parcelle) => {
    const culture = cultures.find((c) => c.code === parcelle.culture);
    const prixKg = culture ? culture.prixKg : 0;
    const kg = totalRecolte(recoltes, parcelle.id);

    return {
      id: parcelle.id,
      producteur: parcelle.producteur,
      culture: parcelle.culture,
      kg,
      rendement: rendement(kg, parcelle.surface),
      revenu: revenu(kg, prixKg),
    };
  });
}

