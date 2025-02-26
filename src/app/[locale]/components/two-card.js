import Image from "next/image";
// import "../styles/globals.scss";
import "../styles/partials/two-card.scss";

export default function TwoCard() {
  return (
    <div className="twoCard">
      <div className="cardImage">
        <Image
          src="/images/kyoExam1.jpg"
          alt="exam"
          width="1000"
          height="1000"
        />
      </div>
      <div className="card-text">
        <h3>Be part of the family</h3>
        <p>
          To learn the discipline of Taekwondo, our vision is to develop mental
          and physical fortitude through a friendly and approachable
          environment. Our structured classes are given by experienced
          instructors to guide your skill development. From young children to
          seasoned adults, we have a place for you in our school.
        </p>
      </div>
    </div>
  );
}
