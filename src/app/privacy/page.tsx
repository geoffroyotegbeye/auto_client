import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-vm-dark py-20">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-vm-red mb-6"
          >
            ← Retour à l'accueil
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Politique de confidentialité
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Introduction</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              MIG Motors Bénin (ci-après "nous", "notre" ou "la Société") s'engage à protéger la confidentialité 
              et la sécurité des données personnelles de ses utilisateurs. Cette politique de confidentialité 
              explique comment nous collectons, utilisons, partageons et protégeons vos informations personnelles 
              lorsque vous utilisez notre site web et nos services.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Données collectées</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Nous collectons les types de données suivants :
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li><strong>Informations d'identification :</strong> nom, prénom, adresse email, numéro de téléphone</li>
              <li><strong>Informations de localisation :</strong> pays, ville, adresse postale</li>
              <li><strong>Informations de navigation :</strong> adresse IP, type de navigateur, pages visitées, durée de visite</li>
              <li><strong>Informations commerciales :</strong> demandes de devis, préférences de véhicules, historique d'achats</li>
              <li><strong>Avis et commentaires :</strong> évaluations, témoignages, messages de contact</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Utilisation des données</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Vos données personnelles sont utilisées pour :
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Traiter vos demandes de devis et de rendez-vous</li>
              <li>Vous contacter concernant nos produits et services</li>
              <li>Améliorer l'expérience utilisateur sur notre site</li>
              <li>Vous envoyer des informations commerciales (avec votre consentement)</li>
              <li>Respecter nos obligations légales et réglementaires</li>
              <li>Prévenir la fraude et assurer la sécurité de nos services</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Partage des données</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Nous ne vendons jamais vos données personnelles. Nous pouvons partager vos informations avec :
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li><strong>Nos partenaires commerciaux :</strong> constructeurs automobiles, établissements financiers pour le financement</li>
              <li><strong>Prestataires de services :</strong> hébergement web, services d'emailing, outils d'analyse</li>
              <li><strong>Autorités légales :</strong> si requis par la loi ou pour protéger nos droits</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Conservation des données</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Nous conservons vos données personnelles pendant la durée nécessaire aux finalités pour lesquelles 
              elles ont été collectées, conformément aux obligations légales applicables au Bénin. En général :
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Données clients actifs : pendant toute la durée de la relation commerciale + 3 ans</li>
              <li>Demandes de devis : 2 ans à compter de la demande</li>
              <li>Données de navigation : 13 mois maximum</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Vos droits</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Conformément à la législation en vigueur, vous disposez des droits suivants :
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li><strong>Droit d'accès :</strong> obtenir une copie de vos données personnelles</li>
              <li><strong>Droit de rectification :</strong> corriger des données inexactes ou incomplètes</li>
              <li><strong>Droit à l'effacement :</strong> demander la suppression de vos données</li>
              <li><strong>Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
              <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              Pour exercer ces droits, contactez-nous à : <a href="mailto:contact@migmotors.net" className="text-vm-red hover:underline">contact@migmotors.net</a>
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Sécurité des données</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger 
              vos données personnelles contre tout accès non autorisé, perte, destruction ou divulgation :
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Chiffrement SSL/TLS pour les transmissions de données</li>
              <li>Accès restreint aux données personnelles</li>
              <li>Sauvegardes régulières et sécurisées</li>
              <li>Formation du personnel sur la protection des données</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. Cookies</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Notre site utilise des cookies pour améliorer votre expérience de navigation. Vous pouvez 
              configurer votre navigateur pour refuser les cookies, mais cela peut affecter certaines 
              fonctionnalités du site.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">9. Modifications</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. 
              Les modifications seront publiées sur cette page avec une date de mise à jour actualisée.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">10. Contact</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Pour toute question concernant cette politique de confidentialité ou le traitement de vos données :
            </p>
            <div className="bg-gray-50 dark:bg-vm-dark-card p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              <p className="text-gray-900 dark:text-white font-semibold mb-2">MIG Motors Bénin</p>
              <p className="text-gray-700 dark:text-gray-300">124 Zongo Ehuzu 569 ZB, Cotonou, Bénin</p>
              <p className="text-gray-700 dark:text-gray-300">Téléphone : (+229) 01 21 31 00 29</p>
              <p className="text-gray-700 dark:text-gray-300">Email : <a href="mailto:contact@migmotors.net" className="text-vm-red hover:underline">contact@migmotors.net</a></p>
              <p className="text-gray-700 dark:text-gray-300">Site web : <a href="https://www.migmotors.net" className="text-vm-red hover:underline">www.migmotors.net</a></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
