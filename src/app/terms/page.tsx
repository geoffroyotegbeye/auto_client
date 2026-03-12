import Link from "next/link";

export default function TermsPage() {
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
            Conditions d'utilisation
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Acceptation des conditions</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              En accédant et en utilisant le site web de MIG Motors Bénin (ci-après "le Site"), vous acceptez 
              d'être lié par les présentes conditions d'utilisation. Si vous n'acceptez pas ces conditions, 
              veuillez ne pas utiliser le Site.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Informations légales</h2>
            <div className="bg-gray-50 dark:bg-vm-dark-card p-6 rounded-lg border border-gray-200 dark:border-gray-800 mb-4">
              <p className="text-gray-900 dark:text-white font-semibold mb-2">MIG Motors Bénin SARL</p>
              <p className="text-gray-700 dark:text-gray-300">Société à Responsabilité Limitée</p>
              <p className="text-gray-700 dark:text-gray-300">Capital social : 100 000 000 FCFA</p>
              <p className="text-gray-700 dark:text-gray-300">Date de création : 25 novembre 2013</p>
              <p className="text-gray-700 dark:text-gray-300">Siège social : Zongo Ilots 572, Cotonou, Bénin</p>
              <p className="text-gray-700 dark:text-gray-300">Téléphone : (+229) 01 21 31 00 29 / (+229) 01 61 98 64 06</p>
              <p className="text-gray-700 dark:text-gray-300">Email : contact@migmotors.net</p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Objet du site</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Le Site a pour objet de présenter les activités de MIG Motors Bénin, notamment :
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>La vente de véhicules neufs</li>
              <li>Les services après-vente (SAV) et d'entretien</li>
              <li>La prise de rendez-vous pour essais et consultations</li>
              <li>Les demandes de devis personnalisés</li>
              <li>Les informations sur nos marques et produits</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Accès au site</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              L'accès au Site est gratuit. Les frais d'accès et d'utilisation du réseau de télécommunication 
              sont à la charge de l'utilisateur selon les modalités fixées par ses fournisseurs d'accès et 
              opérateurs de télécommunication.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Nous nous réservons le droit de suspendre, modifier ou interrompre l'accès au Site à tout moment, 
              sans préavis, pour des raisons de maintenance, de mise à jour ou pour toute autre raison technique.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Utilisation du site</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Vous vous engagez à utiliser le Site de manière responsable et à ne pas :
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Utiliser le Site à des fins illégales ou frauduleuses</li>
              <li>Tenter d'accéder de manière non autorisée aux systèmes informatiques</li>
              <li>Transmettre des virus, malwares ou tout code malveillant</li>
              <li>Collecter des données personnelles d'autres utilisateurs</li>
              <li>Publier du contenu diffamatoire, offensant ou inapproprié</li>
              <li>Usurper l'identité d'une autre personne ou entité</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Propriété intellectuelle</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Tous les contenus présents sur le Site (textes, images, logos, vidéos, graphiques, etc.) sont 
              la propriété exclusive de MIG Motors Bénin ou de ses partenaires et sont protégés par les lois 
              sur la propriété intellectuelle.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie 
              des éléments du Site, quel que soit le moyen ou le procédé utilisé, est interdite sans 
              autorisation écrite préalable.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Informations produits et prix</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Les informations sur les véhicules et les prix affichés sur le Site sont fournis à titre indicatif 
              et peuvent être modifiés sans préavis. Nous nous efforçons de maintenir ces informations à jour, 
              mais ne pouvons garantir leur exactitude absolue.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Les prix sont exprimés en Francs CFA (FCFA) et s'entendent toutes taxes comprises (TTC). 
              Les offres sont valables dans la limite des stocks disponibles.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. Demandes de devis</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Les demandes de devis effectuées via le Site sont sans engagement. Elles constituent une demande 
              d'information et non une offre ferme de vente. Un devis personnalisé vous sera transmis dans les 
              meilleurs délais (généralement sous 24 à 48 heures).
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Les devis sont valables 30 jours à compter de leur émission, sauf mention contraire.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">9. Rendez-vous</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Les prises de rendez-vous effectuées via le Site sont soumises à confirmation de notre part. 
              Vous recevrez un email ou un appel téléphonique pour confirmer votre rendez-vous.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              En cas d'empêchement, nous vous remercions de nous prévenir au moins 24 heures à l'avance.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">10. Avis clients</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Les avis publiés sur le Site sont soumis à modération. Nous nous réservons le droit de ne pas 
              publier ou de supprimer tout avis qui :
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Contient des propos diffamatoires, injurieux ou discriminatoires</li>
              <li>N'est pas en rapport avec nos produits ou services</li>
              <li>Contient des informations personnelles ou confidentielles</li>
              <li>Fait la promotion de produits ou services concurrents</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">11. Liens externes</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Le Site peut contenir des liens vers des sites web tiers. Ces liens sont fournis uniquement 
              pour votre commodité. Nous n'avons aucun contrôle sur ces sites et ne sommes pas responsables 
              de leur contenu ou de leurs pratiques de confidentialité.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">12. Limitation de responsabilité</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              MIG Motors Bénin met tout en œuvre pour assurer la disponibilité et la fiabilité du Site. 
              Toutefois, nous ne pouvons garantir :
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>L'absence d'interruptions ou d'erreurs dans le fonctionnement du Site</li>
              <li>L'absence de virus ou autres éléments nuisibles</li>
              <li>L'exactitude, l'exhaustivité ou l'actualité des informations</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              Notre responsabilité ne saurait être engagée pour tout dommage direct ou indirect résultant 
              de l'utilisation du Site.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">13. Protection des données</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Le traitement de vos données personnelles est régi par notre{" "}
              <Link href="/privacy" className="text-vm-red hover:underline font-semibold">
                Politique de confidentialité
              </Link>
              . Nous vous invitons à la consulter pour connaître vos droits et nos pratiques en matière 
              de protection des données.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">14. Modifications des conditions</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Nous nous réservons le droit de modifier les présentes conditions d'utilisation à tout moment. 
              Les modifications entreront en vigueur dès leur publication sur le Site. Nous vous encourageons 
              à consulter régulièrement cette page.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Votre utilisation continue du Site après la publication des modifications constitue votre 
              acceptation des nouvelles conditions.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">15. Droit applicable et juridiction</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Les présentes conditions d'utilisation sont régies par le droit béninois. En cas de litige, 
              et à défaut de résolution amiable, les tribunaux de Cotonou (Bénin) seront seuls compétents.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">16. Contact</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Pour toute question concernant ces conditions d'utilisation, vous pouvez nous contacter :
            </p>
            <div className="bg-gray-50 dark:bg-vm-dark-card p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              <p className="text-gray-900 dark:text-white font-semibold mb-2">MIG Motors Bénin</p>
              <p className="text-gray-700 dark:text-gray-300">124 Zongo Ehuzu 569 ZB, Cotonou, Bénin</p>
              <p className="text-gray-700 dark:text-gray-300">Téléphone : (+229) 01 21 31 00 29</p>
              <p className="text-gray-700 dark:text-gray-300">Email : <a href="mailto:contact@migmotors.net" className="text-vm-red hover:underline">contact@migmotors.net</a></p>
              <p className="text-gray-700 dark:text-gray-300">Site web : <a href="https://www.migmotors.net" className="text-vm-red hover:underline">www.migmotors.net</a></p>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                Horaires : Lundi - Vendredi : 08H00 - 18H30 | Samedi : 09H00 - 13H00
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
