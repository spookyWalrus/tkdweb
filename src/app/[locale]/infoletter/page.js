import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Infoletter() {
  const t = useTranslations("InfoLetter");
  return (
    <div className="main">
      <div className="mainMargin">
        <div className="centerHeader">
          {/* <h3>Info Letter</h3> */}
          <h3>{t("InfoHeader")}</h3>
        </div>
        <br />
        <div>
          <p>
            {t("InfoP1")}
            {/* Dans le but de vous informer sur le parcours de votre enfant dans
            notre Académie de TKD Rawdon. On se pose la question pourquoi les
            passations de ceinture et pourquoi plusieurs. */}
          </p>
          <br />
          <ol>
            <li>
              {t("InfoListA1")}
              {/* Toutes les passations sont déterminées pas le degré
              d&apos;apprentissage. */}
            </li>
            <li>
              {t("InfoListA2")}
              {/* Pour passer d&apos;un grade à l&apos;autre il faut un nombre
              d&apos;heure d&apos;apprentissage. */}
            </li>
            <li>
              {t("InfoListA3")}
              {/* Certain élève sont plus doué que d&apos;autres et nous surveillons
              leur croissance. 4e: Il est aussi possible d&apos;avancer plus
              vite en prenant par à tous les cours. */}
            </li>
            <li>{t("InfoListA4")}</li>
          </ol>
          <br />
          <p>
            {t("InfoP2")}
            {/* Il y a une passation de ceinture à la fin :  */}
          </p>
          <div className="content">
            <ul>
              <li>
                {t("InfoListB1")}
                {/* Novembre pour les nouveaux à ceinture jaune/verte qui sont
                présent à tous les cours (3 fois semaines) */}
              </li>
              <li>
                {t("InfoListB2")}
                {/* Janvier pour les nouveaux à jaune/verte qui font 2 cours
                semaines */}
              </li>
              <li>
                {t("InfoListB3")}
                {/* Février pour les nouveaux à jaune/verte (3 cours semaine) et
                ceinture verte en montant, puisque le nombre de présence est
                plus élevé */}
              </li>
              <li>
                {t("InfoListB4")}
                {/* Avril pour les jeunes en bas de jaune/verte */}
              </li>
              <li>
                {t("InfoListB5")}
                {/* Mai pour tous les adultes (12 ans et plus) et les ceintures
                vertes et plus */}
              </li>
              <li>
                {t("InfoListB6")}
                {/* Juin pour les ceintures noires et Dan */}
              </li>
            </ul>
          </div>
          <p>
            {t("InfoP3")}
            {/* Aussi il peut avoir une passation a une date ultérieure pour les
            athlètes qui n&apos;ont pas le nombre de présence requis ou blessé
            ou ne sont pas disponible à la date donnée. */}
          </p>
          <br />
          <br />
          <p>
            {t("InfoP4")}
            {/* Prenez note que le nombre de présence augmente avec la couleur de
            ceinture */}
          </p>
          <div className="content">
            <ul>
              <li>
                {t("InfoListC1")}
                {/* De ceinture blanche à ceinture verte 2 à 3 ans */}
              </li>
              <li>
                {t("InfoListC2")}
                {/* De ceinture verte à rouge 2 à 3 ans */}
              </li>
              <li>
                {t("InfoListC3")}
                {/* De rouge à Dan 1 ans Toujours selon le nombre de cours de
                présence N.B. */}
              </li>
            </ul>
          </div>
          <p>
            {t("InfoP5")}
            {/* Le parcours peut varier pour chaque athlète. Par exemple: */}
          </p>
          <div className="content">
            <ul>
              <li>
                {t("InfoListD1")}
                {/* Présence à tous les cours  */}
              </li>
              <li>
                {t("InfoListD2")}
                {/* Faire partide l&apos;équipe de compétition */}
              </li>
              <li>
                {t("InfoListD3")}
                {/* Aptitude, physique,mental et respect */}
              </li>
              <li>
                {t("InfoListD4")}
                {/* Affinité avec les entraineurs  */}
              </li>
            </ul>
          </div>
          <p>
            {t("InfoP6")}
            {/* L&apos;enseignement est basé pour favoriser les passations de
            ceinture et même de la future passation. La feuille de la future
            passation lui est remis le plus tôt pour préparer la future
            passation. Tous les instructeurs et les entraineurs sont certifié Le
            superviseur (Grand Maître Christian Sourdif) est Reconnu au Québec,
            au Canada et en Korea. */}
          </p>
          <br />
          <br />
          <p>
            Conclusion:
            <br />
            {t("InfoP7")}
            {/* Depuis 46 ans le Grand Maître développe des athlètes que ce soit
            récréatif, compétitif de haut niveau. Votre enfant est entre bonne
            main, avec tous les instructeurs et entraineur certifié
            d&apos;académie. */}
            <br />
            <br />
            {t("InfoP8")}
            {/* Merci et bon parcours, */}
          </p>
          <br />
          <h6>Marie-France Moffatt,</h6>
          <p>
            <i>{t("InfoP9")}</i>
          </p>
          {/* secrétaire de l&apos;académie Grand Maître Christian Sourdif. */}
        </div>
      </div>
    </div>
  );
}
