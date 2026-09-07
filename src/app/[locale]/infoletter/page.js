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
            Info lettre Dans le but de vous informer sur le parcours de votre
            enfant dans notre Académie de TKD Rawdon. On se pose la question
            pourquoi les passations de ceinture et pourquoi plusieurs. 1e :
            Toutes les passations sont déterminées pas le degré
            d&apos;apprentissage. 23 : Pour passer d&apos;un grade à
            l&apos;autre il faut un nombre d&apos;heure d&apos;apprentissage.
            3e: Certain élève sont plus doué que d&apos;autres et nous
            surveillons leur croissance. 4e: Il est aussi possible
            d&apos;avancer plus vite en prenant par à tous les cours. Il y a une
            passation de ceinture à la fin : - Novembre pour les nouveaux à
            ceinture jaune/verte qui sont présent à tous les cours (3 fois
            semaines) - Janvier pour les nouveaux à jaune/verte qui font 2 cours
            semaines - Février pour les nouveaux à jaune/verte (3 cours semaine)
            et ceinture verte en montant, puisque le nombre de présence est plus
            élevé - Avril pour les jeunes en bas de jaune/verte - Mai pour tous
            les adultes (12 ans et plus) et les ceintures vertes et plus - Juin
            pour les ceintures noires et Dan Aussi il peut avoir une passation a
            une date ultérieure pour les athlètes qui n&apos;ont pas le nombre
            de présence requis ou blessé ou ne sont pas disponible à la date
            donnée. Prenez note que le nombre de présence augmente avec la
            couleur de ceinture - De ceinture blanche à ceinture verte 2 à 3 ans
            - De ceinture verte à rouge 2 à 3 ans - De rouge à Dan 1 ans
            Toujours selon le nombre de cours de présence N.B. Le parcours peut
            varier pour chaque athlète EX: Présence à tous les cours Faire parti
            de l&apos;équipe de compétition Aptitude, physique,mental et respect
            Affinité avec les entraineurs L&apos;enseignement est basé pour
            favoriser les passations de ceinture et même de la future passation.
            La feuille de la future passation lui est remis le plus tôt pour
            préparer la future passation. Tous les instructeurs et les
            entraineurs sont certifié Le superviseur (Grand Maître Christian
            Sourdif) est Reconnu au Québec, au Canada et en Korea. Conclusion:
            Depuis 46 ans le Grand Maître développe des athlètes que ce soit
            récréatif, compétitif de haut niveau. Votre enfant est entre bonne
            main, avec tous les instructeurs et entraineur certifié
            d&apos;académie. Merci et bon parcours Marie-France Moffatt
            secrétaire de l&apos;académie Grand Maître Christian Sourdif
          </p>
        </div>
      </div>
    </div>
  );
}
