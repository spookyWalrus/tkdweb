import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Infoletter() {
  const t = useTranslations("TKDPhilosophy");
  return (
    <div className="main">
      <div className="mainMargin">
        <div className="centerHeader">
          <h3>Info Letter</h3>
          {/* <h3>{t("Philosophy Header")}</h3> */}
        </div>
        <br />
        <div>
          <p>
            Dans le but de vous informer sur le parcours de votre enfant dans
            notre Académie de TKD Rawdon. On se pose la question pourquoi les
            passations de ceinture et pourquoi plusieurs.
          </p>
          <br />
          <ol>
            <li>
              Toutes les passations sont déterminées pas le degré
              d&apos;apprentissage.{" "}
            </li>
            <li>
              Pour passer d&apos;un grade à l&apos;autre il faut un nombre
              d&apos;heure d&apos;apprentissage.
            </li>
            <li>
              Certain élève sont plus doué que d&apos;autres et nous surveillons
              leur croissance. 4e: Il est aussi possible d&apos;avancer plus
              vite en prenant par à tous les cours.
            </li>
          </ol>
          <br />
          <p>Il y a une passation de ceinture à la fin : </p>
          <div className="content">
            <ul>
              <li>
                Novembre pour les nouveaux à ceinture jaune/verte qui sont
                présent à tous les cours (3 fois semaines)
              </li>
              <li>
                Janvier pour les nouveaux à jaune/verte qui font 2 cours
                semaines
              </li>
              <li>
                Février pour les nouveaux à jaune/verte (3 cours semaine) et
                ceinture verte en montant, puisque le nombre de présence est
                plus élevé
              </li>
              <li>Avril pour les jeunes en bas de jaune/verte</li>
              <li>
                Mai pour tous les adultes (12 ans et plus) et les ceintures
                vertes et plus
              </li>
              <li>Juin pour les ceintures noires et Dan</li>
            </ul>
          </div>
          <p>
            Aussi il peut avoir une passation a une date ultérieure pour les
            athlètes qui n&apos;ont pas le nombre de présence requis ou blessé
            ou ne sont pas disponible à la date donnée.
          </p>{" "}
          <br />
          <br />
          <p>
            Prenez note que le nombre de présence augmente avec la couleur de
            ceinture
          </p>
          <div className="content">
            <ul>
              <li> De ceinture blanche à ceinture verte 2 à 3 ans</li>
              <li>De ceinture verte à rouge 2 à 3 ans</li>
              <li>
                {" "}
                De rouge à Dan 1 ans Toujours selon le nombre de cours de
                présence N.B.{" "}
              </li>
            </ul>
          </div>
          <p>Le parcours peut varier pour chaque athlète. Par exemple:</p>
          <div className="content">
            <ul>
              <li> Présence à tous les cours </li>
              <li>Faire partide l&apos;équipe de compétition</li>
              <li> Aptitude, physique,mental et respect</li>
              <li>Affinité avec les entraineurs </li>
            </ul>
          </div>
          <p>
            L&apos;enseignement est basé pour favoriser les passations de
            ceinture et même de la future passation. La feuille de la future
            passation lui est remis le plus tôt pour préparer la future
            passation. Tous les instructeurs et les entraineurs sont certifié Le
            superviseur (Grand Maître Christian Sourdif) est Reconnu au Québec,
            au Canada et en Korea.
          </p>{" "}
          <br />
          <br />
          <p>
            Conclusion:
            <br />
            Depuis 46 ans le Grand Maître développe des athlètes que ce soit
            récréatif, compétitif de haut niveau. Votre enfant est entre bonne
            main, avec tous les instructeurs et entraineur certifié
            d&apos;académie. Merci et bon parcours Marie-France Moffatt
            secrétaire de l&apos;académie Grand Maître Christian Sourdif.
          </p>
        </div>
      </div>
    </div>
  );
}
