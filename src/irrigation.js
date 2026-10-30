// MEMBRE 2 — Irrigation : lire les relevés des capteurs et décider quoi faire.
// Fiche : fiches/2-irrigation.md · Vérifier : npm run test:irrigation

// Renvoie seulement les relevés de la parcelle demandée.

// MEMBRE 2 — Irrigation

// 1. Récupérer les relevés d'une parcelle
export function relevesDeParcelle(releves, idParcelle) {
  return releves.filter(
    (releve) => releve.parcelle === idParcelle
  );
}

// 2. Calculer la moyenne des humidités
export function moyenneHumidite(releves) {
  if (releves.length === 0) {
    return null;
  }

  const total = releves.reduce(
    (somme, releve) => somme + releve.humidite,
    0
  );

  return Math.round(total / releves.length);
}

// 3. Déterminer l'état d'irrigation
export function etatIrrigation(humidite, culture) {
  if (
    humidite === null ||
    humidite === undefined ||
    !culture
  ) {
    return "INCONNU";
  }

  if (humidite < culture.humiditeMin) {
    return "ARROSER";
  }

  if (humidite > culture.humiditeMax) {
    return "DRAINER";
  }

  return "OK";
}

// 4. Générer une alerte pour chaque parcelle
export function alertesIrrigation(parcelles, releves, cultures) {
  return parcelles.map((parcelle) => {

    const culture = cultures.find(
      (element) => element.code === parcelle.culture
    );

    const relevesParcelle = relevesDeParcelle(
      releves,
      parcelle.id
    );

    const moyenne = moyenneHumidite(relevesParcelle);

    const etat = etatIrrigation(moyenne, culture);

    return {
      id: parcelle.id,
      producteur: parcelle.producteur,
      culture: parcelle.culture,
      moyenne: moyenne,
      etat: etat
    };
  });
}

