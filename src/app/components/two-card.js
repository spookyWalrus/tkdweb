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
        <h3>Our Instructors</h3>
        <p>
          Our instructors are dedicated to helping you learn and develop your
          Taekwondo skills. They are committed to helping you achieve your
          goals.
        </p>
      </div>
    </div>
  );
}
