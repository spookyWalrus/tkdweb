import Commands from "@/components/vocab/commands";
import Nouns from "@/components/vocab/nouns";
import People from "@/components/vocab/people";
import Training from "@/components/vocab/training";
import Numbers from "@/components/vocab/numbers";
import Technique from "@/components/vocab/technique";
import Kicks from "@/components/vocab/kicks";
import Phrases from "@/components/vocab/phrases";

export default function Vocab() {
  return (
    <div className="main">
      <div className="mainMargin">
        <Numbers />
        <Nouns />
        <People />
        <Training />
        <Technique />
        <Kicks />
        <Commands />
        <Phrases />
      </div>
    </div>
  );
}
